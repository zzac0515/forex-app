const rates = require("../models/ratesModels");

const ratesList = async (req, res) => {
  try {
    // Query Filters
    const { effective_date, base_currency_id, rows = 10, page = 1 } = req.query;

    const limit = parseInt(rows, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    const data = await rates.ratesList(
      effective_date,
      base_currency_id,
      limit,
      offset
    );
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ data: error });
  }
};

module.exports = { ratesList };
