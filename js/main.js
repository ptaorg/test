// PTA適正化推進委員会 — legacy main.js bridge
// 古いページが site.js ではなく main.js だけを読む場合でも、主要ナビとフッターを共通化する。

const SUPPORT_URL = '/support.html';
const CONTACT_URL = '/contact.html';

const legacySiteIndex = [
  { title: 'トップ', url: '/index.html', desc: 'PTA適正化推進委員会の入口。任意加入、公私分離、個人情報、会費徴収、学校関与の全体像。' },
  { title: '保護者の方へ', url: '/guide-parent.html', desc: 'PTAの入会、退会、会費、個人情報、役員強制に悩む保護者向けの説明。' },
  { title: 'PTA役員の方へ', url: '/guide-pta.html', desc: 'PTA役員が運営を適正化するための確認事項。入会記録、会計、個人情報、学校との分離。' },
  { title: '教育委員会・学校の方へ', url: '/guide-board.html', desc: '学校が関与する範囲を点検する行政・学校管理職向けの説明。' },
  { title: '全国の教育委員会の回答', url: '/board-responses.html', desc: '全国の教育委員会からの回答を整理。任意加入、会費徴収、個人情報、学校関与。' },
  { title: '実際のPTA文書', url: '/national-archive.html', desc: '日本地図から、厚木市など自治体別・学校別の実際のPTA文書を確認する入口。' },
  { title: '資料・文書解説', url: '/documents.html', desc: 'PTA資料を読む際の確認観点を整理した解説ページ。' },
  { title: '研究ノート・論考', url: '/journal.html', desc: 'PTA運営の法的構造、行政対応、判例、法制度、調査報告の論考。' },
  { title: '応援', url: SUPPORT_URL, desc: '公文書開示、資料整理、Web公開を継続するための支援。' },
  { title: '情報提供', url: CONTACT_URL, desc: 'PTA文書、教育委員会回答、学校配布物などの情報提供窓口。' }
];

function initLegacyUnifiedNavigation() {
  const desktop = document.querySelector('.desktop-nav');
  if (desktop) {
    desktop.innerHTML = `
      <a class="nav-link" href="/index.html">トップ</a>
      <div class="nav-item has-dropdown"><a class="nav-link" href="#">立場別</a><div class="mega-menu"><div class="mega-col"><h4>立場別3分類</h4><ul><li><a href="/guide-parent.html">保護者の方へ</a></li><li><a href="/guide-pta.html">PTA役員の方へ</a></li><li><a href="/guide-board.html">教育委員会・学校の方へ</a></li></ul></div></div></div>
      <a class="nav-link" href="/board-responses.html">教育委員会回答</a>
      <a class="nav-link" href="/national-archive.html">実際のPTA文書</a>
      <div class="nav-item has-dropdown"><a class="nav-link" href="/journal.html">研究ノート</a><div class="mega-menu"><div class="mega-col"><h4>研究ノート・論考</h4><ul><li><a href="/journal.html">論考・調査報告</a></li><li><a href="/law-map.html">法制度マップ</a></li><li><a href="/cases.html">判例整理</a></li><li><a href="/report.html">総合分析レポート</a></li></ul></div><div class="mega-col"><h4>論点別ノート</h4><ul><li><a href="/membership.html">入会手続</a></li><li><a href="/privacy.html">個人情報</a></li><li><a href="/fee-collection.html">会費徴収</a></li><li><a href="/personnel.html">教職員関与</a></li><li><a href="/facilities.html">施設利用</a></li></ul></div></div></div>
      <a class="nav-link support-nav-link" href="${SUPPORT_URL}">応援</a>
      <a class="nav-link" href="${CONTACT_URL}">情報提供</a>`;
  }
  const mobile = document.getElementById('mobileOverlay');
  if (mobile) {
    mobile.innerHTML = `<a class="mobile-link" href="/index.html"><span>Top</span>トップ</a><a class="mobile-link" href="/guide-parent.html"><span>Parents</span>保護者の方へ</a><a class="mobile-link" href="/guide-pta.html"><span>PTA Board</span>PTA役員の方へ</a><a class="mobile-link" href="/guide-board.html"><span>School / Board</span>教育委員会・学校の方へ</a><a class="mobile-link" href="/board-responses.html"><span>Responses</span>教育委員会回答</a><a class="mobile-link" href="/national-archive.html"><span>Documents</span>実際のPTA文書</a><a class="mobile-link" href="/journal.html"><span>Research</span>研究ノート・論考</a><a class="mobile-link support-mobile-link" href="${SUPPORT_URL}"><span>Support</span>応援・寄付</a><a class="mobile-link" href="${CONTACT_URL}"><span>Contact</span>お問い合わせ・情報提供</a><div class="close-overlay" id="closeOverlay">CLOSE ×</div>`;
  }
}

function initLegacySearch() {
  document.querySelectorAll('.search-input').forEach(input => {
    const dropdown = input.closest('.header-search')?.querySelector('.search-results-dropdown');
    if (!dropdown) return;
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { dropdown.classList.remove('is-open'); return; }
      const hits = legacySiteIndex.filter(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)).slice(0, 8);
      dropdown.innerHTML = hits.length ? hits.map(p => `<a href="${p.url}" class="srd-item"><div class="srd-item-title">${p.title}</div><div class="srd-item-desc">${p.desc}</div></a>`).join('') : `<div class="srd-empty">「${input.value}」に一致するページが見つかりません</div>`;
      dropdown.classList.add('is-open');
    });
    document.addEventListener('click', e => { if (!input.closest('.header-search').contains(e.target)) dropdown.classList.remove('is-open'); });
  });
}

function initLegacyMegaMenu() {
  document.querySelectorAll('.nav-item.has-dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', e => {
      const item = link.closest('.nav-item');
      if (window.innerWidth > 860) {
        if (link.getAttribute('href') === '#') e.preventDefault();
        item.classList.toggle('is-open');
        document.querySelectorAll('.nav-item.is-open').forEach(i => { if (i !== item) i.classList.remove('is-open'); });
      }
    });
  });
  document.addEventListener('click', e => { if (!e.target.closest('.nav-item')) document.querySelectorAll('.nav-item.is-open').forEach(i => i.classList.remove('is-open')); });
}

function initLegacyHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mobileOverlay = document.getElementById('mobileOverlay');
  if (!hamburger || !mobileOverlay) return;
  hamburger.onclick = () => { mobileOverlay.classList.add('is-open'); hamburger.setAttribute('aria-expanded', 'true'); };
  const closeOverlay = document.getElementById('closeOverlay');
  if (closeOverlay) closeOverlay.onclick = () => { mobileOverlay.classList.remove('is-open'); hamburger.setAttribute('aria-expanded', 'false'); };
}

function initLegacyUnifiedFooter() {
  const footer = document.querySelector('footer.footer');
  if (!footer || footer.dataset.unified === 'true') return;
  footer.dataset.unified = 'true';
  footer.innerHTML = `<div class="footer-inner unified-footer-inner"><div class="footer-grid unified-footer-grid"><div><h3>PTA適正化推進委員会</h3><div class="footer-contact"><p>〒235-0021<br>神奈川県横浜市磯子区岡村8-17-5-301</p><p><strong>070-9012-7772</strong></p><p><a href="mailto:info@ptaorg.com">info@ptaorg.com</a></p></div><a class="yokomusubi-img-link" href="https://yokomusubi.city.yokohama.lg.jp/organizations/detail/f69c7ad2-cf21-4dfa-87bb-9c891874eb6b/" rel="noopener noreferrer" target="_blank"><img alt="よこむすび" src="/assets/yokomusubi.png"></a><p class="yokomusubi-tagline-out">磯子区「よこむすび」掲載団体</p><p class="yokomusubi-meta-out">登録番号：磯子12406　分類番号：12-4（市民活動・社会教育推進）</p></div><div><h4>公式発信</h4><p class="footer-sns-sub">最新資料・論考・動画はこちら</p><div class="footer-sns-cards"><a class="fsns-card fsns-x" href="https://x.com/jjjqqqxxx0852" rel="noopener" target="_blank"><span class="fsns-icon">𝕏</span><div><div class="fsns-name">X</div><div class="fsns-desc">速報・資料更新</div></div></a><a class="fsns-card fsns-yt" href="https://www.youtube.com/@PTA%E9%81%A9%E6%AD%A3%E5%8C%96%E6%8E%A8%E9%80%B2%E5%A7%94%E5%93%A1%E4%BC%9A" rel="noopener" target="_blank"><span class="fsns-icon">▶</span><div><div class="fsns-name">YouTube</div><div class="fsns-desc">動画で解説</div></div></a><a class="fsns-card fsns-note" href="https://note.com/hiroshisatoh" rel="noopener" target="_blank"><span class="fsns-icon">□</span><div><div class="fsns-name">note</div><div class="fsns-desc">論考・研究ノート</div></div></a></div></div><div><h4>立場別</h4><ul><li><a href="/guide-parent.html">保護者</a></li><li><a href="/guide-pta.html">PTA役員</a></li><li><a href="/guide-board.html">教育委員会・学校</a></li></ul></div><div><h4>資料・支援</h4><ul><li><a href="/board-responses.html">教育委員会の回答</a></li><li><a href="/national-archive.html">実際のPTA文書</a></li><li><a href="/journal.html">研究ノート・論考</a></li><li><a href="${SUPPORT_URL}">応援・寄付</a></li><li><a href="${CONTACT_URL}">情報提供</a></li></ul></div></div><div class="footer-support unified-footer-support"><div><strong>調査・資料公開の継続を応援してください</strong><p>公文書開示、資料整理、Web公開、自治体・学校への働きかけに活用します。</p></div><a href="${SUPPORT_URL}">応援ページへ</a></div><p class="copyright">© PTA適正化推進委員会</p></div>`;
}

function initLegacyGlobalStyle() {
  if (document.getElementById('legacy-unified-nav-style')) return;
  const style = document.createElement('style');
  style.id = 'legacy-unified-nav-style';
  style.textContent = `.desktop-nav{gap:18px!important}.desktop-nav>.btn-gold{display:none!important}.nav-link:hover,.mega-col a:hover,.mobile-link:hover,.footer a:hover{color:var(--orange)!important}.support-strip-link:hover,.support-nav-link:hover{background:var(--orange)!important;border-color:var(--orange)!important;color:#fff!important}@media(max-width:1120px){.desktop-nav{gap:10px!important}.nav-link{font-size:.82rem!important}}.unified-footer-inner{max-width:1280px;margin:0 auto;padding:56px 32px 28px}.unified-footer-grid{display:grid;grid-template-columns:1.25fr 1fr .8fr 1fr;gap:42px;align-items:start}.footer-sns-cards{display:grid;gap:10px}.fsns-card{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;text-decoration:none;color:#fff!important}.fsns-icon{font-weight:900;font-size:1.25rem;width:24px;text-align:center}.fsns-name{font-weight:900}.fsns-desc{font-size:.8rem;opacity:.9}.fsns-x{background:#111827}.fsns-yt{background:#dc0000}.fsns-note{background:#00a67a}.unified-footer-support{background:linear-gradient(135deg,#f59e0b,#ea580c)!important;border:1px solid rgba(255,255,255,.38)!important;color:#fff!important;box-shadow:0 18px 44px rgba(234,88,12,.25)!important}.unified-footer-support p,.unified-footer-support strong{color:#fff!important}.unified-footer-support a{background:#fff!important;color:#c2410c!important;border:0!important;font-weight:900}.yokomusubi-img-link img{max-width:170px;height:auto;background:#fff}@media(max-width:900px){.unified-footer-grid{grid-template-columns:1fr 1fr}}@media(max-width:640px){.unified-footer-grid{grid-template-columns:1fr}.unified-footer-inner{padding:42px 24px 24px}}`;
  document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded',()=>{initLegacyGlobalStyle();initLegacyUnifiedNavigation();initLegacyUnifiedFooter();initLegacySearch();initLegacyMegaMenu();initLegacyHamburger();});
