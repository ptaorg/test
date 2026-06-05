厚木市資料 正規化ZIP

このZIPは、アップロードされた厚木市PDFを学校別フォルダに整理し、PDF各ページをPNG画像化したものです。

使い方：
1. このZIPの中の `assets/archive/atsugi/` を、ptaorg.github.io リポジトリの同じ場所へコピーしてください。
2. リポジトリで `npm run sync:materials` を実行してください。
3. 問題なければ `npm run sync:materials:write` を実行してください。
4. `npm run generate:all` を実行してください。
5. 画面確認後、commit / push してください。

注意：
- 既に同名の 01.png / 02.png がある学校は、コピーすると上書きになります。
- 評価文はこのZIPでは作成・変更していません。
- `source-pdfs/` は元PDF保存用です。サイト表示用の同期対象ではありません。
- `COMMON/` は学校別でない通知資料です。
- `UNMAPPED/` は厚木市学校一覧と照合できなかった資料です。今回は「麦田小学校」を未確認扱いにしています。
- slug名は既存生成基盤に合わせる前提で整理しています。もしリポジトリ側のslugが違う場合は、該当フォルダ名を合わせてください。

