# ptaorg.github.io 本体サイト用トップ改善パッチ

対象リポジトリ:
https://github.com/ptaorg/ptaorg.github.io

## 反映内容

上部写真スライドショーは変更しません。
既存の `.hero-content-wrap` の直後に、画像付きの入口群を追加します。

追加される内容:
- 保護者向け入口
- PTA役員向け入口
- 学校・教育委員会向け入口
- 実物資料庫・回答DB・edu指針への導線
- 入会、会費、個人情報、教職員関与の論点別カード
- 資料カタログ、回答DB、検索へのカード

## アップロードするファイル

ZIP内の以下を、リポジトリ直下にそのままアップロードしてください。

- assets/home/*.webp
- css/home-enhance.css
- js/home-enhance.js

## index.html に追加する2行

`</head>` の直前に追加:

<link rel="stylesheet" href="css/home-enhance.css">

`</body>` の直前に追加:

<script defer src="js/home-enhance.js"></script>

## 注意

- 上部写真画像は変更しません。
- 既存の画像ファイルは上書きしません。
- 既存の本文・資料本文・教育委員会回答本文は変更しません。
- Googleサイトへの誘導は追加しません。