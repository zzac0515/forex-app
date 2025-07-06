import axios from "axios";
const currenciesURL = `${process.env.NEXT_PUBLIC_BASE_API_URL}/currencies`;

export const getCurrencies = async () => {
  try {
    const response = await axios.get(currenciesURL);
    return response.data;
  } catch (error) {
    console.error("Error fetching currencies:", error);
    throw error;
  }
};
