import {
  bankingBalanceSheetSubCategories,
  bankingIncomeStatementSubCategories,
  bankRatiosSubCategories,
  hrlBalanceSheetSubCategories,
  hrlIncomeStatementSubCategories,
  htBalanceSheetSubCategories,
  htIncomeStatementSubCategories,
  hydroBalanceSheetSubCategories,
  hydroIncomeStatementSubCategories,
  insuranceBalanceSheetSubCategories,
  insuranceIncomeStatementSubCategories,
  investmentBalanceSheetSubCategories,
  investmentIncomeStatementSubCategories,
  investmentRatiosSubCategories,
  lifeInsuranceRatiosSubCategories,
  microFinanceBalanceSheetSubCategories,
  microFinanceIncomeStatementSubCategories,
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
  "You are an expert AI and exceptional data analyst designed to process unstructured text, understand patterns and synonyms, and convert them into organized data format JSON.";

const quarterly_report_data_format: string = `
Extract data from the provided image for the following categories, focusing *exclusively* on the **final quarter (Q4)** of the current fiscal year for **banks only**. The fiscal year starts in (Asar | Ashad) and ends in (Chaitra). Therefore, Q4 corresponds to the quarter ending in (Chaitra). Ignore any data related to other quarters (Q1, Q2, Q3), year-to-date (YTD) values, or *group data*.  Extract *only* bank-specific data.

**Response Schema:**

For each <sub_category> listed below, provide the corresponding <bank_current_year_quater> value. The <bank_current_year_quater> should represent the *final quarter ending in (Chaitra)*. If multiple quarters are present for the current year, select only the Q4 data. If the quarter ending in (Chaitra) is not available, assign a hyphen '-' to the corresponding <sub_category> value.

**Data Identification:**
*   If the data is presented in four columns, assume it represents bank data for the current year.
*   If the data is presented in eight columns, assume the *last four* columns represent bank data for the current year.
*   If both group data and bank data are present, extract *only* the bank data.

**Specific Instructions:**

*   Do not include any data from previous years or other quarters of the current year.
*   Do not include any year-to-date (YTD) data.
*   Do not include any *group data*.
*   If a value appears as '-', treat it as an empty cell (no data), not as a negative value.
*   Pay close attention to potential synonyms for "final quarter," such as "Fourth Quarter Ending (Chaitra)," "Final Quarter Ending," or similar variations. The key is that it must be for the quarter ending in (Chaitra).`

const quarterly_output_format: string = `
**Output Format:**

Return data in JSON format as an array of JSON objects. Each individual data point (sub-category and its value) MUST be its own separate object within the array. The key of the object should be the sub-category name (in snake_case), and the value should be the corresponding data (as a string). If you don't find value for that sub_category, you can assign a hyphen '-' to it. Do NOT group related data points into the same object. Ensure no duplicate keys/(sub_category) are sent.

NOTE: If you don't find the data to be extracted or asked <sub_category />, but you see their synonyms the assign the value to the respective <sub_category> 

Examples:

Input:
Interest Income: 210,731,102
Net Interest Income: 73,635,440
Capital Fund to RWA: "9.65%"

Output:
[
  {"interest_income": "210,731,102"},
  {"net_interest_income": "73,635,440"},
  {"capital_fund_to_rwa": "9.65%"}
]
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
const investment_extra_instruction = `
Investment data might me in nepali / english or both mixed.
In such scenario you need to identify value for asked sub_category and assign value to it.
if you could not identify value of some sub_category just assign a hyphen (-)
`;
const investment_incomestatement_labels = `
${investment_extra_instruction}
<category>
  <sub_category>
    ${investmentIncomeStatementSubCategories.join("\n")}
  </sub_category>
</category>
`;

const investment_balancesheet_labels = `
${investment_extra_instruction}
<category>
  <sub_category>
    ${investmentBalanceSheetSubCategories.join("\n")}
  </sub_category>
</category>
`;

const investment_ratios_labels = `
${investment_extra_instruction}
<category>
  <sub_category>
    ${investmentRatiosSubCategories.join("\n")}
  </sub_category>
</category>
`;
// hydro
const hydro_extra_instruction = `
Be mindfull of synonyms while extracting, it may be not labled as asked in <sub_category>*</sub_category> so first understand the synonyms and then assign it's value to respective <sub_category>
`;
const hydro_incomestatement_labels = `
${hydro_extra_instruction}
<category>
  <sub_category>
    ${hydroIncomeStatementSubCategories.join("\n")}
  </sub_category>
</category>
`;

const hydro_balancesheet_labels = `
${investment_extra_instruction}
<category>
  <sub_category>
    ${hydroBalanceSheetSubCategories.join("\n")}
  </sub_category>
</category>
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

const micro_finance_incomestatement_labels = `
<category>
  <sub_category>
    ${microFinanceIncomeStatementSubCategories.join("\n")}
  </sub_category>
</category>
`

const micro_finance_balancesheet_labels = `
<category>
  <sub_category>
    ${microFinanceBalanceSheetSubCategories.join("\n")}
  </sub_category>
</category>
`
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

export const INVESTMENT_BALANCESHEET_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(investment_balancesheet_labels);

export const INVESTMENT_INCOMESTATEMENT_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(investment_incomestatement_labels);

export const INVESTMENT_RATIOS_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(investment_ratios_labels);

export const HYDRO_BALANCESHEET_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(hydro_balancesheet_labels);

export const HYDRO_INCOMESTATEMENT_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(hydro_incomestatement_labels);

export const MICROFINANCE_BALANCESHEET_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(micro_finance_balancesheet_labels);

export const MICROFINANCE_INCOMESTATEMENT_EXTRACTION_INSTRUCTION =
  quarterly_report_instruction(micro_finance_incomestatement_labels);


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
