import { NextResponse } from "next/server";
import fs from "fs/promises"; // Use fs/promises for async file operations
import path from "path";
import {
  getBalanceSheetData,
  getBankRatiosData,
  getBankingIncomeStatement,
  getHTBalanceSheetData,
  getHTIncomeStatementData,
  getInsuranceBalanceSheetData,
  getInsuranceIncomeStatementData,
  getLifeInsuranceRatiosData,
  getMKCHBalanceSheetData,
  getMKCHIncomeStatementData,
  getMPBalanceSheetData,
  getMPIncomeStatementData,
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

export async function POST(request: Request) {
  try {
    const { image, sector, label } = await request.json();

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
    console.log(
      "Call appropriate extractor based on label",
      `${sector}-${label}`,
    );

    switch (`${sector}-${label}`) {
      case "hotels_and_tourism-incomeStatement":
        data = await getHTIncomeStatementData(filePath);
        break;
      case "hotels_and_tourism-balanceSheet":
        data = await getHTBalanceSheetData(filePath);
        break;
      case "manufacturing_and_processing-incomeStatement":
        data = await getMPIncomeStatementData(filePath);
        break;
      case "manufacturing_and_processing-balanceSheet":
        data = await getMPBalanceSheetData(filePath);
        break;
      case "development_banks-incomeStatement":
      case "commercial_banks-incomeStatement":
      case "finance-incomeStatement":
      case "micro_finance-incomeStatement":
        data = await getBankingIncomeStatement(filePath);
        break;
      case "non_life_insurance-balanceSheet":
      case "life_insurance-balanceSheet":
        data = await getInsuranceBalanceSheetData(filePath);
        break;
      case "non_life_insurance-incomeStatement":
      case "life_insurance-incomeStatement":
        data = await getInsuranceIncomeStatementData(filePath);
        break;
      case "non_life_insurance-ratios":
        data = await getNonelifeInsuranceRatiosData(filePath);
        break;
      case "life_insurance-ratios":
        data = await getLifeInsuranceRatiosData(filePath);
        break;
      case "development_banks-balanceSheet":
      case "commercial_banks-balanceSheet":
      case "finance-balanceSheet":
      case "micro_finance-balanceSheet":
        data = await getBalanceSheetData(filePath);
        break;
      case "development_banks-ratios":
      case "commercial_banks-ratios":
      case "finance-ratios":
      case "micro_finance-ratios":
        data = await getBankRatiosData(filePath);
        break;
      case "others-htl-incomeStatement":
        data = await getHTIncomeStatementData(filePath);
        break;
      case "others-htl-balanceSheet":
        data = await getHTBalanceSheetData(filePath);
        break;
      case "others-ntc-incomeStatement":
        data = await getNTCIncomeStatementData(filePath);
        break;
      case "others-ntc-balanceSheet":
        data = await getNTCBalanceSheetData(filePath);
        break;
      case "others-nwcl-incomeStatement":
        data = await getNWCLIncomeStatementData(filePath);
        break;
      case "others-nwcl-balanceSheet":
        data = await getNWCLBalanceSheetData(filePath);
        break;
      case "others-nrm-incomeStatement":
        data = await getNRMIncomeStatementData(filePath);
        break;
      case "others-nrm-balanceSheet":
        data = await getNRMBalanceSheetData(filePath);
        break;
      case "others-nric-incomeStatement":
        data = await getNRICIncomeStatementData(filePath);
        break;
      case "others-nric-balanceSheet":
        data = await getNRICBalanceSheetData(filePath);
        break;
      case "others-mkch-incomeStatement":
        data = await getMKCHIncomeStatementData(filePath);
        break;
      case "others-mkch-balanceSheet":
        data = await getMKCHBalanceSheetData(filePath);
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

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
