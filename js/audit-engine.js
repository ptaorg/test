
window.AuditEngine = {
  AXES: ['membership', 'privacy', 'finance', 'personnel', 'facilities'],
  AXIS_LABELS: {
    membership: '契約性',
    privacy: '情報管理',
    finance: '財務健全性',
    personnel: '服務規律',
    facilities: '公物管理'
  },
  getQuestions(role) {
    return (window.AUDIT_DB && window.AUDIT_DB[role]) ? window.AUDIT_DB[role] : [];
  },
  calculate(answers) {
    const counts = { safe: 0, risk: 0, illegal: 0, critical: 0 };
    const axisRisk = { membership: 0, privacy: 0, finance: 0, personnel: 0, facilities: 0 };
    const axisCount = { membership: 0, privacy: 0, finance: 0, personnel: 0, facilities: 0 };

    answers.forEach((item) => {
      counts[item.opt.level] = (counts[item.opt.level] || 0) + 1;
      axisRisk[item.q.axis] += item.opt.s;
      axisCount[item.q.axis] += 1;
    });

    let score = 100;
    if (counts.critical > 0 || counts.illegal > 0) {
      score = Math.max(0, 20 - counts.critical * 10 - counts.illegal * 5);
    } else if (counts.risk > 0) {
      score = Math.max(20, 70 - counts.risk * 10);
    }

    const grade = this.getGrade(score, counts);
    const radar = this.AXES.map((axis) => {
      const avgRisk = axisCount[axis] ? axisRisk[axis] / axisCount[axis] : 0;
      return {
        key: axis,
        label: this.AXIS_LABELS[axis],
        value: Math.max(0, 100 - avgRisk)
      };
    });

    return { score, counts, grade, radar };
  },
  getGrade(score, counts) {
    if (counts.critical > 0) {
      return {
        code: 'critical',
        title: '重大な是正優先状態',
        summary: '重大な法的問題が検出されました。学校とPTAの境界、入会意思、個人情報、教職員関与のいずれかに即時の見直しが必要です。'
      };
    }
    if (counts.illegal > 0) {
      return {
        code: 'illegal',
        title: '法的整合性に重大な課題',
        summary: '複数の運用に、法令との整合性を欠く可能性が高い箇所があります。慣例ではなく根拠文書に基づく再設計が必要です。'
      };
    }
    if (counts.risk > 0) {
      return {
        code: 'risk',
        title: '要改善・制度逸脱リスクあり',
        summary: '直ちに違法とまでは言い切れないものの、任意性・透明性・境界管理を弱める運用が含まれています。'
      };
    }
    return {
      code: 'safe',
      title: '適正運営に近い状態',
      summary: '主要論点において、契約性・自主性・公私分離が比較的明確に保たれています。'
    };
  },
  statusLabel(level) {
    return {
      safe: '適正',
      risk: '要改善',
      illegal: '違法性高',
      critical: '重大違法' 
    }[level] || '判定';
  },
  lawRefs(keys) {
    return (keys || []).map((key) => ({ key, ...(window.LAW_DATA[key] || { title: key }) }));
  }
};
