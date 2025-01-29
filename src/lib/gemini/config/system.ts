import {
  balanceStatementSubCategories,
  financingCashFlowSubCategories,
  investingCashFlowSubCategories,
  operatingCashFlowSubCategories,
  profitLossSubCategories
} from './response';

// current year upto this year bank ->
const identification: string =
  'You are an expert AI and exceptional data analyst designed to process unstructured text, understand pattern and convert it into organized data format JSON.';

const quarterly_report_data_format: string = `
NOTE: Ignore all the grop data and focus on bank current year data
If group data and bank data are given, then only extract bank data.
If group data and bank data are not specified but you see 4 columns, then it's bank data respectively.
If group data and bank data are not specified but you see 8 columns, last 4 columns are bank data respectively.
IMPORTANT: Look for data mentiond below <category>,<sub_category>,<bank_current_year_quater>,<bank_current_year_ytd>,<bank_previous_year_quater>,<bank_previous_year_ytd>
NOTE: None of the value is in negative so if you see '-' in the value, it's hyphen not negative value and there is nothing in that cell.
REMEMBER: Each <sub_category> have their own <bank_current_year_quater>
REMEMBER: bank_current_year_quater can also have other name like 'First Quarter Ending *','Second Quarter Ending *','Third Quarter Ending *','Fourth Quarter Ending *','Final Quarter Ending *','This Quarter Ending *','Upto This Quarter YTD *',
`;
const quarterly_output_format: string = `
FINALLY: Return data in JSON format as an array of JSON objects. Each individual data point (sub-category and its value) MUST be its own separate object within the array. The key of the object should be the sub-category name, and the value should be the corresponding data (as a string). Do NOT group related data points into the same object.

Examples:

Input:
Interest Income: 210,731,102
Net Interest Income: 73,635,440

Output:
\`\`\`json
[
  {"interest_income": "210,731,102"},
  {"net_interest_income": "73,635,440"}
]
\`\`\`

Input:
Fee and Commission Income: 3,178,014
Other Operating Expenses: (3,111,837)

Output:
\`\`\`json
[
  {"fee_and_commission_income": "3,178,014"},
  {"other_operating_expenses": "(3,111,837)"}
]
\`\`\`

Now, apply this same pattern to the *entire* input data you are given.  Each key-value pair must be a separate object in the array.
Remember, You must return all sub_category, if you don't find value for that sub_category you can assign a hyphen '-' to it.
`;

const profit_loss_labels: string = `
NOTE: If 'This Quarter Ending' and 'Upto This Quarter (YTD)' is given prioritize Upto This Quarter (YTD) and return 'Upto This Quarter (YTD)' no need to return This Quarter Ending.
<category>
  profit_or_Loss
  <sub_category>
  ${profitLossSubCategories.join('\n')}
  </sub_category>
</category>

`;

const cash_flows_from_operating_activities_labels: string = `
<category>
  cash_flows_from_operating_activities
  <sub_category>
    ${operatingCashFlowSubCategories.join('\n')}
  </sub_category>
</category>
`;

const cash_flows_from_investing_activities_labels: string = `
<category>
  cash_flows_from_investing_activities
  <sub_category>
  ${investingCashFlowSubCategories.join('\n')}
  </sub_category>
</category>
`;
const cash_flows_from_financing_activities_labels: string = `
<category>
  cash_flows_from_financing_activities
  <sub_category>
   ${financingCashFlowSubCategories.join('\n')} 
  </sub_category>
</category>
`;
const balance_statement_labels: string = `
<category>
  Condensed Consolidated Statement of Financial Position (Unaudited)
  <sub_category>
  ${balanceStatementSubCategories.join('\n')}
  <sub_category>
<category>
`;
const quarterly_report_instruction = (labels: string) =>
  `${identification} ${quarterly_report_data_format} ${labels} ${quarterly_output_format}`;

export const PROFIT_LOSS_EXTRACTION_SYSTEM_INSTRUCTION =
  quarterly_report_instruction(profit_loss_labels);

export const BALANCE_STATEMENT_EXTRACTION_SYSTEM_INSTRUCTION =
  quarterly_report_instruction(balance_statement_labels);

export const CASH_FLOWS_FROM_OPERATING_ACTIVITIES_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(cash_flows_from_operating_activities_labels);

export const CASH_FLOWS_FROM_INVESTING_ACTIVITIES_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(cash_flows_from_investing_activities_labels);

export const CASH_FLOWS_FROM_FINANCING_ACTIVITIES_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(cash_flows_from_financing_activities_labels);
