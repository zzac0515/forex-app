import axios from "axios";

export interface RateItem {
  id: number;
  base_currency: string;
  against_currency: string;
  rate: number;
  effective_date: string;
}

export interface RatesListResponse {
  data: RateItem[];
  totalCount: number;
}

const ratesURL = `${process.env.NEXT_PUBLIC_BASE_API_URL}/rates`;

export const getRatesList = async (
  effective_date?: string,
  base_currency_id?: number,
  rows?: number,
  page?: number
): Promise<RatesListResponse> => {
  try {
    const response = await axios.get(ratesURL, {
      params: {
        effective_date,
        base_currency_id,
        rows,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching rates list:", error);
    throw error;
  }
};
