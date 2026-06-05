const fs = require("fs");
const path = require("path");
const {
  ROOT,
  listSchoolData,
  publicPathExists,
  writeFileIfChanged
} = require("./archive-utils");

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const PDF_EXTENSIONS = new Set([".pdf"]);
const PROTECTED_FIELDS = [
  "status",
  "statusClass",
  "confirmedFacts",
  "unconfirmedPoints",
  "riskFlags",
  "evaluation",
  "humanReviewRequired",
  "lastReviewed"
];

function usage() {
  return `Usage:
  node scripts/sync-school-materials.js --dry-run [--clean]
  node scripts/sync-school-materials.js --write [--clean]

Options:
  --dry-run  Show planned JSON updates without writing.
  --write    Write JSON updates.
  --clean    Remove sourceImages entries whose local files no longer exist.
`;
}

function parseArgs(argv) {
  const args = new Set(argv);
  if (args.has("--help") || args.has("-h")) {
    console.log(usage());
    process.exit(0);
  }
  if (args.has("--dry-run") && args.has("--write")) {
    throw new Error("Use either --dry-run or --write, not both.");
  }
  return {
    write: args.has("--write"),
    dryRun: !args.has("--write"),
    clean: args.has("--clean")
  };
}

function stableStringify(value) {
  return JSON.stringify(value);
}

function sortFiles(files) {
  return files.sort((a, b) => a.localeCompare(b, "ja", { numeric: true, sensitivity: "base" }));
}

function listFilesByExtension(dir, extensions) {
  if (!fs.existsSync(dir)) return [];
  return sortFiles(
    fs.readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => entry.name)
  );
}

function publicMaterialPath(citySlug, schoolSlug, fileName) {
  return `/assets/archive/${citySlug}/${schoolSlug}/${fileName}`;
}

function buildImageEntries(record, imageFiles) {
  const current = Array.isArray(record.materials?.sourceImages) ? record.materials.sourceImages : [];
  return imageFiles.map((fileName, index) => {
    const src = publicMaterialPath(record.citySlug, record.slug, fileName);
    const previous = current.find((entry) => entry && entry.src === src) || {};
    if (previous.src) {
      return {
        ...previous,
        src,
        caption: previous.caption || `資料画像${index + 1}`
      };
    }
    return {
      src,
      caption: previous.caption || `資料画像${index + 1}`
    };
  });
}

function cleanImageEntries(record) {
  const current = Array.isArray(record.materials?.sourceImages) ? record.materials.sourceImages : [];
  return current.filter((entry) => {
    if (!entry || !entry.src) return false;
    if (/^https?:\/\//.test(entry.src)) return true;
    return publicPathExists(entry.src);
  });
}

function materialSnapshot(record) {
  return {
    sourceImages: record.materials?.sourceImages ?? [],
    pdf: record.materials?.pdf ?? null
  };
}

function protectedSnapshot(record) {
  const snapshot = {};
  for (const field of PROTECTED_FIELDS) snapshot[field] = record[field];
  return snapshot;
}

function describeChange(before, after) {
  const parts = [];
  if (stableStringify(before.sourceImages) !== stableStringify(after.sourceImages)) {
    parts.push(`sourceImages ${before.sourceImages.length} -> ${after.sourceImages.length}`);
  }
  if (stableStringify(before.pdf) !== stableStringify(after.pdf)) {
    parts.push(`pdf ${before.pdf ? "set" : "none"} -> ${after.pdf ? "set" : "none"}`);
  }
  return parts.join(", ");
}

function syncRecord(record, options) {
  const jsonPath = record.sourceFile;
  const source = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  source.citySlug = record.citySlug;
  const materialsDir = path.join(ROOT, "assets", "archive", record.citySlug, record.slug);
  const imageFiles = listFilesByExtension(materialsDir, IMAGE_EXTENSIONS);
  const pdfFiles = listFilesByExtension(materialsDir, PDF_EXTENSIONS);
  const before = materialSnapshot(source);
  const protectedBefore = protectedSnapshot(source);
  const warnings = [];

  source.materials = source.materials || {};

  if (imageFiles.length > 0) {
    source.materials.sourceImages = buildImageEntries(source, imageFiles);
  } else if (options.clean) {
    source.materials.sourceImages = cleanImageEntries(source);
  }

  if (pdfFiles.length === 1) {
    const src = publicMaterialPath(record.citySlug, record.slug, pdfFiles[0]);
    const previous = source.materials.pdf && source.materials.pdf.src === src ? source.materials.pdf : {};
    source.materials.pdf = {
      src,
      label: previous.label || "資料PDF"
    };
  } else if (pdfFiles.length > 1) {
    warnings.push(`multiple PDFs found (${pdfFiles.join(", ")}); materials.pdf was not changed`);
  }

  const protectedAfter = protectedSnapshot(source);
  if (stableStringify(protectedBefore) !== stableStringify(protectedAfter)) {
    throw new Error(`${record.slug}: protected evaluation fields changed unexpectedly.`);
  }

  delete source.citySlug;
  const after = materialSnapshot(source);
  const changed = stableStringify(before) !== stableStringify(after);
  return {
    slug: record.slug,
    jsonPath,
    imageCount: imageFiles.length,
    pdfCount: pdfFiles.length,
    warnings,
    changed,
    changeDescription: describeChange(before, after),
    nextJson: `${JSON.stringify(source, null, 2)}\n`
  };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const records = listSchoolData().filter((record) => record.citySlug === "atsugi");
  let changed = 0;
  let warnings = 0;

  console.log(`${options.dryRun ? "[dry-run]" : "[write]"} sync-school-materials: ${records.length} Atsugi records`);
  if (options.clean) console.log("clean mode: missing local sourceImages references may be removed");

  for (const record of records) {
    const result = syncRecord(record, options);
    warnings += result.warnings.length;
    for (const warning of result.warnings) {
      console.warn(`WARN ${result.slug}: ${warning}`);
    }
    if (result.changed) {
      changed += 1;
      console.log(`${options.dryRun ? "WOULD UPDATE" : "UPDATE"} ${result.slug}: ${result.changeDescription}`);
      if (options.write) writeFileIfChanged(result.jsonPath, result.nextJson);
    } else {
      console.log(`OK ${result.slug}: images=${result.imageCount}, pdfs=${result.pdfCount}, unchanged`);
    }
  }

  console.log(`summary: records=${records.length}, ${options.dryRun ? "wouldChange" : "changed"}=${changed}, warnings=${warnings}`);
}

if (require.main === module) {
  main();
}
