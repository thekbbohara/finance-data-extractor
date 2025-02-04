// insurance balance sheet
const insuranceBalanceSheetAssets = {
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
    "current_tax_assets",
    "insurance_receivables",
    "other_assets",
    "other_financial_assets",
    "cash_and_cash_equivalent",
  ],
};
const insuranceBalanceSheetEquity = {
  totalKey: "total_equity",
  valuesKeys: [
    "share_capital",
    "share_application_money_pending_allotment",
    "share_premium",
    "special_reserves",
    "catastrophe_reserves",
    "retained_earnings",
    "other_equity",
  ],
};

const insuranceBalanceSheetLiabilities = {
  totalKey: "total_liabilities",
  valuesKeys: [
    "provisions",
    "gross_insurance_contract_liabilities",
    "deferred_tax_liabilities",
    "insurance_payable",
    "current_tax_liabilities",
    "borrowings",
    "other_liabilities",
    "other_financial_liabilities",
  ],
};
const insuranceTotalEQ = {
  totalKey: "total_equity_and_liabilities",
  valuesKeys: ["total_equity", "total_liabilities"],
};

export const insuranceBalanceSheetChecks = [
  insuranceBalanceSheetAssets,
  insuranceBalanceSheetEquity,
  insuranceBalanceSheetLiabilities,
  insuranceTotalEQ,
];

// insurance income statement
export const insuranceIncomeStatementPremiums = {
  totalKey: "net_earned_premiums",
  valuesKeys: ["gross_earned_premiums", "premiums_ceded"],
};

export const insuranceIncomeStatementIncome = {
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

export const insuranceIncomeStatementIncurred = {
  totalKey: "net_claims_incurred",
  valuesKeys: [
    "gross_claims_paid",
    "claims_ceded",
    "gross_change_in_contract_liabilities",
    "change_in_contract_liabilities_ceded_to_reinsurers",
  ],
};

export const insuranceIncomeStatementExpenses = {
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

export const insuranceIncomeStatementChecks = [
  insuranceIncomeStatementPremiums,
  insuranceIncomeStatementIncome,
  insuranceIncomeStatementIncurred,
  insuranceIncomeStatementExpenses,
];
