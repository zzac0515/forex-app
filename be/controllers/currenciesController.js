const currencies = require("../models/currenciesModels");

const currenciesList = async (req, res) => {
  try {
    const data = await currencies.currenciesList();

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ data: error });
  }
};

module.exports = { currenciesList };
