/* board-responses.js — 地方別索引 + 分類シート別・回答本文 + 地図ピン */
(function () {
  'use strict';
  const DATA = window.PTA_BOARD_RESPONSE_INDEX || {};

  /* ─────────────────────────────────────────────
     地図上に後付けされた赤い手動ピンの抑制
     通常のLeaflet地図が動く場合は重ね表示を消し、
     Leafletが使えない場合の代替表示だけ紺＋金にする。
  ───────────────────────────────────────────── */
  function injectMapPinFix() {
    if (document.getElementById('board-response-map-pin-fix')) return;
    const style = document.createElement('style');
    style.id = 'board-response-map-pin-fix';
    style.textContent = `
      #responseMap.leaflet-container .manual-map-pin-layer{
        display:none!important;
      }
      .manual-map-pin{
        background:#1e3a5f!important;
        color:#fff!important;
        border:1px solid rgba(212,175,55,.9)!important;
        box-shadow:0 8px 18px rgba(15,39,66,.22)!important;
      }
      .manual-map-pin::before{
        color:#d4af37!important;
      }
      .manual-map-pin:hover{
        background:#2d5a8e!important;
        color:#fff!important;
      }
    `;
    document.head.appendChild(style);
  }

  /* ─────────────────────────────────────────────
     自治体索引前：参考になる回答例
  ───────────────────────────────────────────── */
  function injectGoodAnswerExamples() {
    if (document.getElementById('goodAnswerExamples')) return;
    const indexSection = document.getElementById('municipality-index');
    if (!indexSection) return;

    if (!document.getElementById('good-answer-examples-style')) {
      const style = document.createElement('style');
      style.id = 'good-answer-examples-style';
      style.textContent = `
        .good-answer-examples-section{
          background:#fff;
          padding:58px 0 60px;
          border-bottom:1px solid var(--line);
        }
        .good-answer-examples-section .section-lead{
          max-width:900px;
        }
        .good-answer-note{
          max-width:920px;
          margin:22px 0 28px;
          padding:18px 20px;
          background:#fffdf3;
          border:1px solid #f1df9b;
          border-left:6px solid var(--gold);
          border-radius:0 14px 14px 0;
          color:#374151;
          font-size:.93rem;
          line-height:1.9;
        }
        .good-answer-list{
          list-style:none;
          margin:0;
          padding:0;
          display:grid;
          gap:14px;
          max-width:980px;
        }
        .good-answer-list li{
          background:#fff;
          border:1px solid #dbe4ee;
          border-left:6px solid #1e3a5f;
          border-radius:0 14px 14px 0;
          padding:20px 22px;
        }
        .good-answer-list h3{
          margin:0 0 8px;
          color:var(--navy);
          font-family:'Noto Serif JP',serif;
          font-size:1.08rem;
          line-height:1.45;
        }
        .good-answer-list h3 span{
          display:inline-flex;
          margin-left:8px;
          padding:2px 8px;
          border-radius:999px;
          background:#fef3c7;
          color:#7a4b00;
          font-family:'Noto Sans JP',sans-serif;
          font-size:.72rem;
          font-weight:900;
          vertical-align:middle;
        }
        .good-answer-list p{
          margin:0;
          color:#334155;
          font-size:.92rem;
          line-height:1.9;
        }
        .good-answer-list a{
          display:inline-flex;
          margin-top:10px;
          color:var(--navy);
          font-size:.84rem;
          font-weight:900;
          text-decoration:none;
          border-bottom:2px solid var(--gold);
        }
        .good-answer-list a:hover{
          color:var(--orange);
          border-bottom-color:var(--orange);
        }
      `;
      document.head.appendChild(style);
    }

    const section = document.createElement('section');
    section.className = 'good-answer-examples-section';
    section.id = 'goodAnswerExamples';
    section.innerHTML = `
      <div class="wrap">
        <h2 class="section-title">参考になる回答例</h2>
        <p class="section-lead">回答本文の中には、単に「PTAは任意団体」と述べるだけでなく、入会申込書による意思確認、個人情報の取扱い、会費徴収の委任関係、学校施設利用や学校協力の見直しにまで踏み込むものがあります。自治体索引を見る前に、比較の基準になる回答例を確認してください。</p>
        <div class="good-answer-note">特に重要なのは、PTA内部を教育委員会が支配するという話ではなく、学校が提供している協力範囲を点検している点です。学校施設、学校配布、学校徴収、学校保有情報、教職員関与は、PTA内部の問題ではなく、学校側の管理判断として整理できます。</div>
        <ol class="good-answer-list">
          <li>
            <h3>徳島市 <span>施設利用・学校協力</span></h3>
            <p>学校教育法137条に基づく学校施設の目的外使用について、団体の利用目的・態様を含めて「学校教育上の支障」を判断すると整理しています。入学説明会等でのPTA案内についても、学校教育活動と混同され、加入への圧力が生じないよう配慮が必要と述べ、是正措置が講じられない団体への措置検討にも触れています。</p>
            <a href="#ans-42">徳島市の回答本文へ</a>
          </li>
          <li>
            <h3>魚沼市 <span>施設利用・入会申込書</span></h3>
            <p>PTA入会には保護者の申込みとPTAの承諾が望ましい、入会申込書の提出が望ましい、学校による会費徴収は無権代理に該当すると回答しています。さらに、PTAが学校施設を利用するためにも、PTAの適切な運用を指導していくと述べています。</p>
            <a href="#ans-75">魚沼市の回答本文へ</a>
          </li>
          <li>
            <h3>利根町 <span>申込書・同意書</span></h3>
            <p>PTA入会は、学校からの説明、書面等による保護者の意思表示、PTAの承諾によって成立すると整理しています。申込書や同意書等による加入意思の確認が必要であり、徴収していない場合は是正の必要性を伝え、指導・助言を行うとしています。</p>
            <a href="#ans-13">利根町の回答本文へ</a>
          </li>
          <li>
            <h3>兵庫県西脇市 <span>みなし入会否定</span></h3>
            <p>PTAは任意加入の団体であり、入会には保護者の明確な申込み意思表示とPTAの承諾が必要であると整理しています。意思確認をしないまま児童生徒の入学をもって自動的に会員とする「みなし入会」方式では、契約が成立しているとは判断できないと明示しています。</p>
            <a href="#ans-12">兵庫県西脇市の回答本文へ</a>
          </li>
          <li>
            <h3>兵庫県 <span>入会届・委任状</span></h3>
            <p>PTAは任意団体であり、入退会は自由であるため、みなし入会は不適切と整理しています。会費徴収等の事務処理については書面による委任状が必要であり、入会についても書面等による入会届を整備し、意思確認が必要であるとしています。</p>
            <a href="#ans-11">兵庫県の回答本文へ</a>
          </li>
        </ol>
      </div>
    `;
    indexSection.parentNode.insertBefore(section, indexSection);
  }

  /* ─────────────────────────────────────────────
     都道府県マッピング (76自治体)
  ───────────────────────────────────────────── */
  const PREF = {
    "いの町":        "高知県",
    "さくら市":      "栃木県",
    "三戸町":        "青森県",
    "三重県":        "三重県",
    "三鷹市":        "東京都",
    "下妻市":        "茨城県",
    "中央市":        "山梨県",
    "亀岡市":        "京都府",
    "京都市":        "京都府",
    "仙台市":        "宮城県",
    "兵庫県":        "兵庫県",
    "兵庫県西脇市":  "兵庫県",
    "利根町":        "茨城県",
    "北九州市":      "福岡県",
    "千葉県鴨川市":  "千葉県",
    "厚木市":        "神奈川県",
    "只見町":        "福島県",
    "嘉麻市":        "福岡県",
    "土佐清水市":    "高知県",
    "堺市":          "大阪府",
    "多摩市":        "東京都",
    "大分県":        "大分県",
    "大阪市":        "大阪府",
    "大阪府":        "大阪府",
    "姫路市":        "兵庫県",
    "安曇野市":      "長野県",
    "宝塚市":        "兵庫県",
    "宮城県大崎市":  "宮城県",
    "宮城県白石市":  "宮城県",
    "富岡町":        "福島県",
    "寒川町":        "神奈川県",
    "尼崎市":        "兵庫県",
    "山中湖村":      "山梨県",
    "山梨県鳴沢村":  "山梨県",
    "岐阜県東白川村":"岐阜県",
    "岡山市":        "岡山県",
    "岩手県九戸村":  "岩手県",
    "川口市":        "埼玉県",
    "川崎市":        "神奈川県",
    "平塚市":        "神奈川県",
    "座間市":        "神奈川県",
    "徳島市":        "徳島県",
    "愛知県":        "愛知県",
    "愛知県愛西市":  "愛知県",
    "愛知県犬山市":  "愛知県",
    "愛知県豊橋市":  "愛知県",
    "日光市":        "栃木県",
    "東京都":        "東京都",
    "東京都町田市":  "東京都",
    "東大阪市":      "大阪府",
    "東秩父村":      "埼玉県",
    "横浜市":        "神奈川県",
    "橋本市":        "和歌山県",
    "海老名市":      "神奈川県",
    "玉名市":        "熊本県",
    "相模原市":      "神奈川県",
    "福島県国見町":  "福島県",
    "秋田市":        "秋田県",
    "粟島浦村":      "新潟県",
    "茅ヶ崎市":      "神奈川県",
    "茅野市":        "長野県",
    "茨木市":        "大阪府",
    "蒲郡市":        "愛知県",
    "西宮市":        "兵庫県",
    "豊田市":        "愛知県",
    "野洲市":        "滋賀県",
    "長野県":        "長野県",
    "門真市":        "大阪府",
    "青森県横浜町":  "青森県",
    "静岡市":        "静岡県",
    "静岡県磐田市":  "静岡県",
    "須賀川市":      "福島県",
    "高根沢町":      "栃木県",
    "高槻市":        "大阪府",
    "魚沼市":        "新潟県",
    "鹿児島市":      "鹿児島県"
  };

  const REGIONS = [
    { id: 'hokkaido-tohoku', name: '北海道・東北',
      prefs: ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県'] },
    { id: 'kanto', name: '関東',
      prefs: ['茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県'] },
    { id: 'chubu', name: '中部',
      prefs: ['新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県'] },
    { id: 'kinki', name: '近畿',
      prefs: ['滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県'] },
    { id: 'chugoku-shikoku', name: '中国・四国',
      prefs: ['鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県'] },
    { id: 'kyushu', name: '九州・沖縄',
      prefs: ['福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'] }
  ];

  function getPref(name) { return PREF[name] || '不明'; }
  function getRegionId(pref) {
    for (const r of REGIONS) { if (r.prefs.includes(pref)) return r.id; }
    return 'other';
  }
  function ansId(no) { return 'ans-' + no; }
  function esc(s) {
    return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

  /* ─────────────────────────────────────────────
     地方別・都道府県別・自治体索引
  ───────────────────────────────────────────── */
  function renderIndex() {
    const el = document.getElementById('regionIndex');
    if (!el) return;

    const munis = DATA.municipalities || [];
    const tree  = {};

    for (const m of munis) {
      const pref = getPref(m.municipality);
      const rid  = getRegionId(pref);
      if (!tree[rid]) tree[rid] = {};
      if (!tree[rid][pref]) tree[rid][pref] = [];
      tree[rid][pref].push(m);
    }

    let html = '';
    for (const region of REGIONS) {
      const prefs = tree[region.id];
      if (!prefs || !Object.keys(prefs).length) continue;

      html += `<section class="region-block" data-region="${region.id}">`;
      html += `<h3 class="region-heading">${esc(region.name)}</h3>`;

      for (const pref of Object.keys(prefs).sort()) {
        const list = prefs[pref].slice().sort((a, b) => a.no - b.no);
        html += `<div class="prefecture-group">`;
        html += `<h4 class="pref-heading">${esc(pref)}</h4>`;
        html += `<ul class="municipality-list">`;
        for (const m of list) {
          const badge = m.detailCount > 1
            ? `<span class="muni-count">${m.detailCount}件</span>` : '';
          html += `<li><a href="#${ansId(m.no)}" class="muni-link">${esc(m.municipality)}${badge}</a></li>`;
        }
        html += `</ul></div>`;
      }
      html += `</section>`;
    }

    /* 未分類 */
    const other = tree['other'];
    if (other) {
      html += `<section class="region-block" data-region="other">`;
      html += `<h3 class="region-heading">その他・都道府県未分類</h3>`;
      html += `<ul class="municipality-list">`;
      for (const [, list] of Object.entries(other)) {
        for (const m of list.sort((a, b) => a.no - b.no)) {
          const badge = m.detailCount > 1
            ? `<span class="muni-count">${m.detailCount}件</span>` : '';
          html += `<li><a href="#${ansId(m.no)}" class="muni-link">${esc(m.municipality)}${badge}</a></li>`;
        }
      }
      html += `</ul></section>`;
    }

    el.innerHTML = html;
  }

  /* ─────────────────────────────────────────────
     分類シート別・回答本文
  ───────────────────────────────────────────── */
  function renderBodies() {
    const el = document.getElementById('responseBodiesContent');
    if (!el) return;

    const details = DATA.details || [];
    const typeMap = DATA.typeMap || {};
    const munis   = DATA.municipalities || [];

    const muniByName = {};
    for (const m of munis) muniByName[m.municipality] = m;

    const anchored = new Set();
    const TYPES    = ['A','B','C','D','E','F','G'];
    let html = '';

    for (const type of TYPES) {
      const typeDetails = details.filter(d => d.type === type);
      if (!typeDetails.length) continue;

      const info = typeMap[type] || {};
      html += `<section class="type-section" id="type-${type}">`;
      html += `<h3 class="type-heading"><span class="type-label-badge">${esc(type)}</span>${esc(info.title || type)}</h3>`;

      /* 自治体ごとにグループ化 */
      const byNo = {};
      for (const d of typeDetails) {
        const m  = muniByName[d.municipality];
        const no = m ? m.no : d.municipality;
        if (!byNo[no]) byNo[no] = { name: d.municipality, no, items: [] };
        byNo[no].items.push(d);
      }

      const groups = Object.values(byNo).sort((a, b) => {
        const na = typeof a.no === 'number' ? a.no : 9999;
        const nb = typeof b.no === 'number' ? b.no : 9999;
        return na - nb;
      });

      for (const g of groups) {
        const no = typeof g.no === 'number' ? g.no : null;
        const first = no !== null && !anchored.has(no);
        if (first) anchored.add(no);
        const idAttr = first ? ` id="${ansId(no)}"` : '';

        if (g.items.length === 1) {
          const d = g.items[0];
          const dateStr  = d.date || '未確認';
          const bodyText = d.body || '回答本文未掲載。原資料または関連ファイルで確認が必要です。';
          html += `<article${idAttr} class="response-item">`;
          html += `<h4 class="response-muni-name">${esc(g.name)}</h4>`;
          html += `<p class="response-meta">分類：${esc(d.typeLabel || type)} ／ 回答日：${esc(dateStr)}</p>`;
          html += `<details><summary>回答本文を読む</summary>`;
          html += `<div class="response-body">${esc(bodyText)}</div></details>`;
          html += `<p class="back-to-index"><a href="#municipality-index">▲ 自治体索引へ戻る</a></p>`;
          html += `</article>`;
        } else {
          html += `<section${idAttr} class="municipality-response-group">`;
          html += `<h4 class="response-muni-name">${esc(g.name)}</h4>`;
          html += `<p class="response-count">回答件数：${g.items.length}件</p>`;
          for (const d of g.items) {
            const dateStr  = d.date || '未確認';
            const bodyText = d.body || '回答本文未掲載。原資料または関連ファイルで確認が必要です。';
            html += `<article class="response-item sub-item">`;
            html += `<h5>${esc(d.typeLabel || type)}：${esc(d.typeTitle || '')}</h5>`;
            html += `<p class="response-meta">回答日：${esc(dateStr)}</p>`;
            html += `<details><summary>回答本文を読む</summary>`;
            html += `<div class="response-body">${esc(bodyText)}</div></details>`;
            html += `</article>`;
          }
          html += `<p class="back-to-index"><a href="#municipality-index">▲ 自治体索引へ戻る</a></p>`;
          html += `</section>`;
        }
      }
      html += `</section>`; /* type-section */
    }

    el.innerHTML = html;
  }

  /* ─────────────────────────────────────────────
     全国マップ（ピン → 回答本文へ）
  ───────────────────────────────────────────── */
  function initMap() {
    const el = document.getElementById('responseMap');
    if (!el || typeof L === 'undefined') return;

    const map = L.map('responseMap', { scrollWheelZoom: false })
      .setView([36.2, 138.2], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const group = L.featureGroup();
    for (const m of DATA.municipalities || []) {
      if (!Array.isArray(m.coordinates)) continue;
      const targetId = ansId(m.no);

      const marker = L.circleMarker(m.coordinates, {
        radius: 7,
        color: '#1e3a5f',
        fillColor: '#d4af37',
        fillOpacity: 0.88,
        weight: 2
      });

      marker.bindTooltip(
        `<strong>${m.municipality}</strong><br><small>クリックで回答本文へ</small>`,
        { permanent: false, direction: 'top', offset: [0, -8] }
      );

      marker.on('click', function () {
        const target = document.getElementById(targetId);
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const det = target.querySelector('details');
        if (det && !det.open) det.open = true;
      });

      marker.addTo(map);
      group.addLayer(marker);
    }

    if (group.getLayers().length) map.fitBounds(group.getBounds().pad(0.1));
  }

  /* ─────────────────────────────────────────────
     自治体名絞り込み検索
  ───────────────────────────────────────────── */
  function initSearch() {
    const input = document.getElementById('muniSearch');
    if (!input) return;

    input.addEventListener('input', function () {
      const q = this.value.trim();
      document.querySelectorAll('.muni-link').forEach(function (a) {
        const li = a.parentElement;
        if (li) li.style.display = (!q || a.textContent.includes(q)) ? '' : 'none';
      });
      document.querySelectorAll('.prefecture-group').forEach(function (pg) {
        const vis = [...pg.querySelectorAll('li')].some(li => li.style.display !== 'none');
        pg.style.display = vis ? '' : 'none';
      });
      document.querySelectorAll('.region-block').forEach(function (rb) {
        const vis = [...rb.querySelectorAll('li')].some(li => li.style.display !== 'none');
        rb.style.display = vis ? '' : 'none';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectMapPinFix();
    injectGoodAnswerExamples();
    renderIndex();
    renderBodies();
    initMap();
    initSearch();
  });
})();