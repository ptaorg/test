const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE_ORIGIN = "https://ptaorg.com";
const GA_MEASUREMENT_ID = "G-0D18ZSSLMH";

const STATUS_CLASS = {
  "重大リスク": "eval-critical",
  "問題あり": "eval-problem",
  "要確認": "eval-warning",
  "資料不足": "eval-insufficient",
  "適正化モデル": "eval-good",
  "未評価": "eval-pending",
  "評価準備中": "eval-pending"
};

const STATUS_ORDER = [
  "重大リスク",
  "問題あり",
  "要確認",
  "資料不足",
  "適正化モデル",
  "評価準備中"
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeFileIfChanged(filePath, content) {
  const normalized = content.endsWith("\n") ? content : `${content}\n`;
  if (fs.existsSync(filePath) && fs.readFileSync(filePath, "utf8") === normalized) {
    return false;
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, normalized, "utf8");
  return true;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function publicPathToFile(publicPath) {
  if (!publicPath || /^https?:\/\//.test(publicPath)) return null;
  return path.join(ROOT, publicPath.replace(/^\/+/, ""));
}

function publicPathExists(publicPath) {
  const filePath = publicPathToFile(publicPath);
  return filePath ? fs.existsSync(filePath) : false;
}

function absoluteUrl(publicPathOrUrl) {
  if (!publicPathOrUrl) return "";
  if (/^https?:\/\//.test(publicPathOrUrl)) return publicPathOrUrl;
  const clean = publicPathOrUrl.startsWith("/") ? publicPathOrUrl : `/${publicPathOrUrl}`;
  return `${SITE_ORIGIN}${clean}`;
}

function statusClassFor(status, explicitClass) {
  return explicitClass || STATUS_CLASS[status] || "eval-pending";
}

function gaTag() {
  return `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${GA_MEASUREMENT_ID}');
</script>`;
}

function listSchoolData() {
  const schoolsDir = path.join(ROOT, "data", "schools");
  if (!fs.existsSync(schoolsDir)) return [];
  const records = [];
  for (const citySlug of fs.readdirSync(schoolsDir).sort()) {
    const cityDir = path.join(schoolsDir, citySlug);
    if (!fs.statSync(cityDir).isDirectory()) continue;
    for (const fileName of fs.readdirSync(cityDir).sort()) {
      if (!fileName.endsWith(".json")) continue;
      const filePath = path.join(cityDir, fileName);
      const data = readJson(filePath);
      records.push({ ...data, citySlug, sourceFile: filePath });
    }
  }
  return records;
}

function validateSchoolRecord(record) {
  const required = [
    "municipality",
    "prefecture",
    "schoolName",
    "schoolType",
    "slug",
    "basePath",
    "canonical",
    "status",
    "statusClass",
    "materials",
    "confirmedFacts",
    "unconfirmedPoints",
    "riskFlags",
    "evaluation",
    "humanReviewRequired"
  ];
  const missing = required.filter((key) => record[key] === undefined || record[key] === null);
  if (missing.length) {
    throw new Error(`${record.sourceFile || record.slug || "school JSON"} is missing: ${missing.join(", ")}`);
  }
}

function sortSchools(a, b) {
  const ao = a.nationalArchive?.order ?? 9999;
  const bo = b.nationalArchive?.order ?? 9999;
  if (ao !== bo) return ao - bo;
  return String(a.slug).localeCompare(String(b.slug), "ja");
}

module.exports = {
  ROOT,
  SITE_ORIGIN,
  STATUS_CLASS,
  STATUS_ORDER,
  GA_MEASUREMENT_ID,
  absoluteUrl,
  escapeHtml,
  gaTag,
  listSchoolData,
  publicPathExists,
  readJson,
  sortSchools,
  statusClassFor,
  validateSchoolRecord,
  writeFileIfChanged
};
