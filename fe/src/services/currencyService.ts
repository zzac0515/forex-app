import axios from "axios";

export const getCurrencies = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/currencies/currenciesList`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching currencies:", error);
    throw error;
  }
};
