import { NextResponse } from "next/server";
import fs from "fs/promises"; // Use fs/promises for async file operations
import path from "path";
import {
  getBalanceSheetData,
  getBankRatiosData,
  getBankingIncomeStatement,
  getHRLBalanceSheetData,
  getHRLIncomeStatementData,
  getHTBalanceSheetData,
  getHTIncomeStatementData,
  getHydroBalanceSheetData,
  getHydroIncomeStatementData,
  getInsuranceBalanceSheetData,
  getInsuranceIncomeStatementData,
  getInvestmentBalanceSheetData,
  getInvestmentIncomeStatementData,
  getInvestmentRatiosData,
  getLifeInsuranceRatiosData,
  getMKCHBalanceSheetData,
  getMKCHIncomeStatementData,
  getMPBalanceSheetData,
  getMPIncomeStatementData,
  getMicroFinanceBalanceSheetData,
  getMicroFinanceIncomeStatementData,
  getNRICBalanceSheetData,
  getNRICIncomeStatementData,
  getNRMBalanceSheetData,
  getNRMIncomeStatementData,
  getNTCBalanceSheetData,
  getNTCIncomeStatementData,
  getNWCLBalanceSheetData,
  getNWCLIncomeStatementData,
  getNonelifeInsuranceRatiosData,
} from "../../../lib/gemini/api";
import { compareTotal } from "@/utils/math";
import {
  insuranceBalanceSheetChecks,
  insuranceIncomeStatementChecks,
} from "@/lib/gemini/config/checks/insurance";
import {
  bankingBalanceSheetChecks,
  bankingIncomeStatementChecks,
} from "@/lib/gemini/config/checks/banking";
import {
  htBalanceSheetChecks,
  htIncomeStatementChecks,
} from "@/lib/gemini/config/checks/ht";
import {
  mpBalanceSheetChecks,
  mpIncomeStatementChecks,
} from "@/lib/gemini/config/checks/mp";
import {
  hrlBalanceSheetChecks,
  hrlIncomeStatementChecks,
} from "@/lib/gemini/config/checks/hrl";
import {
  ntcBalanceSheetChecks,
  ntcIncomeStatementChecks,
} from "@/lib/gemini/config/checks/ntc";
import {
  mkchBalanceSheetChecks,
  mkchIncomeStatementChecks,
} from "@/lib/gemini/config/checks/mkch";
import {
  nricBalanceSheetChecks,
  nricIncomeStatementChecks,
} from "@/lib/gemini/config/checks/nric";
import {
  nrmBalanceSheetChecks,
  nrmIncomeStatementChecks,
} from "@/lib/gemini/config/checks/nrm";
import {
  nwclBalanceSheetChecks,
  nwclIncomeStatementChecks,
} from "@/lib/gemini/config/checks/nwcl";
import {
  investmentBalanceSheetChecks,
  investmentIncomeStatementChecks,
} from "@/lib/gemini/config/checks/investment";
import {
  hydroBalanceSheetChecks,
  hydroIncomeStatementChecks,
} from "@/lib/gemini/config/checks/hydro";
import { Dict } from "@/lib/gemini/config/dict";

export async function POST(request: Request) {
  try {
    const { image, sector, label, userInstruction } = await request.json();

    if (!image || !label) {
      return NextResponse.json(
        { error: "Image and label are required" },
        { status: 400 },
      );
    }

    console.log("Create temp file path");
    const tmpDir = "/tmp";
    const fileName = `${Date.now()}-${label}.png`;
    const filePath = path.join(tmpDir, fileName);

    console.log("Convert base64 to image and save");
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    await fs.writeFile(filePath, buffer); // Use async writeFile

    let data = null;
    let checks = null;
    console.log(
      "Call appropriate extractor based on label",
      `${sector}-${label}`,
    );

    switch (`${sector}-${label}`) {
      case "hydro_power-incomeStatement":
        data = await getHydroIncomeStatementData(filePath, userInstruction);
        checks = compareTotal(data, hydroIncomeStatementChecks);
        break;
      case "hydro_power-balanceSheet":
        data = await getHydroBalanceSheetData(filePath, userInstruction);
        checks = compareTotal(data, hydroBalanceSheetChecks);
        break;
      case "hotels_and_tourism-incomeStatement":
        data = await getHTIncomeStatementData(filePath, userInstruction);
        checks = compareTotal(data, htIncomeStatementChecks);
        break;
      case "hotels_and_tourism-balanceSheet":
        data = await getHTBalanceSheetData(filePath, userInstruction);
        checks = compareTotal(data, htBalanceSheetChecks);
        break;
      case "manufacturing_and_processing-incomeStatement":
        data = await getMPIncomeStatementData(filePath, userInstruction);
        checks = compareTotal(data, mpIncomeStatementChecks);
        break;
      case "manufacturing_and_processing-balanceSheet":
        data = await getMPBalanceSheetData(filePath, userInstruction);
        checks = compareTotal(data, mpBalanceSheetChecks);
        break;
      case "development_banks-incomeStatement":
      case "commercial_banks-incomeStatement":
      case "finance-incomeStatement":
        data = await getBankingIncomeStatement(filePath, userInstruction);
        checks = compareTotal(data, bankingIncomeStatementChecks);
        break;
      case "micro_finance-incomeStatement":
        data = await getMicroFinanceIncomeStatementData(filePath, userInstruction);
        break;
      case "non_life_insurance-balanceSheet":
      case "life_insurance-balanceSheet":
        data = await getInsuranceBalanceSheetData(filePath, userInstruction);
        checks = compareTotal(data, insuranceBalanceSheetChecks);
        break;
      case "non_life_insurance-incomeStatement":
      case "life_insurance-incomeStatement":
        data = await getInsuranceIncomeStatementData(filePath, userInstruction);
        checks = compareTotal(data, insuranceIncomeStatementChecks);
        break;
      case "non_life_insurance-ratios":
        data = await getNonelifeInsuranceRatiosData(filePath, userInstruction);
        break;
      case "life_insurance-ratios":
        data = await getLifeInsuranceRatiosData(filePath, userInstruction);
        break;
      case "investment-incomeStatement":
        data = await getInvestmentIncomeStatementData(filePath, userInstruction);
        checks = compareTotal(data, investmentIncomeStatementChecks);
        break;
      case "investment-balanceSheet":
        data = await getInvestmentBalanceSheetData(filePath, userInstruction);
        checks = compareTotal(data, investmentBalanceSheetChecks);
        break;
      case "investment-ratios":
        data = await getInvestmentRatiosData(filePath, userInstruction);
        break;
      case "development_banks-balanceSheet":
      case "commercial_banks-balanceSheet":
      case "finance-balanceSheet":
        data = await getBalanceSheetData(filePath, userInstruction);
        checks = compareTotal(data, bankingBalanceSheetChecks);
        break;
      case "micro_finance-balanceSheet":
        data = await getMicroFinanceBalanceSheetData(filePath, userInstruction);
        break;
      case "development_banks-ratios":
      case "commercial_banks-ratios":
      case "finance-ratios":
      case "micro_finance-ratios":
        data = await getBankRatiosData(filePath, userInstruction);
        break;
      case "others-hrl-incomeStatement":
        data = await getHRLIncomeStatementData(filePath, userInstruction);
        checks = compareTotal(data, hrlIncomeStatementChecks);
        break;
      case "others-hrl-balanceSheet":
        data = await getHRLBalanceSheetData(filePath, userInstruction);
        checks = compareTotal(data, hrlBalanceSheetChecks);
        break;
      case "others-ntc-incomeStatement":
        data = await getNTCIncomeStatementData(filePath, userInstruction);
        checks = compareTotal(data, ntcIncomeStatementChecks);
        break;
      case "others-ntc-balanceSheet":
        data = await getNTCBalanceSheetData(filePath, userInstruction);
        checks = compareTotal(data, ntcBalanceSheetChecks);
        break;
      case "others-nwcl-incomeStatement":
        data = await getNWCLIncomeStatementData(filePath, userInstruction);
        checks = compareTotal(data, nwclIncomeStatementChecks);
        break;
      case "others-nwcl-balanceSheet":
        data = await getNWCLBalanceSheetData(filePath, userInstruction);
        checks = compareTotal(data, nwclBalanceSheetChecks);
        break;
      case "others-nrm-incomeStatement":
        data = await getNRMIncomeStatementData(filePath, userInstruction);
        checks = compareTotal(data, nrmIncomeStatementChecks);
        break;
      case "others-nrm-balanceSheet":
        data = await getNRMBalanceSheetData(filePath, userInstruction);
        checks = compareTotal(data, nrmBalanceSheetChecks);
        break;
      case "others-nric-incomeStatement":
        data = await getNRICIncomeStatementData(filePath, userInstruction);
        checks = compareTotal(data, nricIncomeStatementChecks);
        break;
      case "others-nric-balanceSheet":
        data = await getNRICBalanceSheetData(filePath, userInstruction);
        checks = compareTotal(data, nricBalanceSheetChecks);
        break;
      case "others-mkch-incomeStatement":
        data = await getMKCHIncomeStatementData(filePath, userInstruction);
        checks = compareTotal(data, mkchIncomeStatementChecks);
        break;
      case "others-mkch-balanceSheet":
        data = await getMKCHBalanceSheetData(filePath, userInstruction);
        checks = compareTotal(data, mkchBalanceSheetChecks);
        break;
      default:
        //
        console.log("Clean up temp file");
        await fs.unlink(filePath); // Use async unlink
        return NextResponse.json(
          { error: "Invalid label provided" },
          { status: 400 },
        );
    }

    console.log("Clean up temp file");
    await fs.unlink(filePath); // Use async unlink

    if (!data) {
      return NextResponse.json(
        { error: "Failed to extract data" },
        { status: 500 },
      );
    }
    console.log(data)
    const uniqueData: Dict[] = Object.values(
      data.reduce(
        (acc: Record<string, Dict>, obj: Dict) => {
          const key = Object.keys(obj)[0];
          acc[key] = obj;
          return acc;
        },
        {} as Record<string, Dict>,
      ),
    );
    return NextResponse.json({ data: uniqueData, checks });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
