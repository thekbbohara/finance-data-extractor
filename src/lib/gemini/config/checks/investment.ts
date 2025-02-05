// Investment balance sheet
const investmentBalanceSheetFixedAssets = {
  totalKey: "net_fixed_assets",
  valuesKeys: ["property_plant_and_equipment", "accumulated_depreciation"],
};

const investmentBalanceSheetUsesOfFunds = {
  totalKey: "total_uses_of_funds",
  valuesKeys: [
    "net_fixed_assets",
    "investments",
    "loans_extended",
    "cash_and_cash_equivalents",
    "term_deposits",
    "other_current_assets",
    "misc_assets",
  ],
};

const investmentBalanceSheetEquity = {
  totalKey: "total_equity",
  valuesKeys: [
    "paid_up_capital",
    "share_premium",
    "preference_shares",
    "reserves_and_surplus",
  ],
};

const investmentBalanceSheetLongTermLiabilities = {
  totalKey: "total_long_term_liabilities",
  valuesKeys: ["fund_deposits", "loans"],
};

const investmentBalanceSheetCurrentLiabilities = {
  totalKey: "current_liabilities_and_provisions",
  valuesKeys: [
    "current_liabilities_and_provision",
    "trade_and_other_payables",
    "dividend_payable",
    "other_liabilities_and_provisions",
    "corporate_income_tax_liabilities",
    "provisions_for_possible_losses",
  ],
};

const investmentBalanceSheetTotalSources = {
  totalKey: "total_sources_of_funds",
  valuesKeys: [
    "total_equity",
    "total_long_term_liabilities",
    "current_liabilities_and_provisions",
  ],
};

export const investmentBalanceSheetChecks = [
  investmentBalanceSheetFixedAssets,
  investmentBalanceSheetUsesOfFunds,
  investmentBalanceSheetEquity,
  investmentBalanceSheetLongTermLiabilities,
  investmentBalanceSheetCurrentLiabilities,
  investmentBalanceSheetTotalSources,
];

// Investment income statement
export const investmentIncomeStatementTotalIncome = {
  totalKey: "total_income",
  valuesKeys: [
    "interest_income",
    "dividend_income",
    "fees_and_commission_income",
    "other_income",
  ],
};

export const investmentIncomeStatementTotalExpenses = {
  totalKey: "total_operating_expenses",
  valuesKeys: [
    "operational_expenses",
    "provisions_for_investment_risks_and_other_losses",
    "misc_expenses",
  ],
};

export const investmentIncomeStatementEBITDA = {
  totalKey: "ebitda",
  valuesKeys: ["total_income", "total_operating_expenses"],
};

export const investmentIncomeStatementEBIT = {
  totalKey: "ebit",
  valuesKeys: ["ebitda", "depreciation_and_amortization"],
};

export const investmentIncomeStatementProfitBeforeTax = {
  totalKey: "profit_before_taxes",
  valuesKeys: [
    "ebit",
    "financial_expenses",
    "profit_before_bonus_and_taxes",
    "provision_for_bonus",
  ],
};

export const investmentIncomeStatementNetProfit = {
  totalKey: "net_profit",
  valuesKeys: ["profit_before_taxes", "provision_for_taxes"],
};

export const investmentIncomeStatementChecks = [
  investmentIncomeStatementTotalIncome,
  investmentIncomeStatementTotalExpenses,
  investmentIncomeStatementEBITDA,
  investmentIncomeStatementEBIT,
  investmentIncomeStatementProfitBeforeTax,
  investmentIncomeStatementNetProfit,
];
