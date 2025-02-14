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
  lifeInsuranceRatiosConfig,
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
  return async (imageUrl: string, userInstruction: string) => {
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
          `${prompt} userInstruction:${userInstruction}`,
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
  "",
  bankingIncomeStatementConfig,
  "profit_loss",
);

export const getBalanceSheetData = createExtractor(
  BALANCE_SHEET_EXTRACTION_INSTRUCTION,
  "",
  bankingBalanceSheetConfig,
  "banking_balance_sheet",
);

export const getBankRatiosData = createExtractor(
  BANK_RATIOS_EXTRACTION_INSTRUCTION,
  "",
  bankRatiosConfig,
  "bank_ratios",
);

export const getInsuranceBalanceSheetData = createExtractor(
  INSURANCE_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "",
  insuranceBalanceSheetConfig,
  "insurance_balancesheet",
);

export const getInsuranceIncomeStatementData = createExtractor(
  INSURANCE_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "",
  insuranceIncomeStatementConfig,
  "insurance_incomestatement",
);

export const getNonelifeInsuranceRatiosData = createExtractor(
  NONELIFE_INSURANCE_RATIOS_EXTRACTION_INSTRUCTION,
  "",
  nonelifeInsuranceRatiosConfig,
  "nonelife_insurance_ratios",
);

export const getLifeInsuranceRatiosData = createExtractor(
  LIFE_INSURANCE_RATIOS_EXTRACTION_INSTRUCTION,
  "",
  lifeInsuranceRatiosConfig,
  "life_insurance_ratios",
);
export const getHTBalanceSheetData = createExtractor(
  HT_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "",
  htBalanceSheetConfig,
  "ht_balancesheet_config",
);
export const getHTIncomeStatementData = createExtractor(
  HT_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "",
  htIncomeStatementConfig,
  "ht_incomestatement_config",
);
export const getMPBalanceSheetData = createExtractor(
  MP_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "",
  mpBalanceSheetConfig,
  "mp_balancesheet_config",
);
export const getMPIncomeStatementData = createExtractor(
  MP_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "",
  mpIncomeStatementConfig,
  "mp_incomestatement_config",
);
export const getInvestmentIncomeStatementData = createExtractor(
  INVESTMENT_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "",
  investmentIncomeStatementConfig,
  "investment_incomestatement_config",
);
export const getInvestmentBalanceSheetData = createExtractor(
  INVESTMENT_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "",
  investmentBalanceSheetConfig,
  "investment_balancesheet_config",
);
export const getInvestmentRatiosData = createExtractor(
  INVESTMENT_RATIOS_EXTRACTION_INSTRUCTION,
  "",
  investmentRatiosConfig,
  "investment_ratios_config",
);
//hydro
export const getHydroIncomeStatementData = createExtractor(
  HYDRO_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "",
  hydroIncomeStatementConfig,
  "hydro_incomestatement_config",
);
export const getHydroBalanceSheetData = createExtractor(
  HYDRO_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "",
  hydroBalanceSheetConfig,
  "hydro_balancesheet_config",
);
// micro finance
export const getMicroFinanceIncomeStatementData = createExtractor(
  MICROFINANCE_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "",
  microFinanceIncomeStatementConfig,
  "microFinance_incomestatement_config",
);
export const getMicroFinanceBalanceSheetData = createExtractor(
  MICROFINANCE_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "",
  microFinanceBalanceSheetConfig,
  "microFinance_balancesheet_config",
);
// others
export const getHRLIncomeStatementData = createExtractor(
  HRL_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "",
  hrlIncomeStatementConfig,
  "nwcl_incomestatement_config",
);

export const getHRLBalanceSheetData = createExtractor(
  HRL_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "",
  hrlBalanceSheetConfig,
  "nwcl_balancesheet_config",
);
export const getNTCIncomeStatementData = createExtractor(
  HRL_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "",
  ntcIncomeStatementConfig,
  "nwcl_incomestatement_config",
);

export const getNTCBalanceSheetData = createExtractor(
  HRL_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "",
  ntcBalanceSheetConfig,
  "nwcl_balancesheet_config",
);
export const getNWCLIncomeStatementData = createExtractor(
  NWCL_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "",
  nwclIncomeStatementConfig,
  "nwcl_incomestatement_config",
);

export const getNWCLBalanceSheetData = createExtractor(
  NWCL_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "",
  nwclBalanceSheetConfig,
  "nwcl_balancesheet_config",
);

export const getNRMIncomeStatementData = createExtractor(
  NRM_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "",
  nrmIncomeStatementConfig,
  "nrm_incomestatement_config",
);

export const getNRMBalanceSheetData = createExtractor(
  NRM_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "",
  nrmBalanceSheetConfig,
  "nrm_balancesheet_config",
);

export const getNRICIncomeStatementData = createExtractor(
  NRIC_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "",
  nricIncomeStatementConfig,
  "nric_incomestatement_config",
);

export const getNRICBalanceSheetData = createExtractor(
  NRIC_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "",
  nricBalanceSheetConfig,
  "nric_balancesheet_config",
);

export const getMKCHIncomeStatementData = createExtractor(
  MKCH_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "",
  mkchIncomeStatementConfig,
  "mkch_incomestatement_config",
);

export const getMKCHBalanceSheetData = createExtractor(
  MKCH_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "",
  mkchBalanceSheetConfig,
  "mkch_balancesheet_config",
);
