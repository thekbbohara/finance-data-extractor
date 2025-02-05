// MP balance sheet
const mpBalanceSheetNonCurrentAssets = {
  totalKey: "total_non_current_assets",
  valuesKeys: [
    "property_plant_and_equipment",
    "intangible_assets",
    "investment_in_subsidiary",
    "investment_in_associates",
    "deferred_tax_assets",
    "other_non_current_assets",
  ],
};

const mpBalanceSheetCurrentAssets = {
  totalKey: "total_current_assets",
  valuesKeys: [
    "inventories",
    "trade_receivables",
    "cash_and_cash_equivalents",
    "others",
    "other_current_assets",
    "income_tax_assets_net",
  ],
};

const mpBalanceSheetAssets = {
  totalKey: "total_assets",
  valuesKeys: ["total_non_current_assets", "total_current_assets"],
};

const mpBalanceSheetEquity = {
  totalKey: "total_equity",
  valuesKeys: ["share_capital", "share_premium", "retained_earnings"],
};

const mpBalanceSheetNonCurrentLiabilities = {
  totalKey: "total_non_current_liabilities",
  valuesKeys: [
    "long_term_borrowings",
    "deferred_tax_liabilities",
    "other_non_current_liabilities",
  ],
};

const mpBalanceSheetCurrentLiabilities = {
  totalKey: "total_current_liabilities",
  valuesKeys: [
    "trade_payables",
    "short_term_borrowings",
    "other_financial_liabilities",
    "other_current_liabilities",
    "provisions",
    "income_tax_liabilities_net",
  ],
};

const mpBalanceSheetTotalLiabilities = {
  totalKey: "total_liabilities",
  valuesKeys: ["total_non_current_liabilities", "total_current_liabilities"],
};

const mpBalanceSheetTotalEQ = {
  totalKey: "total_liabilities_and_equity",
  valuesKeys: ["total_equity", "total_liabilities"],
};

export const mpBalanceSheetChecks = [
  mpBalanceSheetNonCurrentAssets,
  mpBalanceSheetCurrentAssets,
  mpBalanceSheetAssets,
  mpBalanceSheetEquity,
  mpBalanceSheetNonCurrentLiabilities,
  mpBalanceSheetCurrentLiabilities,
  mpBalanceSheetTotalLiabilities,
  mpBalanceSheetTotalEQ,
];

// MP income statement
export const mpIncomeStatementTotalIncome = {
  totalKey: "total_income",
  valuesKeys: ["revenue_from_operation", "other_income"],
};

export const mpIncomeStatementTotalExpenses = {
  totalKey: "operating_profit",
  valuesKeys: [
    "cost_of_materials",
    "manufacturing_expenses",
    "administrative_expenses",
    "selling_distribution_expenses",
    "depreciation",
    "financial_expenses",
    "other_expenses",
  ],
};

export const mpIncomeStatementProvisions = {
  totalKey: "profit_before_provision_bonus",
  valuesKeys: [
    "operating_profit",
    "provision_obsolescence",
    "provision_write_off",
    "housing_fund_allocation",
  ],
};

export const mpIncomeStatementProfitBeforeTax = {
  totalKey: "profit_before_tax",
  valuesKeys: ["profit_before_provision_bonus", "provision_for_bonus"],
};

export const mpIncomeStatementTaxExpenses = {
  totalKey: "net_profit",
  valuesKeys: [
    "profit_before_tax",
    "provision_taxation",
    "current_tax",
    "deferred_tax",
  ],
};

export const mpIncomeStatementChecks = [
  mpIncomeStatementTotalIncome,
  mpIncomeStatementTotalExpenses,
  mpIncomeStatementProvisions,
  mpIncomeStatementProfitBeforeTax,
  mpIncomeStatementTaxExpenses,
];
