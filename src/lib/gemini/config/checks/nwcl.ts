// NWCL balance sheet
const nwclBalanceSheetNonCurrentAssets = {
  totalKey: "total_non_current_assets",
  valuesKeys: [
    "property_plant_and_equipment",
    "capital_work_in_progress",
    "intangible_assets",
    "right_of_use_assets",
    "deferred_tax_asset",
  ],
};

const nwclBalanceSheetCurrentAssets = {
  totalKey: "total_current_assets",
  valuesKeys: [
    "trade_receivables",
    "cash_and_cash_equivalents",
    "bank_balances_other_than_ii_above",
    "current_tax_assets",
    "other_current_assets",
  ],
};

const nwclBalanceSheetAssets = {
  totalKey: "total_assets",
  valuesKeys: ["total_non_current_assets", "total_current_assets"],
};

const nwclBalanceSheetEquity = {
  totalKey: "total_equity",
  valuesKeys: ["equity_share_capital", "promoters_advance", "other_equity"],
};

const nwclBalanceSheetNonCurrentLiabilities = {
  totalKey: "total_non_current_liabilities",
  valuesKeys: ["financial_liabilities", "borrowings"],
};

const nwclBalanceSheetCurrentLiabilities = {
  totalKey: "total_current_liabilities",
  valuesKeys: ["trade_payables", "other_financial_liabilities", "provisions"],
};

const nwclBalanceSheetTotalLiabilities = {
  totalKey: "total_liabilities",
  valuesKeys: ["total_non_current_liabilities", "total_current_liabilities"],
};

const nwclTotalEquityAndLiabilities = {
  totalKey: "total_equity_and_liabilities",
  valuesKeys: ["total_equity", "total_liabilities"],
};

export const nwclBalanceSheetChecks = [
  nwclBalanceSheetNonCurrentAssets,
  nwclBalanceSheetCurrentAssets,
  nwclBalanceSheetAssets,
  nwclBalanceSheetEquity,
  nwclBalanceSheetNonCurrentLiabilities,
  nwclBalanceSheetCurrentLiabilities,
  nwclBalanceSheetTotalLiabilities,
  nwclTotalEquityAndLiabilities,
];

// NWCL income statement
export const nwclIncomeStatementTotalIncome = {
  totalKey: "total_income",
  valuesKeys: ["income", "revenue_from_operation", "other_income"],
};

export const nwclIncomeStatementGrossProfit = {
  totalKey: "gross_profit",
  valuesKeys: ["total_income", "direct_operating_expenses"],
};

export const nwclIncomeStatementEBITDA = {
  totalKey: "earnings_before_interest_depreciation_and_taxes",
  valuesKeys: ["gross_profit", "employee_benefits", "other_expenses"],
};

export const nwclIncomeStatementEarningsAfterInterest = {
  totalKey: "earnings_after_interest_before_depreciation_and_taxes",
  valuesKeys: [
    "earnings_before_interest_depreciation_and_taxes",
    "finance_costs",
  ],
};

export const nwclIncomeStatementProfitBeforeTax = {
  totalKey: "net_profit_loss_before_tax",
  valuesKeys: [
    "earnings_after_interest_before_depreciation_and_taxes",
    "depreciation_and_amortization_expense",
  ],
};

export const nwclIncomeStatementTaxExpenses = {
  totalKey: "net_profit_loss_after_tax",
  valuesKeys: [
    "net_profit_loss_before_tax",
    "current_tax",
    "deferred_tax_income_expense",
  ],
};

export const nwclIncomeStatementChecks = [
  nwclIncomeStatementTotalIncome,
  nwclIncomeStatementGrossProfit,
  nwclIncomeStatementEBITDA,
  nwclIncomeStatementEarningsAfterInterest,
  nwclIncomeStatementProfitBeforeTax,
  nwclIncomeStatementTaxExpenses,
];
