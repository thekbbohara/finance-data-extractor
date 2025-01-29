import { ResponseSchema, SchemaType } from '@google/generative-ai';
export const profitLossSubCategories = [
  'interest_income',
  'interest_expenses',
  'net_interest_income',
  'fees_and_commission_income',
  'fees_and_commission_expenses',
  'net_fee_and_commission_income',
  'net_interest_fee_and_commission_income',
  'net_trading_income',
  'other_operating_income',
  'total_operating_income',
  'impairment_charge_or_reversal_for_loans_and_other_losses',
  'net_operating_income',
  'personnel_expenses',
  'other_operating_expenses',
  'depreciation_and_amortization',
  'operating_profit',
  'non_operating_income',
  'non_operating_expenses',
  'profit_before_income_tax',
  'current_tax',
  'deferred_tax',
  'profit_or_loss_for_the_period'
];
export const balanceStatementSubCategories = [
  'cash_and_cash_equivalents',
  'due_from_nepal_rastra_bank',
  'placement_with_bank_and_financial_institutions',
  'derivative_financial_instruments',
  'other_trading_assets',
  'loan_and_advances_to_bfs',
  'loan_and_advances_to_customers',
  'investment_securities',
  'current_tax_asset',
  'investment_in_subsidiaries',
  'investment_in_associates',
  'investment_property',
  'property_and_equipment',
  'goodwill_and_intangible_assets',
  'deferred_tax_assets',
  'other_assets',
  'total_assets',
  'due_to_bank_and_financial_institutions',
  'due_to_nepal_rastra_bank',
  'derivative_financial_instruments',
  'deposit_from_customers',
  'borrowings',
  'current_tax_liabilities',
  'provisions',
  'deferred_tax_liabilities',
  'other_liabilities',
  'debt_securities_issued',
  'subordinated_liabilities',
  'total_liabilities',
  'share_capital',
  'share_premium',
  'retained_earnings',
  'reserves',
  'total_equity',
  'total_liabilities_and_equity'
];
export const operatingCashFlowSubCategories = [
  // operating activities
  'interest_received',
  'fees_and_other_income_received',
  'dividend_received',
  'receipts_from_other_operating_activities',
  'interest_paid',
  'commission_and_fees_paid',
  'cash_payment_to_employees',
  'other_expense_paid',
  'operating_cash_flows_before_changes',
  'increase_in_operating_assets_due_from_nepal_rastra_bank',
  'increase_in_operating_assets_placement_with_banks',
  'increase_in_operating_assets_other_trading_assets',
  'increase_in_operating_assets_loans_to_banks',
  'increase_in_operating_assets_loans_to_customers',
  'increase_in_operating_assets_other_assets',
  'increase_in_operating_liabilities_due_to_banks',
  'increase_in_operating_liabilities_due_to_nepal_rastra_bank',
  'increase_in_operating_liabilities_deposits_from_customers',
  'increase_in_operating_liabilities_borrowings',
  'increase_in_operating_liabilities_other_liabilities',
  'net_cash_flow_from_operating_activities_before_tax',
  'income_taxes_paid',
  'net_cash_flow_from_operating_activities'
];
export const investingCashFlowSubCategories = [
  // investing activities
  'purchase_of_investment_securities',
  'receipts_from_sale_of_investment_securities',
  'purchase_of_property_and_equipment',
  'receipt_from_sale_of_property_and_equipment',
  'purchase_of_intangible_assets',
  'receipt_from_sale_of_intangible_assets',
  'purchase_of_investment_properties',
  'receipt_from_sale_of_investment_properties',
  'interest_received_investing',
  'dividend_received_investing',
  'net_cash_used_in_investing_activities'
];

export const financingCashFlowSubCategories = [
  // financing activities
  'receipt_from_issue_of_debt_securities',
  'repayment_of_debt_securities',
  'receipt_from_issue_of_subordinated_liabilities',
  'repayment_of_subordinated_liabilities',
  'receipt_from_issue_of_shares',
  'dividends_paid',
  'interest_paid_financing',
  'other_receipt_payment_financing',
  'net_cash_from_financing_activities',
  'net_increase_in_cash_and_cash_equivalents',
  'cash_and_cash_equivalents_at_beginning',
  'effect_of_exchange_rate_fluctuations',
  'cash_and_cash_equivalents_at_end'
];

// Helper function to create the desired schema format

function createSchema(subCategories: string[]): ResponseSchema {
  const properties: { [key: string]: { type: SchemaType } } = {};

  subCategories.forEach((subCategory) => {
    properties[subCategory.toLowerCase()] = { type: SchemaType.STRING };
  });

  return {
    type: SchemaType.ARRAY,
    items: {
      // items should be a Schema object
      type: SchemaType.OBJECT,
      properties: properties
    }
  };
}

export const profitLossSchema: ResponseSchema = createSchema(
  profitLossSubCategories
);
export const balanceStatementSchema: ResponseSchema = createSchema(
  balanceStatementSubCategories
);
export const investingCashFlowSchema: ResponseSchema = createSchema(
  investingCashFlowSubCategories
);

export const operatingCashFlowSchema: ResponseSchema = createSchema(
  operatingCashFlowSubCategories
);

export const financingCashFlowSchema: ResponseSchema = createSchema(
  financingCashFlowSubCategories
);
