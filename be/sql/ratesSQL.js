const getRatesList = `
  SELECT 
  r.id,
  base.code AS base_currency,
  target.code AS against_currency,
  r.rate,
  r.effective_date 
  FROM rates r 
  JOIN currencies base ON r.base_currency_id = base.id
  JOIN currencies target ON r.target_currency_id = target.id
  WHERE r.effective_date = ?
`;

const getRatesListCount = `
  SELECT COUNT(*) AS total
  FROM rates r 
  JOIN currencies base ON r.base_currency_id = base.id
  JOIN currencies target ON r.target_currency_id = target.id
  WHERE r.effective_date = ?
`;

module.exports = { getRatesList, getRatesListCount };
