// NRM balance sheet
const nrmBalanceSheetNonCurrentAssets = {
  totalKey: "total_non_current_assets",
  valuesKeys: [
    "property_plant_and_equipment",
    "intangible_assets",
    "investment",
    "right_of_use_asset",
    "deferred_tax_asset",
    "other_non_current_asset",
  ],
};

const nrmBalanceSheetCurrentAssets = {
  totalKey: "total_current_assets",
  valuesKeys: [
    "inventory",
    "trade_and_other_receivables",
    "cash_and_cash_equivalents",
  ],
};

const nrmBalanceSheetAssets = {
  totalKey: "total_assets",
  valuesKeys: ["total_non_current_assets", "total_current_assets"],
};

const nrmBalanceSheetEquity = {
  totalKey: "total_equity",
  valuesKeys: [
    "share_capital",
    "retained_earnings",
    "other_component_of_equity",
  ],
};

const nrmBalanceSheetNonCurrentLiabilities = {
  totalKey: "total_non_current_liabilities",
  valuesKeys: [
    "long_term_borrowings",
    "lease_liability",
    "other_non_current_liabilities",
  ],
};

const nrmBalanceSheetCurrentLiabilities = {
  totalKey: "total_current_liabilities",
  valuesKeys: [
    "trade_and_other_payables",
    "employee_benefit_liability",
    "short_term_borrowings",
  ],
};

const nrmBalanceSheetTotalLiabilities = {
  totalKey: "total_liabilities",
  valuesKeys: ["total_non_current_liabilities", "total_current_liabilities"],
};

const nrmTotalEquityAndLiabilities = {
  totalKey: "total_equity_and_liabilities",
  valuesKeys: ["total_equity", "total_liabilities"],
};

export const nrmBalanceSheetChecks = [
  nrmBalanceSheetNonCurrentAssets,
  nrmBalanceSheetCurrentAssets,
  nrmBalanceSheetAssets,
  nrmBalanceSheetEquity,
  nrmBalanceSheetNonCurrentLiabilities,
  nrmBalanceSheetCurrentLiabilities,
  nrmBalanceSheetTotalLiabilities,
  nrmTotalEquityAndLiabilities,
];

// NRM income statement
export const nrmIncomeStatementGrossIncome = {
  totalKey: "gross_income",
  valuesKeys: ["revenue", "cost_of_sales"],
};

export const nrmIncomeStatementTotalIncome = {
  totalKey: "operating_profit_loss",
  valuesKeys: [
    "gross_income",
    "other_income",
    "administration_expenses",
    "selling_and_distribution_expenses",
    "ipo_expenses",
    "other_expenses",
  ],
};

export const nrmIncomeStatementFinanceDepreciation = {
  totalKey: "profit_loss_before_tax",
  valuesKeys: [
    "operating_profit_loss",
    "finance_charge",
    "depreciation",
    "amortization",
  ],
};

export const nrmIncomeStatementTaxExpenses = {
  totalKey: "net_profit_loss_for_year",
  valuesKeys: [
    "profit_loss_before_tax",
    "less_tax",
    "current_tax",
    "deferred_tax_income_expense",
  ],
};

export const nrmIncomeStatementChecks = [
  nrmIncomeStatementGrossIncome,
  nrmIncomeStatementTotalIncome,
  nrmIncomeStatementFinanceDepreciation,
  nrmIncomeStatementTaxExpenses,
];
