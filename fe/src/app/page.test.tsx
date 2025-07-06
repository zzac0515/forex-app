import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";
import * as ratesService from "@/services/ratesService";

jest.mock("@/services/currencyService", () => ({
  getCurrencies: jest.fn(() =>
    Promise.resolve([
      { id: 1, name: "US Dollar", code: "USD" },
      { id: 2, name: "Euro", code: "EUR" },
    ])
  ),
}));

jest.mock("@/services/ratesService", () => ({
  getRatesList: jest.fn(() =>
    Promise.resolve({
      data: [
        { against_currency: "USD", rate: 1.0 },
        { against_currency: "EUR", rate: 0.91 },
      ],
      totalCount: 2,
    })
  ),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("Home Page", () => {
  // loading screen render
  it("renders loading state initially", async () => {
    render(<Home />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  // available search filters and clear UX
  it("renders search filters", async () => {
    render(<Home />);

    expect(
      await screen.findByText((content) => content.startsWith("Rates as of:"))
    ).toBeInTheDocument();
    expect(
      await screen.findByText((content) => content.startsWith("Base Currency:"))
    ).toBeInTheDocument();
  });

  //  if empty data, render message
  it("shows 'No Data' message if API returns empty", async () => {
    const mockedGetRatesList = ratesService.getRatesList as jest.MockedFunction<
      typeof ratesService.getRatesList
    >;
    mockedGetRatesList.mockResolvedValueOnce({ data: [], totalCount: 0 });

    render(<Home />);
    expect(await screen.findByText("No Data. 😢")).toBeInTheDocument();
  });

  //   filter selection
  it("changes base currency and updates UI", async () => {
    const user = userEvent.setup();
    render(<Home />);

    // Open the dropdown
    const select = await screen.findByLabelText(/base currency/i);
    await user.click(select);

    // Select Euro
    const eurOption = await screen.findByText("Euro (EUR)");
    await user.click(eurOption);

    // Confirm the selected base currency text updates
    expect(
      await screen.findByText(/Base Currency: Euro \(EUR\)/)
    ).toBeInTheDocument();
  });
});
