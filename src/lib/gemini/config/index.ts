import {
  GenerationConfig,
  ResponseSchema,
  SchemaType,
} from "@google/generative-ai";
import {
  bankingBalanceSheetDict,
  bankingIncomeStatementDict,
  bankRatiosDict,
  Dict,
  htBalanceSheetDict,
  insuranceBalanceSheetDict,
  insuranceIncomeStatementDict,
  lifeInsuranceRatiosDict,
  nonelifeInsuranceRatiosDict,
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

export const [htBalanceSheetSubCategories, htBalanceSheetConfig] =
  genConf(htBalanceSheetDict);
