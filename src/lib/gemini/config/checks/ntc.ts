// NTC balance sheet
const ntcBalanceSheetNonCurrentAssets = {
  totalKey: "total_non_current_assets",
  valuesKeys: [
    "intangible_assets",
    "property_plant_and_equipment",
    "right_of_use_rou_assets",
    "capital_work_in_progress",
    "long_term_loan_and_advances",
    "investment",
    "deferred_tax_asset",
    "employee_loan",
    "contract_cost_assets",
  ],
};

const ntcBalanceSheetCurrentAssets = {
  totalKey: "total_current_assets",
  valuesKeys: [
    "inventory",
    "prepayments_and_non_financial_assets",
    "current_tax_assets",
    "accruals_advance_others_receivables",
    "trade_receivable",
    "current_investment",
    "cash_and_cash_equivalents",
  ],
};

const ntcBalanceSheetAssets = {
  totalKey: "total_assets",
  valuesKeys: ["total_non_current_assets", "total_current_assets"],
};

const ntcBalanceSheetEquity = {
  totalKey: "total_equity",
  valuesKeys: [
    "share_capital",
    "reserve_and_surplus",
    "total_equity_attributable_to_equityholders",
    "non_controlling_interest",
  ],
};

const ntcBalanceSheetNonCurrentLiabilities = {
  totalKey: "total_non_current_liabilities",
  valuesKeys: [
    "net_employment_benefits",
    "deferred_government_grant",
    "subscriber_deposits",
    "gsm_license_renewal_fee_liability",
    "lease_liability",
  ],
};

const ntcBalanceSheetCurrentLiabilities = {
  totalKey: "total_current_liabilities_and_provisions",
  valuesKeys: [
    "current_tax_liabilities",
    "provisions",
    "current_liabilities",
    "other_non_financial_liabilities",
  ],
};

const ntcBalanceSheetTotalLiabilities = {
  totalKey: "total_equity_and_liabilities",
  valuesKeys: [
    "total_equity",
    "total_non_current_liabilities",
    "total_current_liabilities_and_provisions",
  ],
};

export const ntcBalanceSheetChecks = [
  ntcBalanceSheetNonCurrentAssets,
  ntcBalanceSheetCurrentAssets,
  ntcBalanceSheetAssets,
  ntcBalanceSheetEquity,
  ntcBalanceSheetNonCurrentLiabilities,
  ntcBalanceSheetCurrentLiabilities,
  ntcBalanceSheetTotalLiabilities,
];

// NTC income statement
export const ntcIncomeStatementTotalIncome = {
  totalKey: "total_income",
  valuesKeys: [
    "revenue_from_contract_with_customers",
    "finance_income",
    "other_income",
  ],
};

export const ntcIncomeStatementExpenses = {
  totalKey: "earning_before_interest_tax_depreciation_and_amortisation_ebitda",
  valuesKeys: [
    "employee_benefit_expenses",
    "operation_and_maintenance_costs",
    "sales_channel_marketing_and_promotion_costs",
    "office_operation_expenses",
    "regulatory_fees_charges_and_renewals",
    "foreign_exchange_loss_gain",
    "shares_of_results_of_associates",
  ],
};

export const ntcIncomeStatementDepreciation = {
  totalKey: "profit_before_tax",
  valuesKeys: [
    "earning_before_interest_tax_depreciation_and_amortisation_ebitda",
    "finance_cost",
    "depreciation",
    "amortisation",
    "impairments_net_of_reversals",
  ],
};

export const ntcIncomeStatementTaxExpenses = {
  totalKey: "profit_for_the_period",
  valuesKeys: [
    "profit_before_tax",
    "income_tax_expenses",
    "current_income_tax",
    "deferred_taxes",
    "deferred_taxes_due_to_change_in_corporate_tax_rate",
  ],
};

export const ntcIncomeStatementChecks = [
  ntcIncomeStatementTotalIncome,
  ntcIncomeStatementExpenses,
  ntcIncomeStatementDepreciation,
  ntcIncomeStatementTaxExpenses,
];
