
(function () {
  const App = {
    role: null,
    step: 0,
    answers: [],
    chart: null,

    init() {
      document.querySelectorAll('[data-role]').forEach((btn) => {
        btn.addEventListener('click', () => this.start(btn.dataset.role));
      });
      const restart = document.getElementById('restartAudit');
      const back = document.getElementById('backToHome');
      const share = document.getElementById('shareResult');
      if (restart) restart.addEventListener('click', () => this.reset());
      if (back) back.addEventListener('click', () => window.location.href = '../index.html');
      if (share) share.addEventListener('click', () => this.share());
      const prev = document.getElementById('prevQuestion');
      if (prev) prev.addEventListener('click', () => this.prev());
    },

    start(role) {
      this.role = role;
      this.step = 0;
      this.answers = [];
      this.toggle('intro', false);
      this.toggle('question', true);
      this.toggle('result', false);
      this.renderQuestion();
    },

    reset() {
      this.role = null;
      this.step = 0;
      this.answers = [];
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
      this.toggle('intro', true);
      this.toggle('question', false);
      this.toggle('result', false);
      const qScreen = document.getElementById("screen-question"); if(qScreen){ const top = qScreen.getBoundingClientRect().top + window.pageYOffset - 80; window.scrollTo({ top: Math.max(0, top), behavior: "smooth" }); }
    },

    toggle(name, show) {
      const el = document.getElementById(`screen-${name}`);
      if (el) el.classList.toggle('hidden', !show);
    },

    getQuestions() {
      return window.AuditEngine.getQuestions(this.role);
    },

    renderQuestion() {
      const questions = this.getQuestions();
      const q = questions[this.step];
      if (!q) return;

      document.getElementById('questionCategory').textContent = q.cat;
      document.getElementById('questionText').textContent = q.q;
      document.getElementById('questionCounter').textContent = `設問 ${this.step + 1} / ${questions.length}`;
      document.getElementById('progressFill').style.width = `${(this.step / questions.length) * 100}%`;

      const options = document.getElementById('questionOptions');
      options.innerHTML = '';
      q.opts.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="mark">${index + 1}</span><span class="text">${opt.t}</span>`;
        btn.addEventListener('click', () => {
          this.answers[this.step] = { q, opt };
          if (this.step < questions.length - 1) {
            this.step += 1;
            this.renderQuestion();
          } else {
            this.finish();
          }
        });
        options.appendChild(btn);
      });

      document.getElementById('prevQuestion').disabled = this.step === 0;
      const qScreen = document.getElementById("screen-question"); if(qScreen){ const top = qScreen.getBoundingClientRect().top + window.pageYOffset - 80; window.scrollTo({ top: Math.max(0, top), behavior: "smooth" }); }
    },

    prev() {
      if (this.step === 0) return;
      this.step -= 1;
      this.renderQuestion();
    },

    finish() {
      this.toggle('question', false);
      this.toggle('result', true);
      const result = window.AuditEngine.calculate(this.answers);
      this.renderResult(result);
      const qScreen = document.getElementById("screen-question"); if(qScreen){ const top = qScreen.getBoundingClientRect().top + window.pageYOffset - 80; window.scrollTo({ top: Math.max(0, top), behavior: "smooth" }); }
    },

    renderResult(result) {
      const header = document.getElementById('resultHeader');
      header.className = 'result-header';
      if (result.grade.code === 'critical') header.classList.add('danger');
      else if (result.grade.code === 'illegal' || result.grade.code === 'risk') header.classList.add('warning');

      document.getElementById('resultScore').textContent = `${result.score}点`;
      document.getElementById('resultGrade').textContent = result.grade.title;
      document.getElementById('resultSummary').textContent = result.grade.summary;
      document.getElementById('metricSafe').textContent = result.counts.safe;
      document.getElementById('metricRisk').textContent = result.counts.risk;
      document.getElementById('metricIllegal').textContent = result.counts.illegal + result.counts.critical;

      const details = document.getElementById('resultDetails');
      details.innerHTML = '';
      this.answers.forEach((answer) => {
        const div = document.createElement('article');
        div.className = `result-item ${answer.opt.level}`;
        const laws = window.AuditEngine.lawRefs(answer.opt.laws).map((law) => {
          const url = law.evidence?.[0]?.url || '#';
          return `<a href="#" data-law-open="${law.key}">${law.title}</a>`;
        }).join('');
        const links = (answer.opt.evidence || []).map((url) => {
          const label = url ? '関連ページを見る' : '関連資料を見る';
          return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
        }).join('');
        div.innerHTML = `
          <h4>
            <span>${answer.q.cat}</span>
            <span class="status-pill ${answer.opt.level}">${window.AuditEngine.statusLabel(answer.opt.level)}</span>
          </h4>
          <div>${answer.opt.t}</div>
          <div class="advice">${answer.opt.adv}</div>
          ${laws ? `<div class="law-list">${laws}</div>` : ''}
          ${links ? `<div class="result-links">${links}</div>` : ''}
        `;
        details.appendChild(div);
      });

      details.querySelectorAll('[data-law-open]').forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const key = link.getAttribute('data-law-open');
          const data = window.LAW_DATA[key];
          const modal = document.getElementById('lawModal');
          const body = document.getElementById('modalBody');
          if (!modal || !body || !data) return;
          const evidenceHtml = (data.evidence || []).map((item) =>
            `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.label} ↗</a>`
          ).join('');
          body.innerHTML = `<h2 style="color:var(--color-navy); margin-bottom:10px;">${data.title}</h2>${data.body}${evidenceHtml ? `<div class="evidence-links">${evidenceHtml}</div>` : ''}`;
          modal.classList.add('is-open');
        });
      });

      this.renderChart(result.radar);
    },

    renderChart(radarData) {
      const ctx = document.getElementById('auditRadar');
      if (!ctx || !window.Chart) return;
      if (this.chart) this.chart.destroy();
      this.chart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: radarData.map((item) => item.label),
          datasets: [{
            label: '適正度',
            data: radarData.map((item) => Math.round(item.value)),
            fill: true,
            backgroundColor: 'rgba(26, 54, 93, 0.16)',
            borderColor: '#1A365D',
            pointBackgroundColor: '#D4AF37',
            pointBorderColor: '#1A365D',
            pointRadius: 4,
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: { backdropColor: 'transparent', stepSize: 20 },
              grid: { color: 'rgba(26,54,93,0.12)' },
              angleLines: { color: 'rgba(26,54,93,0.14)' },
              pointLabels: { color: '#1A365D', font: { size: 13, weight: '700' } }
            }
          },
          plugins: { legend: { display: false } }
        }
      });
    },

    share() {
      const score = document.getElementById('resultScore').textContent;
      const grade = document.getElementById('resultGrade').textContent;
      const text = `【PTAコンプライアンス監査】\n判定：${grade}\nスコア：${score}\nGitHub Pages公開用の監査システムで確認しました。`;
      const url = window.location.href;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener');
    }
  };

  window.addEventListener('DOMContentLoaded', () => App.init());
})();
