import { parseFormattedNumber } from "@/utils/math";

// Define types for clarity and type safety (recommended)
export interface FinancialData {
  [key: string]: string;
}

export interface Formula {
  [key: string]: (data: FinancialData, quater: 1 | 2 | 3 | 4, company?: string) => string | null;
}

const toLocaleStr = (val: number) => val.toLocaleString("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const bankingRatiosFormulas: Formula[] = [
  {
    earning_per_share: (data, quarter, company) => {
      const net_profit = parseFormattedNumber(data["profit_loss_for_the_period"]);
      const share_capital = parseFormattedNumber(data["share_capital"]);
      const divisor = company === "SHL" ? 10 : company === "HATHY" ? 50 : 100;

      if (net_profit === 0 || share_capital === 0 || quarter === undefined) {
        console.error("Missing or invalid data for earning_per_share calculation.");
        return null;
      }
      const value = (net_profit / (share_capital / divisor) / quarter) * 4
      return toLocaleStr(value);
    },
  },
  {
    book_value_per_share: (data) => {
      const total_equity = parseFormattedNumber(data["total_equity"]);
      const share_capital = parseFormattedNumber(data["share_capital"]);
      const divisor = data["company"] === "SHL" ? 10 : data["company"] === "HATHY" ? 50 : 100;

      if (total_equity === 0 || share_capital === 0) {
        console.error("Missing or invalid data for book_value_per_share calculation.");
        return null;
      }
      const value = total_equity / (share_capital / divisor)
      return toLocaleStr(value);
    },
  },
  {
    net_interest_margin: (data, quarter) => {
      const net_interest_income = parseFormattedNumber(data["net_interest_income"]);
      const loans_and_advances_to_customers = parseFormattedNumber(data["loan_and_advances_to_customers"]);
      const loans_and_advances_to_bfs = parseFormattedNumber(data["loan_and_advances_to_bfs"]);

      if (net_interest_income === 0 || loans_and_advances_to_customers === 0 || loans_and_advances_to_bfs === 0 || quarter === undefined) {
        console.error("Missing or invalid data for net_interest_margin calculation.");
        return null;
      }
      const value = (net_interest_income / (loans_and_advances_to_customers + loans_and_advances_to_bfs)) * (4 / quarter);
      return toLocaleStr(value);
    },
  },
  {
    return_on_assets: (data, quarter) => {
      const net_profit = parseFormattedNumber(data["profit_loss_for_the_period"]);
      const total_assets = parseFormattedNumber(data["total_assets"]);

      if (net_profit === 0 || total_assets === 0 || quarter === undefined) {
        console.error("Missing or invalid data for return_on_assets calculation.");
        return null;
      }

      const value = (net_profit / total_assets) * (4 / quarter);
      return toLocaleStr(value);
    },
  },
  {
    return_on_equity: (data, quarter) => {
      const earnings_per_share = parseFormattedNumber(data["earning_per_share"]);
      const book_value_per_share = parseFormattedNumber(data["book_value_per_share"]);

      if (earnings_per_share === 0 || book_value_per_share === 0 || quarter === undefined) {
        console.error("Missing or invalid data for return_on_equity calculation.");
        return null;
      }

      const value = (earnings_per_share / book_value_per_share) * (4 / quarter);
      return toLocaleStr(value);
    },
  },
  {
    efficiency_ratio: (data) => {
      const impairment_charges = parseFormattedNumber(data["impairment_charge_reversal_for_loans_and_other_losses"]);
      const personnel_expenses = parseFormattedNumber(data["personnel_expense"]);
      const other_operating_expenses = parseFormattedNumber(data["other_operating_expenses"]);
      const depreciation_amortization = parseFormattedNumber(data["depreciation_amortization"]);
      const interest_income = parseFormattedNumber(data["interest_income"]);
      const fee_and_commission_income = parseFormattedNumber(data["fee_and_commission_income"]);

      if (impairment_charges === 0 || personnel_expenses === 0 || other_operating_expenses === 0 || depreciation_amortization === 0 || interest_income === 0 || fee_and_commission_income === 0) {
        console.error("Missing or invalid data for efficiency_ratio calculation.");
        return null;
      }

      const value = (impairment_charges + personnel_expenses + other_operating_expenses + depreciation_amortization) / (interest_income + fee_and_commission_income);
      return toLocaleStr(value);
    },
  },
  {
    market_cap: (data) => {
      const quarter_end_price = parseFormattedNumber(data["quarter_end_price"]);
      const share_capital = parseFormattedNumber(data["share_capital"]);
      const divisor = data["company"] === "SHL" ? 10 : data["company"] === "HATHY" ? 50 : 100;

      if (quarter_end_price === 0 || share_capital === 0) {
        console.error("Missing or invalid data for market_cap calculation.");
        return null;
      }

      const value = quarter_end_price * (share_capital / divisor);
      console.log({ quarter_end_price, share_capital, divisor })
      return toLocaleStr(value);
    },
  },
  {
    price_to_loans: (data) => {
      const quarter_end_price = parseFormattedNumber(data["quarter_end_price"]);
      const loans_and_advances_to_customers = parseFormattedNumber(data["loan_and_advances_to_customers"]);
      const loans_and_advances_to_bfs = parseFormattedNumber(data["loan_and_advances_to_bfs"]);

      if (quarter_end_price === 0 || loans_and_advances_to_customers === 0 || loans_and_advances_to_bfs === 0) {
        console.error("Missing or invalid data for price_to_loans calculation.");
        return null;
      }

      const value = quarter_end_price / (loans_and_advances_to_customers + loans_and_advances_to_bfs) / 100;
      return toLocaleStr(value);
    },
  },
  {
    price_to_earnings_ratio: (data) => {
      const quarter_end_price = parseFormattedNumber(data["quarter_end_price"]);
      const earnings_per_share = parseFormattedNumber(data["earning_per_share"]);

      if (quarter_end_price === 0 || earnings_per_share === 0) {
        console.error("Missing or invalid data for price_to_earnings_ratio calculation.");
        return null;
      }

      const value = quarter_end_price / earnings_per_share;
      return toLocaleStr(value);
    },
  },
  {
    price_to_book_value_ratio: (data) => {
      const quarter_end_price = parseFormattedNumber(data["quarter_end_price"]);
      const book_value_per_share = parseFormattedNumber(data["book_value_per_share"]);

      if (quarter_end_price === 0 || book_value_per_share === 0) {
        console.error("Missing or invalid data for price_to_book_value_ratio calculation.");
        return null;
      }
      const value = quarter_end_price / book_value_per_share;
      return toLocaleStr(value);
    },
  },
];

export const insuranceRatiosFormulas: Formula[] = [
  {
    earning_per_share: (data, quarter) => {
      const net_profit = parseFormattedNumber(data["net_profit_loss_for_the_year"]);
      const share_capital = parseFormattedNumber(data["share_capital"]);

      if (net_profit === 0 || share_capital === 0 || quarter === undefined) {
        console.error("Missing or invalid data for earning_per_share calculation.");
        return null;
      }

      const value = (net_profit / (share_capital / 100) / quarter) * 4;
      return toLocaleStr(value);
    },
  },
  {
    book_value_per_share: (data) => {
      const total_equity = parseFormattedNumber(data["total_equity"]);
      const share_capital = parseFormattedNumber(data["share_capital"]);

      if (total_equity === 0 || share_capital === 0) {
        console.error("Missing or invalid data for book_value_per_share calculation.");
        return null;
      }

      const value = total_equity / (share_capital / 100);
      return toLocaleStr(value);; // Return the raw numeric value
    },
  },
  {
    return_on_investment: (data, quarter) => {
      const income_from_investments_and_loans = parseFormattedNumber(data["income_from_investments_and_loans"]);
      const investments = parseFormattedNumber(data["investments"]);
      const loans = parseFormattedNumber(data["loans"]);

      if (income_from_investments_and_loans === 0 || investments === 0 || loans === 0 || quarter === undefined) {
        console.error("Missing or invalid data for return_on_investment calculation.");
        return null;
      }

      const value = (income_from_investments_and_loans / (investments + loans)) * (4 / quarter);
      return toLocaleStr(value);; // Return the raw numeric value
    },
  },
  {
    loss_ratio: (data) => {
      const gross_benefits_and_claims_paid = parseFormattedNumber(data["gross_claims_paid"]);
      const claims_ceded = parseFormattedNumber(data["claims_ceded"]);
      const net_earned_premiums = parseFormattedNumber(data["net_earned_premiums"]);

      if (gross_benefits_and_claims_paid === 0 || claims_ceded === 0 || net_earned_premiums === 0) {
        console.error("Missing or invalid data for loss_ratio calculation.");
        return null;
      }

      const value = (gross_benefits_and_claims_paid - claims_ceded) / net_earned_premiums;
      return toLocaleStr(value);; // Return the raw numeric value
    },
  },
  {
    management_ratio: (data) => {
      const employee_benefits_expenses = parseFormattedNumber(data["employee_benefits_expenses"]);
      const other_operating_expenses = parseFormattedNumber(data["other_operating_expenses"]);
      const net_earned_premiums = parseFormattedNumber(data["net_earned_premiums"]);

      if (employee_benefits_expenses === 0 || other_operating_expenses === 0 || net_earned_premiums === 0) {
        console.error("Missing or invalid data for management_ratio calculation.");
        return null;
      }

      const value = (employee_benefits_expenses + other_operating_expenses) / net_earned_premiums;
      return toLocaleStr(value);; // Return the raw numeric value
    },
  },
  {
    commission_ratio: (data) => {
      const commission_expenses = parseFormattedNumber(data["commission_expenses"]);
      const commission_income = parseFormattedNumber(data["commission_income"]);
      const net_earned_premiums = parseFormattedNumber(data["net_earned_premiums"]);

      if (commission_expenses === 0 || commission_income === 0 || net_earned_premiums === 0) {
        console.error("Missing or invalid data for commission_ratio calculation.");
        return null;
      }

      const value = (commission_expenses - commission_income) / net_earned_premiums;
      return toLocaleStr(value);; // Return the raw numeric value
    },
  },
  {
    combined_ratio: (data) => {
      const loss_ratio_value = parseFormattedNumber(data["loss_ratio"]);
      const management_ratio_value = parseFormattedNumber(data["management_ratio"]);
      const commission_ratio_value = parseFormattedNumber(data["commission_ratio"]);

      if (loss_ratio_value === 0 || management_ratio_value === 0 || commission_ratio_value === 0) {
        console.error("Missing or invalid data for combined_ratio calculation.");
        return null;
      }

      const value = loss_ratio_value + management_ratio_value + commission_ratio_value;
      return toLocaleStr(value);; // Return the raw numeric value
    },
  },
  {
    return_on_assets: (data, quarter) => {
      const net_profit = parseFormattedNumber(data["net_profit_loss_for_the_year"]);
      const total_assets = parseFormattedNumber(data["total_assets"]);

      if (net_profit === 0 || total_assets === 0 || quarter === undefined) {
        console.error("Missing or invalid data for return_on_assets calculation.");
        return null;
      }

      const value = (net_profit / total_assets) * (4 / quarter);
      return toLocaleStr(value);; // Return the raw numeric value
    },
  },
  {
    return_on_equity: (data, quarter) => {
      const earnings_per_share = parseFormattedNumber(data["earning_per_share"]);
      const book_value_per_share = parseFormattedNumber(data["book_value_per_share"]);

      if (earnings_per_share === 0 || book_value_per_share === 0 || quarter === undefined) {
        console.error("Missing or invalid data for return_on_equity calculation.");
        return null;
      }

      const value = (earnings_per_share / book_value_per_share) * (4 / quarter);
      return toLocaleStr(value);; // Return the raw numeric value
    },
  },
  {
    market_cap: (data) => {
      const quarter_end_price = parseFormattedNumber(data["quarter_end_price"]);
      const share_capital = parseFormattedNumber(data["share_capital"]);

      if (quarter_end_price === 0 || share_capital === 0) {
        console.error("Missing or invalid data for market_cap calculation.");
        return null;
      }

      const value = quarter_end_price * (share_capital / 100);
      return toLocaleStr(value)
    },
  },
  {
    price_to_earnings_ratio: (data) => {
      const quarter_end_price = parseFormattedNumber(data["quarter_end_price"]);
      const earnings_per_share = parseFormattedNumber(data["earning_per_share"]);

      if (quarter_end_price === 0 || earnings_per_share === 0) {
        console.error("Missing or invalid data for price_to_earnings_ratio calculation.");
        return null;
      }

      const value = quarter_end_price / earnings_per_share;
      return toLocaleStr(value)
    },
  },
  {
    price_to_book_value_ratio: (data) => {
      const quarter_end_price = parseFormattedNumber(data["quarter_end_price"]);
      const book_value_per_share = parseFormattedNumber(data["book_value_per_share"]);

      if (quarter_end_price === 0 || book_value_per_share === 0) {
        console.error("Missing or invalid data for price_to_book_value_ratio calculation.");
        return null;
      }

      const value = quarter_end_price / book_value_per_share;
      return toLocaleStr(value)
    },
  },
];
export const hydropowerRatiosFormulas: Formula[] = [
  {
    earning_per_share: (data: FinancialData, quarter?: number) => {
      const net_profit = parseFormattedNumber(data["net_profit"]);
      const share_capital = parseFormattedNumber(data["share_capital"]);

      if (net_profit === 0 || share_capital === 0 || quarter === undefined) {
        console.error("Missing or invalid data for earning_per_share calculation.");
        return null;
      }

      const value = (net_profit / (share_capital / 100) / quarter) * 4;
      return toLocaleStr(value)
    },
  },
  {
    book_value_per_share: (data: FinancialData) => {
      const total_equity = parseFormattedNumber(data["total_equity"]);
      const share_capital = parseFormattedNumber(data["share_capital"]);

      if (total_equity === 0 || share_capital === 0) {
        console.error("Missing or invalid data for book_value_per_share calculation.");
        return null;
      }

      const value = total_equity / (share_capital / 100);
      return toLocaleStr(value)
    },
  },
  {
    return_on_assets: (data: FinancialData, quarter?: number) => {
      const net_profit = parseFormattedNumber(data["net_profit"]);
      const total_assets = parseFormattedNumber(data["total_assets"]);

      if (net_profit === 0 || total_assets === 0 || quarter === undefined) {
        console.error("Missing or invalid data for return_on_assets calculation.");
        return null;
      }

      const value = (net_profit / total_assets) * (4 / quarter);
      return toLocaleStr(value)
    },
  },
  {
    return_on_equity: (data: FinancialData, quarter?: number) => {
      const earnings_per_share = parseFormattedNumber(data["earnings_per_share"]);
      const book_value_per_share = parseFormattedNumber(data["book_value_per_share"]);

      if (earnings_per_share === 0 || book_value_per_share === 0 || quarter === undefined) {
        console.error("Missing or invalid data for return_on_equity calculation.");
        return null;
      }

      const value = (earnings_per_share / book_value_per_share) * (4 / quarter);
      return toLocaleStr(value)
    },
  },
  {
    market_cap: (data: FinancialData) => {
      const quarter_end_price = parseFormattedNumber(data["quarter_end_price"]);
      const share_capital = parseFormattedNumber(data["share_capital"]);

      if (quarter_end_price === 0 || share_capital === 0) {
        console.error("Missing or invalid data for market_cap calculation.");
        return null;
      }

      const value = quarter_end_price * (share_capital / 100);
      return toLocaleStr(value)
    },
  },
  {
    price_to_earnings_ratio: (data: FinancialData) => {
      const quarter_end_price = parseFormattedNumber(data["quarter_end_price"]);
      const earnings_per_share = parseFormattedNumber(data["earnings_per_share"]);

      if (quarter_end_price === 0 || earnings_per_share === 0) {
        console.error("Missing or invalid data for price_to_earnings_ratio calculation.");
        return null;
      }

      const value = quarter_end_price / earnings_per_share;
      return toLocaleStr(value)
    },
  },
  {
    price_to_book_value_ratio: (data: FinancialData) => {
      const quarter_end_price = parseFormattedNumber(data["quarter_end_price"]);
      const book_value_per_share = parseFormattedNumber(data["book_value_per_share"]);

      if (quarter_end_price === 0 || book_value_per_share === 0) {
        console.error("Missing or invalid data for price_to_book_value_ratio calculation.");
        return null;
      }

      const value = quarter_end_price / book_value_per_share;
      return toLocaleStr(value)
    },
  },
];

// dicts

export const bankingformulaDict = {
  earning_per_share: "Earning per share",
  book_value_per_share: "Book value per share",
  net_interest_margin: "Net interest margin",
  return_on_assets: "Return on assets",
  return_on_equity: "Return on equity",
  efficiency_ratio: "Efficiency ratio",
  market_cap: "Market cap",
  price_to_loans: "Price to loans",
  price_to_earnings_ratio: "Price to earnings ratio",
  price_to_book_value_ratio: "Price to book value ratio"
}


export const formulaDict = (key: string) => {
  return { ...bankingformulaDict }[key] ?? key
}
