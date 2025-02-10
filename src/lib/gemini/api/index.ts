import { GenerationConfig, GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

import {
  bankingBalanceSheetConfig,
  bankingIncomeStatementConfig,
  bankRatiosConfig,
  hrlBalanceSheetConfig,
  hrlIncomeStatementConfig,
  htBalanceSheetConfig,
  htIncomeStatementConfig,
  hydroBalanceSheetConfig,
  hydroIncomeStatementConfig,
  insuranceBalanceSheetConfig,
  insuranceIncomeStatementConfig,
  investmentBalanceSheetConfig,
  investmentIncomeStatementConfig,
  investmentRatiosConfig,
  microFinanceBalanceSheetConfig,
  microFinanceIncomeStatementConfig,
  mkchBalanceSheetConfig,
  mkchIncomeStatementConfig,
  mpBalanceSheetConfig,
  mpIncomeStatementConfig,
  nonelifeInsuranceRatiosConfig,
  nricBalanceSheetConfig,
  nricIncomeStatementConfig,
  nrmBalanceSheetConfig,
  nrmIncomeStatementConfig,
  ntcBalanceSheetConfig,
  ntcIncomeStatementConfig,
  nwclBalanceSheetConfig,
  nwclIncomeStatementConfig,
} from "../config";

import {
  BALANCE_SHEET_EXTRACTION_INSTRUCTION,
  BANK_RATIOS_EXTRACTION_INSTRUCTION,
  BANKING_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  HRL_BALANCESHEET_EXTRACTION_INSTRUCTION,
  HRL_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  HT_BALANCESHEET_EXTRACTION_INSTRUCTION,
  HT_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  HYDRO_BALANCESHEET_EXTRACTION_INSTRUCTION,
  HYDRO_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  INSURANCE_BALANCESHEET_EXTRACTION_INSTRUCTION,
  INSURANCE_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  INVESTMENT_BALANCESHEET_EXTRACTION_INSTRUCTION,
  INVESTMENT_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  INVESTMENT_RATIOS_EXTRACTION_INSTRUCTION,
  LIFE_INSURANCE_RATIOS_EXTRACTION_INSTRUCTION,
  MICROFINANCE_BALANCESHEET_EXTRACTION_INSTRUCTION,
  MICROFINANCE_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  MKCH_BALANCESHEET_EXTRACTION_INSTRUCTION,
  MKCH_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  MP_BALANCESHEET_EXTRACTION_INSTRUCTION,
  MP_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  NONELIFE_INSURANCE_RATIOS_EXTRACTION_INSTRUCTION,
  NRIC_BALANCESHEET_EXTRACTION_INSTRUCTION,
  NRIC_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  NRM_BALANCESHEET_EXTRACTION_INSTRUCTION,
  NRM_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  NWCL_BALANCESHEET_EXTRACTION_INSTRUCTION,
  NWCL_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
} from "../config/system";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

// Factory function
export const createExtractor = (
  systemInstruction: string,
  prompt: string,
  generationConfig: GenerationConfig,
  name: string,
) => {
  return async (imageUrl: string) => {
    //console.log(imageUrl ? "got img url" : "no img url");
    //console.log("Uploading img");
    const uploadResult = await fileManager.uploadFile(imageUrl, {
      mimeType: "image/jpeg",
      displayName: name,
    });
    //console.log("image uploaded successfully");
    let retry = 0;

    //console.log("Cofiguring model");
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      systemInstruction,
      generationConfig,
    });

    while (retry < 3) {
      //console.log("try", retry);
      try {
        const result = await model.generateContent([
          prompt,
          {
            fileData: {
              fileUri: uploadResult.file.uri,
              mimeType: uploadResult.file.mimeType,
            },
          },
        ]);
        //console.log({ result: result.response.text() });
        const data = result.response.text();

        // Parse the result
        const parsedResponse = JSON.parse(data);
        return parsedResponse; // Return parsed data if successful
      } catch (error: any) {
        console.error(`Error processing the data: ${error?.message ?? ""}`);
        retry++;
      }
    }

    // Return null after 3 retries
    console.error("Failed to process data after 3 retries.");
    return null;
  };
};

// Specific extractor functions
export const getBankingIncomeStatement = createExtractor(
  BANKING_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "Extract Condensed Consolidated Statement of Profit or Loss data from given image",
  bankingIncomeStatementConfig,
  "profit_loss",
);

export const getBalanceSheetData = createExtractor(
  BALANCE_SHEET_EXTRACTION_INSTRUCTION,
  "Extract Condensed Consolidated Statement of Financial Position (Unaudited) data from given image",
  bankingBalanceSheetConfig,
  "banking_balance_sheet",
);

export const getBankRatiosData = createExtractor(
  BANK_RATIOS_EXTRACTION_INSTRUCTION,
  "Extract <Bank's current year's Up To This Quarter (YTD)>  in accordance with Ratios as per NRB directives, from the given image.",
  bankRatiosConfig,
  "bank_ratios",
);

export const getInsuranceBalanceSheetData = createExtractor(
  INSURANCE_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "Extract <At The End of This Quarter> from Condensed Statement of Financial Position",
  insuranceBalanceSheetConfig,
  "insurance_balancesheet",
);

export const getInsuranceIncomeStatementData = createExtractor(
  INSURANCE_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "Extract <Current Year Upto This Quarter (YTD)> from Condensed Statement of profit & loss",
  insuranceIncomeStatementConfig,
  "insurance_incomestatement",
);

export const getNonelifeInsuranceRatiosData = createExtractor(
  NONELIFE_INSURANCE_RATIOS_EXTRACTION_INSTRUCTION,
  "Extract End Quarter from given image",
  nonelifeInsuranceRatiosConfig,
  "nonelife_insurance_ratios",
);

export const getLifeInsuranceRatiosData = createExtractor(
  LIFE_INSURANCE_RATIOS_EXTRACTION_INSTRUCTION,
  "Extract <Current Year Upto This Quarter (YTD)> from given image",
  nonelifeInsuranceRatiosConfig,
  "life_insurance_ratios",
);
export const getHTBalanceSheetData = createExtractor(
  HT_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "Extract  This Quarter Ending from given image",
  htBalanceSheetConfig,
  "ht_balancesheet_config",
);
export const getHTIncomeStatementData = createExtractor(
  HT_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "Extract  This Quarter Ending from given image",
  htIncomeStatementConfig,
  "ht_incomestatement_config",
);
export const getMPBalanceSheetData = createExtractor(
  MP_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "Extract  This Quarter Ending from given image",
  mpBalanceSheetConfig,
  "mp_balancesheet_config",
);
export const getMPIncomeStatementData = createExtractor(
  MP_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "Extract  This Quarter Ending from given image",
  mpIncomeStatementConfig,
  "mp_incomestatement_config",
);
export const getInvestmentIncomeStatementData = createExtractor(
  INVESTMENT_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "Extract respective data from given image",
  investmentIncomeStatementConfig,
  "investment_incomestatement_config",
);
export const getInvestmentBalanceSheetData = createExtractor(
  INVESTMENT_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "Extract respective data from given image",
  investmentBalanceSheetConfig,
  "investment_balancesheet_config",
);
export const getInvestmentRatiosData = createExtractor(
  INVESTMENT_RATIOS_EXTRACTION_INSTRUCTION,
  "Extract respective data from given image",
  investmentRatiosConfig,
  "investment_ratios_config",
);
//hydro
export const getHydroIncomeStatementData = createExtractor(
  HYDRO_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "Extract respective data from given image",
  hydroIncomeStatementConfig,
  "hydro_incomestatement_config",
);
export const getHydroBalanceSheetData = createExtractor(
  HYDRO_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "Extract respective data from given image",
  hydroBalanceSheetConfig,
  "hydro_balancesheet_config",
);
// micro finance
export const getMicroFinanceIncomeStatementData = createExtractor(
  MICROFINANCE_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "Extract respective data from given image",
  microFinanceIncomeStatementConfig,
  "microFinance_incomestatement_config",
);
export const getMicroFinanceBalanceSheetData = createExtractor(
  MICROFINANCE_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "Extract respective data from given image",
  microFinanceBalanceSheetConfig,
  "microFinance_balancesheet_config",
);
// others
export const getHRLIncomeStatementData = createExtractor(
  HRL_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "Extract This Quarter Ending from given image",
  hrlIncomeStatementConfig,
  "nwcl_incomestatement_config",
);

export const getHRLBalanceSheetData = createExtractor(
  HRL_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "Extract This Quarter Ending from given image",
  hrlBalanceSheetConfig,
  "nwcl_balancesheet_config",
);
export const getNTCIncomeStatementData = createExtractor(
  HRL_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "Extract This Quarter Ending from given image",
  ntcIncomeStatementConfig,
  "nwcl_incomestatement_config",
);

export const getNTCBalanceSheetData = createExtractor(
  HRL_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "Extract This Quarter Ending from given image",
  ntcBalanceSheetConfig,
  "nwcl_balancesheet_config",
);
export const getNWCLIncomeStatementData = createExtractor(
  NWCL_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "Extract This Quarter Ending from given image",
  nwclIncomeStatementConfig,
  "nwcl_incomestatement_config",
);

export const getNWCLBalanceSheetData = createExtractor(
  NWCL_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "Extract This Quarter Ending from given image",
  nwclBalanceSheetConfig,
  "nwcl_balancesheet_config",
);

export const getNRMIncomeStatementData = createExtractor(
  NRM_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "Extract This Quarter Ending from given image",
  nrmIncomeStatementConfig,
  "nrm_incomestatement_config",
);

export const getNRMBalanceSheetData = createExtractor(
  NRM_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "Extract This Quarter Ending from given image",
  nrmBalanceSheetConfig,
  "nrm_balancesheet_config",
);

export const getNRICIncomeStatementData = createExtractor(
  NRIC_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "Extract This Quarter Ending from given image",
  nricIncomeStatementConfig,
  "nric_incomestatement_config",
);

export const getNRICBalanceSheetData = createExtractor(
  NRIC_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "Extract This Quarter Ending from given image",
  nricBalanceSheetConfig,
  "nric_balancesheet_config",
);

export const getMKCHIncomeStatementData = createExtractor(
  MKCH_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "Extract This Quarter Ending from given image",
  mkchIncomeStatementConfig,
  "mkch_incomestatement_config",
);

export const getMKCHBalanceSheetData = createExtractor(
  MKCH_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "Extract This Quarter Ending from given image",
  mkchBalanceSheetConfig,
  "mkch_balancesheet_config",
);
