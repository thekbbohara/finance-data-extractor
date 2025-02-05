// Hydro balance sheet
const hydroBalanceSheetFixedAssets = {
  totalKey: "net_fixed_assets",
  valuesKeys: ["fixed_assets", "depreciation"],
};

const hydroBalanceSheetTotalFunds = {
  totalKey: "total_funds",
  valuesKeys: ["share_capital", "premium", "reserves", "long_term_liabilities"],
};

const hydroBalanceSheetApplicationOfFunds = {
  totalKey: "application_of_funds",
  valuesKeys: [
    "net_fixed_assets",
    "non_core_assets",
    "investments",
    "work_in_progress",
    "cash",
    "receivables",
    "advances_prepayments_loans_deposits_and_other_current_assets",
    "inventory",
    "total_current_assets",
    "total_short_term_liabilities",
  ],
};

const hydroBalanceSheetCurrentAssets = {
  totalKey: "total_current_assets",
  valuesKeys: [
    "cash",
    "receivables",
    "advances_prepayments_loans_deposits_and_other_current_assets",
    "inventory",
  ],
};

const hydroBalanceSheetShortTermLiabilities = {
  totalKey: "total_short_term_liabilities",
  valuesKeys: ["short_term_liabilities", "deferred_liabilities"],
};

export const hydroBalanceSheetChecks = [
  hydroBalanceSheetFixedAssets,
  hydroBalanceSheetTotalFunds,
  hydroBalanceSheetApplicationOfFunds,
  hydroBalanceSheetCurrentAssets,
  hydroBalanceSheetShortTermLiabilities,
];

// Hydro income statement
export const hydroIncomeStatementGrossProfit = {
  totalKey: "gross_profit",
  valuesKeys: ["energy_sales", "cost_of_production"],
};

export const hydroIncomeStatementTotalIncome = {
  totalKey: "operating_profit",
  valuesKeys: [
    "gross_profit",
    "dividend_income",
    "forex_gain_loss",
    "other_income",
    "admin_expenses",
  ],
};

export const hydroIncomeStatementEBITDA = {
  totalKey: "ebitda",
  valuesKeys: [
    "operating_profit",
    "interest_expense",
    "depreciation",
    "provisions",
  ],
};

export const hydroIncomeStatementProfitBeforeTax = {
  totalKey: "profit_before_tax",
  valuesKeys: ["ebitda"],
};

export const hydroIncomeStatementNetProfit = {
  totalKey: "net_profit",
  valuesKeys: ["profit_before_tax", "taxes", "bonus_and_csr"],
};

export const hydroIncomeStatementProfitabilityRatios = {
  totalKey: "profitability_ratios",
  valuesKeys: [
    "earnings_per_share",
    "book_value_per_share",
    "gross_profit_margin",
    "operating_profit_margin",
    "net_profit_margin",
  ],
};

export const hydroIncomeStatementEfficiencyRatios = {
  totalKey: "management_efficiency_ratios",
  valuesKeys: [
    "return_on_equity",
    "return_on_asset",
    "return_on_capital_employed",
  ],
};

export const hydroIncomeStatementValuationRatios = {
  totalKey: "valuation_ratios",
  valuesKeys: [
    "market_cap",
    "enterprise_value_ev",
    "price_earnings",
    "price_book",
    "price_revenue",
    "ev_ebitda",
  ],
};

export const hydroIncomeStatementChecks = [
  hydroIncomeStatementGrossProfit,
  hydroIncomeStatementTotalIncome,
  hydroIncomeStatementEBITDA,
  hydroIncomeStatementProfitBeforeTax,
  hydroIncomeStatementNetProfit,
  hydroIncomeStatementProfitabilityRatios,
  hydroIncomeStatementEfficiencyRatios,
  hydroIncomeStatementValuationRatios,
];
