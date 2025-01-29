import { NextResponse } from 'next/server';
import fs from 'fs/promises'; // Use fs/promises for async file operations
import path from 'path';
import {
  getCashFlowOperatingData,
  getProfitLossData,
  getCashFlowInvestingData,
  getBalanceStatementData,
  getCashFlowFinancingData
} from '../../../lib/gemini/api';

export async function POST(request: Request) {
  try {
    const { image, label } = await request.json();

    if (!image || !label) {
      return NextResponse.json(
        { error: 'Image and label are required' },
        { status: 400 }
      );
    }

    // Create temp file path
    const tmpDir = '/tmp';
    const fileName = `${Date.now()}-${label}.png`;
    const filePath = path.join(tmpDir, fileName);

    // Convert base64 to image and save
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    await fs.writeFile(filePath, buffer); // Use async writeFile

    let data = null;

    // Call appropriate extractor based on label
    switch (label) {
      case 'profitandloss':
        data = await getProfitLossData(filePath);
        break;
      case 'balancestatement':
        data = await getBalanceStatementData(filePath);
        break;
      case 'cashflow':
        //data = await getCashFlow(filePath);
        const cashFlowOperatingData = await getCashFlowOperatingData(filePath);
        const cashFlowInvestingData = await getCashFlowInvestingData(filePath);
        const cashFlowFinancingData = await getCashFlowFinancingData(filePath);
        data = [
          ...cashFlowOperatingData,
          ...cashFlowInvestingData,
          ...cashFlowFinancingData
        ];
        break;
      case 'operatingcashflow':
        data = await getCashFlowOperatingData(filePath);
        break;
      case 'investingcashflow':
        data = await getCashFlowInvestingData(filePath);
        break;
      case 'financingcashflow':
        data = await getCashFlowFinancingData(filePath);
        break;
      default:
        // Clean up temp file
        await fs.unlink(filePath); // Use async unlink
        return NextResponse.json(
          { error: 'Invalid label provided' },
          { status: 400 }
        );
    }

    // Clean up temp file
    await fs.unlink(filePath); // Use async unlink

    if (!data) {
      return NextResponse.json(
        { error: 'Failed to extract data' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
