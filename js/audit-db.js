
window.AUDIT_DB = {
  parent: [
    {
      cat: '入会契約', axis: 'membership',
      q: '入会の意思確認は、どのような形で行われていますか。',
      opts: [
        { t: '入会届を提出した人のみ会員となる。', s: 0, level: 'safe', laws: ['civil-law'], evidence: ['../membership.html'], adv: '入会意思を明示する運用であり、契約関係が比較的明確です。' },
        { t: '加入しない人だけが非加入届を出す。', s: 85, level: 'illegal', laws: ['civil-law', 'constitution'], evidence: ['../membership.html'], adv: '不加入者だけに手続きを負わせる方式は、任意加入の原則を弱める運用です。' },
        { t: '意思確認がなく、入学時に当然加入として扱われる。', s: 100, level: 'critical', laws: ['civil-law', 'constitution'], evidence: ['../membership.html'], adv: '加入意思の確認が欠けており、法的正当性を欠く可能性が極めて高い状態です。' },
        { t: '任意だが、実質的に断りづらい説明がある。', s: 55, level: 'risk', laws: ['constitution'], evidence: ['../membership.html'], adv: '説明方法に心理的圧力が含まれると、任意性が形骸化します。' }
      ]
    },
    {
      cat: '個人情報', axis: 'privacy',
      q: 'PTA名簿や連絡先は、どのように準備されていますか。',
      opts: [
        { t: 'PTAが本人から直接収集している。', s: 0, level: 'safe', laws: ['personal-info'], evidence: ['../national-archive.html'], adv: '本人から直接取得する方式であり、第三者提供の問題を避けやすいです。' },
        { t: '学校から、同意取得を前提に情報提供を受けている。', s: 50, level: 'risk', laws: ['personal-info'], evidence: ['../national-archive.html'], adv: '学校が取りまとめに関与する時点で、運用の適法性と必要性を丁寧に検証する必要があります。' },
        { t: '学校名簿が当然のように渡されている。', s: 100, level: 'critical', laws: ['personal-info'], evidence: ['../national-archive.html'], adv: '本人同意のない提供であれば、法令違反の蓋然性が極めて高い状態です。' },
        { t: '誰がどの情報を持っているか分からない。', s: 65, level: 'risk', laws: ['personal-info'], evidence: ['../national-archive.html'], adv: '情報の保有主体・利用目的・管理責任が曖昧な状態です。' }
      ]
    },
    {
      cat: '会費徴収', axis: 'finance',
      q: 'PTA会費は、どのように徴収されていますか。',
      opts: [
        { t: 'PTA独自口座に、会員が直接納付している。', s: 0, level: 'safe', laws: ['civil-law'], evidence: ['../national-archive.html'], adv: '学校会計と分離されており、公私の区別が明確です。' },
        { t: '学校徴収金と一体で引き落とされるが、明確な同意書がある。', s: 45, level: 'risk', laws: ['civil-law'], evidence: ['../national-archive.html'], adv: '同意の有無に加え、義務的費用と私的会費の混同による誤認を防ぐ必要があります。' },
        { t: '学校徴収金と一体で当然に徴収されている。', s: 90, level: 'illegal', laws: ['civil-law'], evidence: ['../national-archive.html'], adv: '会費の任意性や支払根拠が不明確になりやすい運用です。' },
        { t: '現金を児童経由で担任が回収している。', s: 100, level: 'critical', laws: ['local-public-service'], evidence: ['../national-archive.html'], adv: '金銭管理・教職員関与・事故責任の面で重大なリスクがあります。' }
      ]
    },
    {
      cat: '学校関与', axis: 'personnel',
      q: 'PTA配布物や連絡は誰が担っていますか。',
      opts: [
        { t: 'PTA役員が配布・送信している。', s: 0, level: 'safe', laws: ['social-education'], evidence: ['../national-archive.html'], adv: '独立団体として自律的に事務を担っている状態です。' },
        { t: '学校配布物にPTA文書が同封されることがある。', s: 40, level: 'risk', laws: ['social-education'], evidence: ['../national-archive.html'], adv: '学校文書と私的団体文書の境界が見えにくくなるため、慎重な区分が必要です。' },
        { t: '担任が日常的に配布・回収している。', s: 90, level: 'illegal', laws: ['local-public-service'], evidence: ['../national-archive.html'], adv: '教職員が私的団体の実務を恒常的に担う構造は、服務規律上の問題を生じやすいです。' },
        { t: '授業時間や学校行事の枠でPTA加入案内が行われる。', s: 100, level: 'critical', laws: ['constitution', 'social-education'], evidence: ['../membership.html'], adv: '学校の権威や公的場面を利用した勧誘となり、任意性を損なう可能性が高いです。' }
      ]
    }
  ],
  officer: [
    {
      cat: '入会手続', axis: 'membership',
      q: '新入生への加入案内は、どの方式で行っていますか。',
      opts: [
        { t: '入会届提出者のみ登録するオプトイン方式。', s: 0, level: 'safe', laws: ['civil-law'], evidence: ['../membership.html'], adv: '加入意思の明示を前提とする運用です。' },
        { t: '非加入届が出ない限り加入扱いにする。', s: 85, level: 'illegal', laws: ['civil-law', 'constitution'], evidence: ['../membership.html'], adv: '任意団体における加入意思確認としては不十分です。' },
        { t: '学校名簿を基に当然に全員登録している。', s: 100, level: 'critical', laws: ['civil-law', 'personal-info'], evidence: ['../membership.html', '../national-archive.html'], adv: '加入意思確認の欠如と個人情報流用が同時に問題化しやすい構造です。' },
        { t: '実務担当者によって学校ごとに運用が違う。', s: 55, level: 'risk', laws: ['civil-law'], evidence: ['../membership.html'], adv: '統一ルールがない場合、年ごとの運用差で法的安定性を欠きます。' }
      ]
    },
    {
      cat: '会計管理', axis: 'finance',
      q: '会費や資金は、どのように管理していますか。',
      opts: [
        { t: 'PTA名義口座と会計担当で管理している。', s: 0, level: 'safe', laws: ['civil-law'], evidence: ['../national-archive.html'], adv: '団体会計としての独立性が確保されています。' },
        { t: '学校事務室が実質的に管理している。', s: 95, level: 'illegal', laws: ['local-public-service'], evidence: ['../national-archive.html'], adv: '学校が私的団体会計を担う構造は、境界の混同を生みます。' },
        { t: '会長個人の口座や通帳で管理している。', s: 100, level: 'critical', laws: ['civil-law'], evidence: ['../national-archive.html'], adv: '会計責任の所在が著しく不明確で、事故時の説明が困難です。' },
        { t: '現金保管が多く、監査は形式的である。', s: 65, level: 'risk', laws: ['civil-law'], evidence: ['../national-archive.html'], adv: '内部統制が弱く、会計の透明性を欠きます。' }
      ]
    },
    {
      cat: '学校依存', axis: 'personnel',
      q: '印刷・仕分け・配布・会計補助などの事務は誰が担っていますか。',
      opts: [
        { t: '役員や有償外注で処理している。', s: 0, level: 'safe', laws: ['social-education'], evidence: ['../national-archive.html'], adv: '団体として自主的に事務処理を担う形です。' },
        { t: '教頭・事務職員に相当程度依存している。', s: 90, level: 'illegal', laws: ['local-public-service'], evidence: ['../national-archive.html'], adv: '教職員の公務と団体事務が混在しやすい運用です。' },
        { t: '担任にクラス数分の配布物処理を依頼している。', s: 100, level: 'critical', laws: ['local-public-service'], evidence: ['../national-archive.html'], adv: '継続的な事務代行であり、学校依存構造が顕著です。' },
        { t: '繁忙期のみ学校の善意で支援を受ける。', s: 45, level: 'risk', laws: ['social-education'], evidence: ['../national-archive.html'], adv: '便宜供与の範囲と継続性を切り分ける必要があります。' }
      ]
    },
    {
      cat: '利益相反', axis: 'facilities',
      q: '校長・教頭などの学校管理職は、PTAの意思決定にどの程度関与していますか。',
      opts: [
        { t: '顧問的立場にとどまり、議決権は持たない。', s: 0, level: 'safe', laws: ['social-education'], evidence: ['../national-archive.html'], adv: '団体の自律性と学校との協議機能が切り分けられています。' },
        { t: '会議で意見を強く述べるが、形式上は役員ではない。', s: 45, level: 'risk', laws: ['social-education'], evidence: ['../national-archive.html'], adv: '実質的な影響力が強すぎる場合、自律性の観点から再検討が必要です。' },
        { t: '副会長や監査として議決権を持つ。', s: 90, level: 'illegal', laws: ['social-education'], evidence: ['../national-archive.html'], adv: '学校側とPTA側の利害が交差し、利益相反構造を生みやすいです。' },
        { t: 'PTA予算や寄付の使途を実質的に学校管理職が決めている。', s: 100, level: 'critical', laws: ['social-education', 'school-edu'], evidence: ['../national-archive.html'], adv: '団体財産と学校利益の境界が崩れている可能性が高い状態です。' }
      ]
    }
  ],
  school: [
    {
      cat: '服務規律', axis: 'personnel',
      q: '教職員にPTA事務をどの程度担わせていますか。',
      opts: [
        { t: '担わせていない。PTAが自主的に行う。', s: 0, level: 'safe', laws: ['local-public-service'], evidence: ['../national-archive.html'], adv: '学校とPTAの役割分担が明確です。' },
        { t: '繁忙期のみ限定的な補助がある。', s: 45, level: 'risk', laws: ['local-public-service'], evidence: ['../national-archive.html'], adv: '補助の範囲・時間・命令系統を明確にする必要があります。' },
        { t: '慣例として勤務時間中に当然行っている。', s: 95, level: 'illegal', laws: ['local-public-service'], evidence: ['../national-archive.html'], adv: '服務上の適法性が強く問われる運用です。' },
        { t: '時間外にも無償でPTA事務を行わせている。', s: 100, level: 'critical', laws: ['local-public-service'], evidence: ['../national-archive.html'], adv: '公務外の私的団体事務を恒常的に負担させる構造であり、是正優先度が極めて高いです。' }
      ]
    },
    {
      cat: '個人情報', axis: 'privacy',
      q: '児童・保護者の情報をPTAにどう提供していますか。',
      opts: [
        { t: '提供していない。PTAが独自に取得する。', s: 0, level: 'safe', laws: ['personal-info'], evidence: ['../national-archive.html'], adv: '学校保有情報とPTA名簿が分離されています。' },
        { t: '本人同意を前提に限定提供している。', s: 45, level: 'risk', laws: ['personal-info'], evidence: ['../national-archive.html'], adv: '同意取得の主体・範囲・記録方法まで確認が必要です。' },
        { t: '名簿を慣例で渡している。', s: 100, level: 'critical', laws: ['personal-info'], evidence: ['../national-archive.html'], adv: '法令違反の蓋然性が極めて高い状態です。' },
        { t: '緊急連絡の名目で包括的に共有している。', s: 90, level: 'illegal', laws: ['personal-info'], evidence: ['../national-archive.html'], adv: '目的外利用・提供の問題が生じやすい運用です。' }
      ]
    },
    {
      cat: '施設利用', axis: 'facilities',
      q: 'PTA室や学校設備の利用はどのように整理されていますか。',
      opts: [
        { t: '使用許可や管理条件を明確化している。', s: 0, level: 'safe', laws: ['school-edu'], evidence: ['../national-archive.html'], adv: '施設利用の条件が明文化されている状態です。' },
        { t: '便宜上使わせているが、範囲は限定している。', s: 45, level: 'risk', laws: ['school-edu'], evidence: ['../national-archive.html'], adv: '使用根拠と費用負担が曖昧になりやすいため、文書化が必要です。' },
        { t: '許可や契約なく恒常的に専用利用している。', s: 90, level: 'illegal', laws: ['school-edu'], evidence: ['../national-archive.html'], adv: '公物管理の観点から再整理が必要です。' },
        { t: '鍵や備品管理をPTAに丸ごと委ねている。', s: 100, level: 'critical', laws: ['school-edu'], evidence: ['../national-archive.html'], adv: '施設管理責任が曖昧化し、事故時対応にも問題を生じます。' }
      ]
    },
    {
      cat: '統制・介入', axis: 'membership',
      q: 'PTA運営に対する学校の関与はどの程度ですか。',
      opts: [
        { t: '独立団体として扱い、学校は介入しない。', s: 0, level: 'safe', laws: ['social-education'], evidence: ['../national-archive.html'], adv: '独立性を尊重する運用です。' },
        { t: '加入説明や行事協力の要請に学校名を使うことがある。', s: 55, level: 'risk', laws: ['social-education', 'constitution'], evidence: ['../membership.html'], adv: '学校権威を背景にした関与は、任意性を弱めます。' },
        { t: '学校が加入を前提として保護者に説明している。', s: 95, level: 'illegal', laws: ['constitution', 'social-education'], evidence: ['../membership.html'], adv: '公的立場を利用して私的団体加入を促す構造であり、慎重な是正が必要です。' },
        { t: '学校側が役員人事や予算使途を実質的に決めている。', s: 100, level: 'critical', laws: ['social-education'], evidence: ['../national-archive.html'], adv: '社会教育関係団体の自律性を損なう統制的関与です。' }
      ]
    }
  ]
};
