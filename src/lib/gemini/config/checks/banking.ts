// banking balance sheet
const bankingBalanceSheetAssets = {
  totalKey: "total_assets",
  valuesKeys: [
    "cash_and_cash_equivalents",
    "due_from_nepal_rastra_bank",
    "placement_with_bank_and_financial_institutions",
    "derivative_financial_instruments",
    "assets_derivative_financial_instruments",
    "other_trading_assets",
    "loan_and_advances_to_bfs",
    "loan_and_advances_to_customers",
    "investment_securities",
    "current_tax_asset",
    "investment_in_subsidiaries",
    "investment_in_associates",
    "investment_property",
    "property_and_equipment",
    "goodwill_and_intangible_assets",
    "deferred_tax_assets",
    "other_assets",
  ],
};

const bankingBalanceSheetLiabilities = {
  totalKey: "total_liabilities",
  valuesKeys: [
    "due_to_bank_and_financial_institutions",
    "due_to_nepal_rastra_bank",
    "liabilities_derivative_financial_instruments",
    "deposit_from_customers",
    "borrowings",
    "current_tax_liabilities",
    "provisions",
    "deferred_tax_liabilities",
    "other_liabilities",
    "debt_securities_issued",
    "subordinated_liabilities",
  ],
};

const bankingBalanceSheetEquity = {
  totalKey: "total_equity",
  valuesKeys: [
    "share_capital",
    "share_premium",
    "retained_earnings",
    "reserves",
  ],
};

const bankingTotalEQ = {
  totalKey: "total_liabilities_and_equity",
  valuesKeys: ["total_liabilities", "total_equity"],
};

export const bankingBalanceSheetChecks = [
  bankingBalanceSheetAssets,
  bankingBalanceSheetLiabilities,
  bankingBalanceSheetEquity,
  bankingTotalEQ,
];

// banking income statement
export const bankingIncomeStatementInterest = {
  totalKey: "net_interest_income",
  valuesKeys: ["interest_income", "interest_expense"],
};

export const bankingIncomeStatementFeeAndCommission = {
  totalKey: "net_fee_and_commission_income",
  valuesKeys: ["fee_and_commission_income", "fee_and_commission_expense"],
};

export const bankingIncomeStatementOperatingIncome = {
  totalKey: "total_operating_income",
  valuesKeys: [
    "net_interest_income",
    "net_fee_and_commission_income",
    "net_trading_income",
    "other_operating_income",
  ],
};

export const bankingIncomeStatementOperatingExpenses = {
  totalKey: "net_operating_income",
  valuesKeys: [
    "impairment_charge_reversal_for_loans_and_other_losses",
    "personnel_expense",
    "other_operating_expenses",
    "depreciation_amortization",
  ],
};

export const bankingIncomeStatementNonOperating = {
  totalKey: "profit_before_income_tax",
  valuesKeys: [
    "operating_profit",
    "non_operating_income",
    "non_operating_incomes",
    "non_operating_expense",
    "non_operating_expenses",
  ],
};

export const bankingIncomeStatementTax = {
  totalKey: "profit_loss_for_the_period",
  valuesKeys: ["profit_before_income_tax", "current_tax", "deferred_tax"],
};

export const bankingIncomeStatementChecks = [
  bankingIncomeStatementInterest,
  bankingIncomeStatementFeeAndCommission,
  bankingIncomeStatementOperatingIncome,
  bankingIncomeStatementOperatingExpenses,
  bankingIncomeStatementNonOperating,
  bankingIncomeStatementTax,
];
