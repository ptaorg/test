# Codex用：Drive資料をサイトへ取り込む手順

対象: `ptaorg/ptaorg.github.io`

## 作業目的
`source_candidates.csv` / `source_candidates.json` に記載されたGoogle Drive上のPDF候補を確認し、一次資料・重要資料として使えるものだけをサイトに取り込む。

## 重要
- `ptaorg/pta` は触らない。
- PDF本体をダウンロードできる場合のみ配置する。
- 存在しないPDFリンクを作らない。
- 公式資料・一次資料・参考資料を分類して掲載する。
- 重複PDFは1本にまとめる。

## 推奨配置
- 行政資料・通知資料: `assets/documents/administrative-materials/`
- 学校徴収金マニュアル: `assets/documents/school-fee-guidelines/`
- 職務専念・教職員関与資料: `assets/documents/personnel/`
- 消費者契約法資料: `assets/documents/legal/`

## 確認
1. PDFリンクが404でないこと
2. 公式資料と参考研究を混同していないこと
3. administrative-materials.html の資料カードに出典種別を明示すること
4. sitemap.xml にPDFを無理に入れないこと
