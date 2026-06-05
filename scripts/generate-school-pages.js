const fs = require("fs");
const path = require("path");
const {
  ROOT,
  absoluteUrl,
  escapeHtml,
  gaTag,
  listSchoolData,
  publicPathExists,
  sortSchools,
  statusClassFor,
  validateSchoolRecord,
  writeFileIfChanged
} = require("./archive-utils");

function renderList(items, fallback) {
  const values = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!values.length) return `<p class="archive-muted">${escapeHtml(fallback)}</p>`;
  return `<ul>
${values.map((item) => `        <li>${escapeHtml(item)}</li>`).join("\n")}
      </ul>`;
}

function renderParagraphs(items, fallback) {
  const values = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!values.length) return `<p class="archive-muted">${escapeHtml(fallback)}</p>`;
  return values.map((item) => `      <p>${escapeHtml(item)}</p>`).join("\n");
}

function renderTags(items) {
  const values = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!values.length) return `<p><span class="archive-tag">評価準備中</span></p>`;
  return `<p>${values.map((item) => `<span class="archive-tag">${escapeHtml(item)}</span>`).join("\n")}</p>`;
}

function renderImages(record) {
  const images = (record.materials.sourceImages || []).filter((image) => image.src && publicPathExists(image.src));
  if (!images.length) return `      <p class="archive-muted">資料画像準備中</p>`;
  return images.map((image, index) => `      <figure class="archive-figure">
        <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt || `${record.schoolName} 資料画像${index + 1}`)}">
        <figcaption>${escapeHtml(image.caption || `資料画像${index + 1}`)}</figcaption>
      </figure>`).join("\n");
}

function renderPdfLinks(record) {
  const links = [];
  const pdf = record.materials.pdf;
  if (pdf && pdf.src) {
    const isExternal = /^https?:\/\//.test(pdf.src);
    if (isExternal || publicPathExists(pdf.src)) {
      links.push(`<p class="archive-existing-pdf"><a class="archive-download" href="${escapeHtml(pdf.src)}">${escapeHtml(pdf.label || "資料PDFを開く")}</a></p>`);
    }
  }
  const existingPdf = record.materials.existingPdf;
  if (existingPdf && existingPdf.href) {
    links.push(`<p class="archive-existing-pdf"><a class="archive-download" href="${escapeHtml(existingPdf.href)}">${escapeHtml(existingPdf.label || "既存の評価書PDFを開く")}</a></p>`);
  }
  return links.length ? `\n\n      ${links.join("\n      ")}` : "";
}

function renderSchoolPage(record) {
  validateSchoolRecord(record);
  const statusClass = statusClassFor(record.status, record.statusClass);
  const ogImage = record.ogImage && publicPathExists(record.ogImage) ? record.ogImage : "/assets/ogp/atsugi/default.png";
  const ogDescription = record.ogDescription || record.description || record.summary;
  const title = `${record.schoolName} PTA関連資料・評価 | PTA適正化推進委員会`;
  const description = record.description || `${record.schoolName}のPTA関連資料について、確認できる事実、資料上確認できない点、当委員会の評価を整理したページです。`;
  const documentName = record.materials.documentName || (record.materials.confirmedDocuments || []).join("、") || "確認中";
  const applicationStatus = record.materials.applicationFormStatus || record.materials.hasApplicationForm || "未確認";
  const pdfStatus = record.materials.pdfStatus || (record.materials.pdf ? "掲載あり" : "準備中");

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="PTA適正化推進委員会">
  <meta property="og:title" content="${escapeHtml(`${record.schoolName} PTA関連資料・評価`)}">
  <meta property="og:description" content="${escapeHtml(ogDescription)}">
  <meta property="og:url" content="${escapeHtml(record.canonical)}">
  <meta property="og:image" content="${escapeHtml(absoluteUrl(ogImage))}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapeHtml(`${record.schoolName} PTA関連資料・評価`)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(`${record.schoolName} PTA関連資料・評価`)}">
  <meta name="twitter:description" content="${escapeHtml(ogDescription)}">
  <meta name="twitter:image" content="${escapeHtml(absoluteUrl(ogImage))}">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
  <link rel="canonical" href="${escapeHtml(record.canonical)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/archive.css">

${gaTag()}
</head>
<body>
  <main class="archive-school-page">
    <p><a class="archive-back" href="/national-archive.html">全国資料館へ戻る</a></p>

    <section class="archive-hero">
      <div class="archive-kicker">ATSUGI ${escapeHtml(record.schoolType)}</div>
      <h1>${escapeHtml(record.schoolName)} PTA関連資料・評価</h1>
      <p class="archive-school-author">作成主体：PTA適正化推進委員会</p>
      <div class="archive-print-actions archive-print-top">
        <button class="archive-print-button" type="button" onclick="window.print()">このページをPDF保存</button>
      </div>
      <p>${escapeHtml(record.summary)}</p>
    </section>

    <section class="archive-section">
      <h2>資料確認状況</h2>
      <div class="archive-grid">
        <div class="archive-box"><div class="archive-label">自治体</div><div class="archive-value">${escapeHtml(record.municipality)}</div></div>
        <div class="archive-box"><div class="archive-label">学校区分</div><div class="archive-value">${escapeHtml(record.schoolType)}</div></div>
        <div class="archive-box archive-status-card ${escapeHtml(statusClass)}"><div class="archive-label">評価状況</div><div class="archive-value">${escapeHtml(record.status)}</div></div>
        <div class="archive-box"><div class="archive-label">確認資料</div><div class="archive-value">${escapeHtml(documentName)}</div></div>
        <div class="archive-box"><div class="archive-label">入会申込書</div><div class="archive-value">${escapeHtml(applicationStatus)}</div></div>
        <div class="archive-box"><div class="archive-label">PDF</div><div class="archive-value">${escapeHtml(pdfStatus)}</div></div>
      </div>
    </section>

    <section class="archive-section">
      <h2>資料画像</h2>
${renderImages(record)}
    </section>

    <section class="archive-section">
      <h2>確認できる事実</h2>
      ${renderList(record.confirmedFacts, "資料確認後に記載します。")}
    </section>

    <section class="archive-section">
      <h2>資料上確認できない点</h2>
      ${renderList(record.unconfirmedPoints, "資料確認後に記載します。")}
    </section>

    <section class="archive-section">
      <h2>疑義フラグ</h2>
      ${renderTags(record.riskFlags)}
    </section>

    <section class="archive-section">
      <h2>当委員会の評価</h2>
${renderParagraphs(record.evaluation, "評価準備中です。資料確認後に追記します。")}
    </section>

    <section class="archive-section archive-print-save-section">
      <h2>このページをPDF保存</h2>
      <p class="archive-print-note">このボタンを押すと、資料画像・確認できる事実・疑義フラグ・当委員会評価を含めた学校別ページ全体をPDFとして保存できます。ブラウザの印刷画面で「PDFに保存」を選択してください。</p>
      <button class="archive-print-button" type="button" onclick="window.print()">このページをPDF保存</button>${renderPdfLinks(record)}
    </section>
  </main>
</body>
</html>`;
}

function main() {
  const records = listSchoolData().sort(sortSchools);
  if (!records.length) throw new Error("No school JSON files found under data/schools");
  let changed = 0;
  for (const record of records) {
    const outputDir = path.join(ROOT, "archive", record.citySlug, record.slug);
    const outputFile = path.join(outputDir, "index.html");
    const html = renderSchoolPage(record);
    if (writeFileIfChanged(outputFile, html)) changed += 1;
  }
  console.log(`Generated ${records.length} school pages (${changed} changed).`);
}

if (require.main === module) {
  main();
}

module.exports = { renderSchoolPage };
