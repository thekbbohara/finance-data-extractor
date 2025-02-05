// NRIC balance sheet
const nricBalanceSheetAssets = {
  totalKey: "total_assets",
  valuesKeys: [
    "goodwill_intangible_assets",
    "property_and_equipment",
    "investment_properties",
    "deferred_tax_assets",
    "investment_in_subsidiaries",
    "investment_in_associates",
    "investments",
    "loans",
    "reinsurance_assets",
    "current_tax_assets_net",
    "insurance_receivables",
    "other_assets",
    "other_financial_assets",
    "cash_and_cash_equivalent",
  ],
};

const nricBalanceSheetEquity = {
  totalKey: "total_equity",
  valuesKeys: [
    "share_capital",
    "share_application_money_pending_allotment",
    "share_premium",
    "special_reserve",
    "catastrophe_reserves",
    "retained_earnings",
    "other_equity",
  ],
};

const nricBalanceSheetLiabilities = {
  totalKey: "total_liabilities",
  valuesKeys: [
    "provisions",
    "gross_insurance_contract_liabilities",
    "deferred_tax_liabilities",
    "insurance_payable",
    "current_tax_liabilities_net",
    "borrowings",
    "other_liabilities",
    "other_financial_liabilities",
  ],
};

const nricTotalEquityAndLiabilities = {
  totalKey: "total_equity_and_liabilities",
  valuesKeys: ["total_equity", "total_liabilities"],
};

export const nricBalanceSheetChecks = [
  nricBalanceSheetAssets,
  nricBalanceSheetEquity,
  nricBalanceSheetLiabilities,
  nricTotalEquityAndLiabilities,
];

// NRIC income statement
export const nricIncomeStatementPremiums = {
  totalKey: "net_earned_premiums",
  valuesKeys: ["gross_earned_premiums", "premiums_ceded"],
};

export const nricIncomeStatementIncome = {
  totalKey: "total_income",
  valuesKeys: [
    "gross_earned_premiums",
    "premiums_ceded",
    "commission_income",
    "other_direct_income",
    "income_from_investments_and_loans",
    "net_gain_loss_on_fair_value_changes",
    "net_realised_gains_losses",
    "other_income",
  ],
};

export const nricIncomeStatementIncurred = {
  totalKey: "net_claims_incurred",
  valuesKeys: [
    "gross_claims_paid",
    "claims_ceded",
    "gross_change_in_contract_liabilities",
    "change_in_contract_liabilities_ceded_to_reinsurers",
  ],
};

export const nricIncomeStatementExpenses = {
  totalKey: "total_expenses",
  valuesKeys: [
    "commission_expenses",
    "service_fees",
    "other_direct_expenses",
    "employee_benefits_expenses",
    "depreciation_and_amortization_expenses",
    "impairment_losses",
    "other_operating_expenses",
    "finance_cost",
  ],
};

export const nricIncomeStatementProfitBeforeTax = {
  totalKey: "profit_before_tax",
  valuesKeys: [
    "net_profit_loss_before_associates_and_tax",
    "share_of_net_profit_of_associates",
  ],
};

export const nricIncomeStatementTaxExpenses = {
  totalKey: "net_profit_loss_for_the_year",
  valuesKeys: ["profit_before_tax", "income_tax_expenses"],
};

export const nricIncomeStatementEPS = {
  totalKey: "basic_eps",
  valuesKeys: ["diluted_eps"],
};

export const nricIncomeStatementChecks = [
  nricIncomeStatementPremiums,
  nricIncomeStatementIncome,
  nricIncomeStatementIncurred,
  nricIncomeStatementExpenses,
  nricIncomeStatementProfitBeforeTax,
  nricIncomeStatementTaxExpenses,
  nricIncomeStatementEPS,
];
