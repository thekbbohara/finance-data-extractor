import {
  GenerationConfig,
  ResponseSchema,
  SchemaType,
} from "@google/generative-ai";
import {
  type Dict,
  bankingBalanceSheetDict,
  bankingIncomeStatementDict,
  bankRatiosDict,
  hrlBalanceSheetDict,
  hrlIncomeStatementDict,
  htBalanceSheetDict,
  htIncomeStatementDict,
  hydroBalanceSheetDict,
  hydroIncomeStatementDict,
  insuranceBalanceSheetDict,
  insuranceIncomeStatementDict,
  investmentBalanceSheetDict,
  investmentIncomeStatementDict,
  investmentRatiosDict,
  lifeInsuranceRatiosDict,
  microFinanceBalanceSheetDict,
  microFinanceIncomeStatementDict,
  mkchBalanceSheetDict,
  mkchIncomeStatementDict,
  mpBalanceSheetDict,
  mpIncomeStatementDict,
  nonelifeInsuranceRatiosDict,
  nricBalanceSheetDict,
  nricIncomeStatementDict,
  nrmBalanceSheetDict,
  nrmIncomeStatementDict,
  ntcBalanceSheetDict,
  ntcIncomeStatementDict,
  nwclBalanceSheetDict,
  nwclIncomeStatementDict,
} from "./dict";

const createSubCat = (dict: Dict): string[] => {
  const cat = Object.entries(dict).map((i) => {
    return i[0];
  });
  return cat;
};

const createSchema = (subCategories: string[]): ResponseSchema => {
  const properties: { [key: string]: { type: SchemaType } } = {};

  subCategories.forEach((subCategory) => {
    properties[subCategory.toLowerCase()] = { type: SchemaType.STRING };
  });

  return {
    type: SchemaType.ARRAY,
    items: {
      // items should be a Schema object
      type: SchemaType.OBJECT,
      properties: properties,
    },
  };
};

export const createGenConf = (subCategories: string[]): GenerationConfig => {
  const genConf: GenerationConfig = {
    temperature: 0,
    topP: 0,
    topK: 1,
    maxOutputTokens: 8189,
    responseMimeType: "application/json",
    responseSchema: createSchema(subCategories),
  };
  return genConf;
};

const genConf = (dict: Dict): [string[], GenerationConfig] => {
  const subCat = createSubCat(dict);
  const genConf = createGenConf(subCat);
  return [subCat, genConf];
};

// subCategories and genConf
export const [
  bankingIncomeStatementSubCategories,
  bankingIncomeStatementConfig,
] = genConf(bankingIncomeStatementDict);

export const [bankingBalanceSheetSubCategories, bankingBalanceSheetConfig] =
  genConf(bankingBalanceSheetDict);

export const [bankRatiosSubCategories, bankRatiosConfig] =
  genConf(bankRatiosDict);

export const [insuranceBalanceSheetSubCategories, insuranceBalanceSheetConfig] =
  genConf(insuranceBalanceSheetDict);

export const [
  insuranceIncomeStatementSubCategories,
  insuranceIncomeStatementConfig,
] = genConf(insuranceIncomeStatementDict);

export const [
  nonelifeInsuranceRatiosSubCategories,
  nonelifeInsuranceRatiosConfig,
] = genConf(nonelifeInsuranceRatiosDict);

export const [lifeInsuranceRatiosSubCategories, lifeInsuranceRatiosConfig] =
  genConf(lifeInsuranceRatiosDict);

// investment
export const [
  investmentIncomeStatementSubCategories,
  investmentIncomeStatementConfig,
] = genConf(investmentIncomeStatementDict);

export const [
  investmentBalanceSheetSubCategories,
  investmentBalanceSheetConfig,
] = genConf(investmentBalanceSheetDict);

export const [investmentRatiosSubCategories, investmentRatiosConfig] =
  genConf(investmentRatiosDict);
// hydro
export const [hydroIncomeStatementSubCategories, hydroIncomeStatementConfig] =
  genConf(hydroIncomeStatementDict);

export const [hydroBalanceSheetSubCategories, hydroBalanceSheetConfig] =
  genConf(hydroBalanceSheetDict);

export const [microFinanceIncomeStatementSubCategories, microFinanceIncomeStatementConfig] = genConf(microFinanceIncomeStatementDict)

export const [microFinanceBalanceSheetSubCategories, microFinanceBalanceSheetConfig] = genConf(microFinanceBalanceSheetDict)

// Others
export const [htBalanceSheetSubCategories, htBalanceSheetConfig] =
  genConf(htBalanceSheetDict);
export const [htIncomeStatementSubCategories, htIncomeStatementConfig] =
  genConf(htIncomeStatementDict);

export const [mpIncomeStatementSubCategories, mpIncomeStatementConfig] =
  genConf(mpIncomeStatementDict);
export const [mpBalanceSheetSubCategories, mpBalanceSheetConfig] =
  genConf(mpBalanceSheetDict);

export const [hrlIncomeStatementSubCategories, hrlIncomeStatementConfig] =
  genConf(hrlIncomeStatementDict);
export const [hrlBalanceSheetSubCategories, hrlBalanceSheetConfig] =
  genConf(hrlBalanceSheetDict);

export const [ntcIncomeStatementSubCategories, ntcIncomeStatementConfig] =
  genConf(ntcIncomeStatementDict);
export const [ntcBalanceSheetSubCategories, ntcBalanceSheetConfig] =
  genConf(ntcBalanceSheetDict);

export const [mkchBalanceSheetSubCategories, mkchBalanceSheetConfig] =
  genConf(mkchBalanceSheetDict);
export const [mkchIncomeStatementSubCategories, mkchIncomeStatementConfig] =
  genConf(mkchIncomeStatementDict);

export const [nricIncomeStatementSubCategories, nricIncomeStatementConfig] =
  genConf(nricIncomeStatementDict);
export const [nricBalanceSheetSubCategories, nricBalanceSheetConfig] =
  genConf(nricBalanceSheetDict);

export const [nrmBalanceSheetSubCategories, nrmBalanceSheetConfig] =
  genConf(nrmBalanceSheetDict);
export const [nrmIncomeStatementSubCategories, nrmIncomeStatementConfig] =
  genConf(nrmIncomeStatementDict);

export const [nwclBalanceSheetSubCategories, nwclBalanceSheetConfig] =
  genConf(nwclBalanceSheetDict);
export const [nwclIncomeStatementSubCategories, nwclIncomeStatementConfig] =
  genConf(nwclIncomeStatementDict);
