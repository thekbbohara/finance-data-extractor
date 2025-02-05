// MKCH balance sheet
const mkchBalanceSheetNonCurrentAssets = {
  totalKey: "total_non_current_assets",
  valuesKeys: [
    "property_plant_and_equipments",
    "intangible_assets",
    "trade_and_other_receivables",
    "investment",
  ],
};

const mkchBalanceSheetCurrentAssets = {
  totalKey: "total_current_assets",
  valuesKeys: [
    "inventories",
    "income_tax_assets",
    "prepayments_advances_and_deposits",
    "cash_and_cash_equivalents",
    "deferred_tax_assets",
  ],
};

const mkchBalanceSheetAssets = {
  totalKey: "total_assets",
  valuesKeys: ["total_non_current_assets", "total_current_assets"],
};

const mkchBalanceSheetEquity = {
  totalKey: "total_equity",
  valuesKeys: ["equity_share_capital", "other_equity"],
};

const mkchBalanceSheetNonCurrentLiabilities = {
  totalKey: "total_non_current_liabilities",
  valuesKeys: ["deferred_tax_liabilities"],
};

const mkchBalanceSheetCurrentLiabilities = {
  totalKey: "total_current_liabilities",
  valuesKeys: [
    "trade_and_other_financial_liabilities",
    "provisions",
    "short_term_loan",
  ],
};

const mkchBalanceSheetTotalLiabilities = {
  totalKey: "total_equity_and_liabilities",
  valuesKeys: [
    "total_equity",
    "total_non_current_liabilities",
    "total_current_liabilities",
  ],
};

export const mkchBalanceSheetChecks = [
  mkchBalanceSheetNonCurrentAssets,
  mkchBalanceSheetCurrentAssets,
  mkchBalanceSheetAssets,
  mkchBalanceSheetEquity,
  mkchBalanceSheetNonCurrentLiabilities,
  mkchBalanceSheetCurrentLiabilities,
  mkchBalanceSheetTotalLiabilities,
];

// MKCH income statement
export const mkchIncomeStatementGrossProfit = {
  totalKey: "gross_profit",
  valuesKeys: ["revenue_from_operations", "less_cost_of_goods_sold"],
};

export const mkchIncomeStatementTotalIncome = {
  totalKey: "total_income",
  valuesKeys: ["gross_profit", "other_income"],
};

export const mkchIncomeStatementTotalOperatingExpenses = {
  totalKey: "total_operating_expenses",
  valuesKeys: [
    "operating_expenses",
    "personnel_expenses",
    "other_operating_expenses",
    "financial_expenses",
    "depreciation_and_amortisation_expenses",
  ],
};

export const mkchIncomeStatementTotalExpenses = {
  totalKey: "total_expenses",
  valuesKeys: ["total_operating_expenses", "non_operating_income_expenses"],
};

export const mkchIncomeStatementProfitBeforeTax = {
  totalKey: "profit_before_income_tax",
  valuesKeys: ["total_income", "total_expenses"],
};

export const mkchIncomeStatementTaxExpenses = {
  totalKey: "total_tax_expenses",
  valuesKeys: ["tax_expenses", "current_tax", "deferred_tax"],
};

export const mkchIncomeStatementNetProfit = {
  totalKey: "profit_for_the_period",
  valuesKeys: ["profit_before_income_tax", "total_tax_expenses"],
};

export const mkchIncomeStatementEPS = {
  totalKey: "basic_earning_per_share_eps",
  valuesKeys: ["profit_for_the_period"],
};

export const mkchIncomeStatementChecks = [
  mkchIncomeStatementGrossProfit,
  mkchIncomeStatementTotalIncome,
  mkchIncomeStatementTotalOperatingExpenses,
  mkchIncomeStatementTotalExpenses,
  mkchIncomeStatementProfitBeforeTax,
  mkchIncomeStatementTaxExpenses,
  mkchIncomeStatementNetProfit,
  mkchIncomeStatementEPS,
];
