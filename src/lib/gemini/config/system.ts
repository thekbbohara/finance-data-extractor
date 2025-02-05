import {
  bankingBalanceSheetSubCategories,
  bankingIncomeStatementSubCategories,
  bankRatiosSubCategories,
  hrlBalanceSheetSubCategories,
  hrlIncomeStatementSubCategories,
  htBalanceSheetSubCategories,
  htIncomeStatementSubCategories,
  insuranceBalanceSheetSubCategories,
  insuranceIncomeStatementSubCategories,
  lifeInsuranceRatiosSubCategories,
  mkchBalanceSheetSubCategories,
  mkchIncomeStatementSubCategories,
  mpBalanceSheetSubCategories,
  mpIncomeStatementSubCategories,
  nonelifeInsuranceRatiosSubCategories,
  nricBalanceSheetSubCategories,
  nricIncomeStatementSubCategories,
  nrmBalanceSheetSubCategories,
  nrmIncomeStatementSubCategories,
  ntcBalanceSheetSubCategories,
  ntcIncomeStatementSubCategories,
  nwclBalanceSheetSubCategories,
  nwclIncomeStatementSubCategories,
} from ".";

// current year upto this year bank ->
const identification: string =
  "You are an expert AI and exceptional data analyst designed to process unstructured text, understand pattern and convert it into organized data format JSON.";

const quarterly_report_data_format: string = `
It's important to remember the the name might be different then asked in response schema so you need to identify the synonyms and put the value in the respective name asked in response schema / <sub_category>*</sub_category>
NOTE: Ignore all the grop data and focus on bank current year data
If group data and bank data are given, then only extract bank data.
If group data and bank data are not specified but you see 4 columns, then it's bank data respectively.
If group data and bank data are not specified but you see 8 columns, last 4 columns are bank data respectively.
IMPORTANT: Look for data mentiond below <category>,<sub_category>,<bank_current_year_quater>,<bank_current_year_ytd>
NOTE: None of the value is in negative so if you see '-' in the value, it's hyphen not negative value and there is nothing in that cell.
NOTE: Ratio data is in in percentage%
REMEMBER: Each <sub_category> have their own <bank_current_year_quater>
REMEMBER: bank_current_year_quater can also have other name like 'First Quarter Ending *','Second Quarter Ending *','Third Quarter Ending *','Fourth Quarter Ending *','Final Quarter Ending *','This Quarter Ending *','Upto This Quarter YTD *',
Sometimes smame year but different months are give so in that case you will have to extract the latest quarter values.
fiscal year starts at (Asar | Ashad) is q1
(Asoj | Aswin) is q2
(Poush) is q3
(Chaitra) is q4
Always prioritize q4 over q3 over q2 over q1
`;

const quarterly_output_format: string = `
FINALLY: Return data in JSON format as an array of JSON objects. Each individual data point (sub-category and its value) MUST be its own separate object within the array. The key of the object should be the sub-category name, and the value should be the corresponding data (as a string). Do NOT group related data points into the same object.

Examples:

Input:
Interest Income: 210,731,102
Net Interest Income: 73,635,440

Output:
[
  {"interest_income": "210,731,102"},
  {"net_interest_income": "73,635,440"}
]

Input:
Fee and Commission Income: 3,178,014
Other Operating Expenses: (3,111,837)

Output:
[
  {"fee_and_commission_income": "3,178,014"},
  {"other_operating_expenses": "(3,111,837)"}
]

Input:
Capital Fund to RWA: "9.65%"

Output:[
  {"capital_fund_to_rwa": "9.65%"}
]
Now, apply this same pattern to the *entire* input data you are given.  Each key-value pair must be a separate object in the array.
IMPORTANT and REMEMBER, You must return all sub_category, if you don't find value for that sub_category you can assign a hyphen '-' to it.
MAKE SURE to not send duplicate keys/(</sub_category>)
`;

const bankingIncomeStatementLabels: string = `
NOTE: If 'This Quarter Ending' and 'Upto This Quarter (YTD)' is given prioritize Upto This Quarter (YTD) and return 'Upto This Quarter (YTD)' no need to return This Quarter Ending.
<category>
  profit_or_Loss
  <sub_category>
  ${bankingIncomeStatementSubCategories.join("\n")}
  </sub_category>
</category>

`;

const bankin_balance_sheet_labels: string = `
NOTE: sometime 'Placement with Bank and Financial Institutions' is 'Placement with Bank and FIs' so extract it as <placement_with_bank_and_financial_institutions> 
<category>
  Condensed Consolidated Statement of Financial Position (Unaudited)
  <sub_category>
  ${bankingBalanceSheetSubCategories.join("\n")}
  <sub_category>
<category>
`;
const bank_ratios_labels: string = `
<category>
  Ratios as per NRB Directives 
  <sub_category>
  ${bankRatiosSubCategories.join("\n")}
  <sub_category>
<category>
`;
const insurance_balancesheet_labels: string = `
<category>
  Consolidated Statement of Financial Position
  <sub_category>
  ${insuranceBalanceSheetSubCategories.join("\n")}
  <sub_category>
<category>
`;
const insurance_incomestatement_labels: string = `
<category>
  Consolidated Statement of Financial Position
  <sub_category>
  ${insuranceIncomeStatementSubCategories.join("\n")}
  <sub_category>
<category>
`;
const nonelife_insurance_ratios_labels: string = `
<category>
  <sub_category>
  ${nonelifeInsuranceRatiosSubCategories.join("\n")}
  <sub_category>
<category>
`;
const life_insurance_ratios_labels: string = `
<category>
  <sub_category>
  ${lifeInsuranceRatiosSubCategories.join("\n")}
  <sub_category>
<category>
`;
const ht_balancesheet_labels: string = `
<category>
  <sub_category>
  ${htBalanceSheetSubCategories.join("\n")}
  <sub_category>
<category>
`;
const ht_incomestatement_labels: string = `
<category>
  <sub_category>
  ${htIncomeStatementSubCategories.join("\n")}
  <sub_category>
<category>
`;
const mp_incomestatement_labels: string = `
<category>
  <sub_category>
  ${mpIncomeStatementSubCategories.join("\n")}
  <sub_category>
<category>
`;
const mp_balancesheet_labels: string = `
<category>
  <sub_category>
  ${mpBalanceSheetSubCategories.join("\n")}
  <sub_category>
<category>
`;
// others

const hrl_incomestatement_labels = `
<category>
  <sub_category>
    ${hrlIncomeStatementSubCategories.join("\n")}
  </sub_category>
</category>
`;

const hrl_balancesheet_labels = `
<category>
  <sub_category>
    ${hrlBalanceSheetSubCategories.join("\n")}
  </sub_category>
</category>
`;

const ntc_incomestatement_labels = `
<category>
  <sub_category>
    ${ntcIncomeStatementSubCategories.join("\n")}
  </sub_category>
</category>
`;

const ntc_balancesheet_labels = `
<category>
  <sub_category>
    ${ntcBalanceSheetSubCategories.join("\n")}
  </sub_category>
</category>
`;

const nwcl_incomestatement_labels = `
<category>
  <sub_category>
    ${nwclIncomeStatementSubCategories.join("\n")}
  </sub_category>
</category>
`;

const nwcl_balancesheet_labels = `
<category>
  <sub_category>
    ${nwclBalanceSheetSubCategories.join("\n")}
  </sub_category>
</category>
`;

// nrm labels
const nrm_incomestatement_labels = `
<category>
  <sub_category>
    ${nrmIncomeStatementSubCategories.join("\n")}
  </sub_category>
</category>
`;

const nrm_balancesheet_labels = `
<category>
  <sub_category>
    ${nrmBalanceSheetSubCategories.join("\n")}
  </sub_category>
</category>
`;

// nric labels
const nric_incomestatement_labels = `
<category>
  <sub_category>
    ${nricIncomeStatementSubCategories.join("\n")}
  </sub_category>
</category>
`;

const nric_balancesheet_labels = `
<category>
  <sub_category>
    ${nricBalanceSheetSubCategories.join("\n")}
  </sub_category>
</category>
`;

// mkch labels
const mkch_incomestatement_labels = `
<category>
  <sub_category>
    ${mkchIncomeStatementSubCategories.join("\n")}
  </sub_category>
</category>
`;

const mkch_balancesheet_labels = `
<category>
  <sub_category>
    ${mkchBalanceSheetSubCategories.join("\n")}
  </sub_category>
</category>
`;

const quarterly_report_instruction = (labels: string) => {
  return `${identification} ${quarterly_report_data_format} ${labels} ${quarterly_output_format}`;
};

export const BANKING_INCOMESTATEMENT_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(bankingIncomeStatementLabels);

export const BALANCE_SHEET_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(bankin_balance_sheet_labels);

export const BANK_RATIOS_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(bank_ratios_labels);

export const INSURANCE_BALANCESHEET_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(insurance_balancesheet_labels);

export const INSURANCE_INCOMESTATEMENT_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(insurance_incomestatement_labels);

export const NONELIFE_INSURANCE_RATIOS_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(nonelife_insurance_ratios_labels);

export const LIFE_INSURANCE_RATIOS_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(life_insurance_ratios_labels);

export const HT_BALANCESHEET_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(ht_balancesheet_labels);

export const HT_INCOMESTATEMENT_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(ht_incomestatement_labels);

export const MP_BALANCESHEET_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(mp_balancesheet_labels);

export const MP_INCOMESTATEMENT_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(mp_incomestatement_labels);

// others

export const HRL_BALANCESHEET_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(hrl_balancesheet_labels);
export const HRL_INCOMESTATEMENT_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(hrl_incomestatement_labels);

export const NTC_BALANCESHEET_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(ntc_balancesheet_labels);
export const NTC_INCOMESTATEMENT_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(ntc_incomestatement_labels);

export const NWCL_BALANCESHEET_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(nwcl_balancesheet_labels);
export const NWCL_INCOMESTATEMENT_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(nwcl_incomestatement_labels);

export const NRM_BALANCESHEET_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(nrm_balancesheet_labels);
export const NRM_INCOMESTATEMENT_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(nrm_incomestatement_labels);

export const NRIC_BALANCESHEET_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(nric_balancesheet_labels);
export const NRIC_INCOMESTATEMENT_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(nric_incomestatement_labels);

export const MKCH_BALANCESHEET_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(mkch_balancesheet_labels);
export const MKCH_INCOMESTATEMENT_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(mkch_incomestatement_labels);
