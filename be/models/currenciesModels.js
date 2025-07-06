const db = require("../db_config");
const { getCurrenciesList } = require("../sql/currenciesSQL");

const currenciesList = async () => {
  try {
    const [results] = await db.query(getCurrenciesList);

    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = { currenciesList };
