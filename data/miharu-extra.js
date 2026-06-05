window.PTA_BOARD_RESPONSE_INDEX = window.PTA_BOARD_RESPONSE_INDEX || {};
(function(DATA){
  DATA.municipalities = DATA.municipalities || [];
  DATA.details = DATA.details || [];
  if (DATA.municipalities.some(function(m){ return m.municipality === '三春町'; })) return;
  var no = 77;
  var body = '三春町教育委員会回答。回答日：2025年8月5日。PTA入会、会費徴収、名簿管理、施設使用、学校協力の見直しに関する回答。';
  DATA.municipalities.push({
    no: no,
    municipality: '三春町',
    types: ['A'],
    raw: { A: '○' },
    coordinates: [37.441, 140.492],
    detailCount: 1,
    firstBody: body,
    coordinateNote: '自治体所在地の概略座標',
    qualityFlags: [],
    usefulTags: []
  });
  DATA.details.push({
    municipality: '三春町',
    type: 'A',
    typeLabel: 'A:6項目',
    typeTitle: '6項目照会',
    date: '2025年8月5日',
    body: body
  });
})(window.PTA_BOARD_RESPONSE_INDEX);
