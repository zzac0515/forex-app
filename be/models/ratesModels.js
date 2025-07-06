const db = require("../db_config");
const { getRatesList, getRatesListCount } = require("../sql/ratesSQL");

const ratesList = async (effective_date, base_currency_id, limit, offset) => {
  try {
    let listSQL = getRatesList;
    let countSQL = getRatesListCount;
    const params = [effective_date];

    if (base_currency_id) {
      params.push(base_currency_id);
      listSQL += " AND r.base_currency_id = ? ";
      countSQL += " AND r.base_currency_id = ? ";
    }

    listSQL += " LIMIT ? OFFSET ? ";
    params.push(limit, offset);

    const [results] = await db.query(listSQL, params);

    const [countResult] = await db.query(countSQL, params);
    const totalCount = countResult[0]?.total || 0;

    return { data: results, totalCount };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  ratesList,
};
