// HT balance sheet
const htBalanceSheetNonCurrentAssets = {
  totalKey: "total_non_current_asset",
  valuesKeys: [
    "property_plant_and_equipment",
    "intangible_asset",
    "capital_work_in_progress",
    "right_of_use_of_asset",
    "long_term_investment",
    "deferred_tax_asset",
  ],
};

const htBalanceSheetCurrentAssets = {
  totalKey: "total_current_asset",
  valuesKeys: [
    "inventories",
    "account_receivables",
    "cash_and_cash_equivalent",
    "loans_and_advances",
    "other_current_assets",
  ],
};

const htBalanceSheetAssets = {
  totalKey: "total_asset",
  valuesKeys: ["total_non_current_asset", "total_current_asset"],
};

const htBalanceSheetEquity = {
  totalKey: "total_equity_reserve_and_surplus",
  valuesKeys: ["share_capital", "reserve_and_surplus"],
};

const htBalanceSheetNonCurrentLiabilities = {
  totalKey: "total_of_non_current_liabilities",
  valuesKeys: [
    "long_term_borrowings",
    "deferred_tax_liabilities",
    "lease_liability",
  ],
};

const htBalanceSheetCurrentLiabilities = {
  totalKey: "total_current_liabilities",
  valuesKeys: [
    "duties_and_taxes",
    "account_payable",
    "other_current_liabilities",
  ],
};

const htBalanceSheetTotalLiabilities = {
  totalKey: "total_equity_and_liabilities",
  valuesKeys: [
    "total_equity_reserve_and_surplus",
    "total_of_non_current_liabilities",
    "total_current_liabilities",
  ],
};

export const htBalanceSheetChecks = [
  htBalanceSheetNonCurrentAssets,
  htBalanceSheetCurrentAssets,
  htBalanceSheetAssets,
  htBalanceSheetEquity,
  htBalanceSheetNonCurrentLiabilities,
  htBalanceSheetCurrentLiabilities,
  htBalanceSheetTotalLiabilities,
];

// HT income statement
export const htIncomeStatementGrossIncome = {
  totalKey: "gross_income",
  valuesKeys: ["revenue_from_operation", "cost_of_sales"],
};

export const htIncomeStatementTotalExpenses = {
  totalKey: "total_expenses",
  valuesKeys: [
    "expenses",
    "employee_benefits_expenses",
    "administrative_and_other_expenses",
  ],
};

export const htIncomeStatementProfitBeforeTax = {
  totalKey: "profit_before_taxes",
  valuesKeys: [
    "profit_before_interest_depreciation_and_tax",
    "finance_costs",
    "profit_before_depreciation_and_tax",
    "depreciation_and_amortization_expenses",
    "profit_before_extra_ordinary_items_and_taxes",
    "extra_ordinary_item",
  ],
};

export const htIncomeStatementTaxExpenses = {
  totalKey: "profit_loss_for_the_period",
  valuesKeys: [
    "profit_before_taxes",
    "tax_expenses",
    "current_tax",
    "deferred_tax_income_expenses",
  ],
};

export const htIncomeStatementDiscontinuingOperations = {
  totalKey: "profit_loss_for_the_period_from_discontinuing_operations",
  valuesKeys: [
    "profit_loss_from_discontinuing_operations",
    "tax_expenses_of_discontinuing_operations",
  ],
};

export const htIncomeStatementEarnings = {
  totalKey: "earning_per_equity_share",
  valuesKeys: ["diluted_earning_per_share"],
};

export const htIncomeStatementChecks = [
  htIncomeStatementGrossIncome,
  htIncomeStatementTotalExpenses,
  htIncomeStatementProfitBeforeTax,
  htIncomeStatementTaxExpenses,
  htIncomeStatementDiscontinuingOperations,
  htIncomeStatementEarnings,
];
