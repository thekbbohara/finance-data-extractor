"use client"
import { ExtractedData } from "@/lib/consts/fde"
import { bankingRatiosFormulas, FinancialData, formulaDict } from "@/lib/gemini/config/formulas";
import { cn } from "@/utils/cn";
import { Button, Input, Select } from "antd"
import { useState } from "react";

export const Calculator = ({ data,
  selectedSector,
}: { data: ExtractedData; selectedSector: string; }) => {
  const [quarter, setQuarter] = useState<1 | 2 | 3 | 4>(1);
  const [quarterEndPrice, setQuarterEndPrice] = useState("");
  const [calculatedRatios, setCalculatedRatios] = useState<FinancialData | null>(null)
  const reducedData = (): FinancialData => {
    const rd = [...data.incomeStatement, ...data.balanceSheet].reduce((acc, curr) => {
      const [k, v] = Object.entries(curr)[0];
      acc[k] = v;
      return acc
    }, {})
    return rd;
  }
  const calculateRatios = (quarter: 1 | 2 | 3 | 4, quarter_end_price: string) => {
    console.log({ quarter_end_price })
    if (!data.balanceSheet || !data.incomeStatement) return null;
    const result: FinancialData = {};
    switch (selectedSector) {
      case "commercial_banks":
      case "development_banks":
      case "finance":
      case "micro_finance":
        const fd: FinancialData = reducedData()
        fd.quarter_end_price = quarter_end_price || "-"
        bankingRatiosFormulas.forEach((i) => {
          const [key, fn] = Object.entries(i)[0]
          const calVal = fn(fd, quarter, "hello")
          fd[key] = calVal ?? "-";
          result[key] = calVal ?? "-"
        })
        setCalculatedRatios(result)
        break;
      default:
        break;
    }
    console.log(result)
  }
  return <div className="flex flex-col gap-4">
    <div className="flex flex-wrap gap-2 w-full">
      <div className="w-fit flex items-center">
        <span>Quarter :</span>
        <Select
          onSelect={setQuarter}
          value={quarter}
          options={[
            { value: 1, label: "first" },
            { value: 2, label: "second" },
            { value: 3, label: "third" },
            { value: 4, label: "fourth" }
          ]} />
      </div>
      <div className="w-fit flex items-center ">
        <span className="">Quarter end price :</span>
        <Input className="w-fit" value={quarterEndPrice} onChange={(e) => setQuarterEndPrice(e.currentTarget.value)} type="text" />
      </div>
      <Button className="w-fit ml-auto" onClick={() => { calculateRatios(quarter, quarterEndPrice) }} >Calculate Ratios</Button>
    </div>
    <div className="flex flex-col ga-4">
      {calculatedRatios && <table className="max-w-[500px]">
        <thead>
          <tr>
            <td>particulars</td>
            <td>ratios</td>
          </tr>
        </thead>
        <tbody>
          {Object.entries(calculatedRatios).map(([key, val], id) => <tr key={id} className={cn(id % 2 == 0 ? "bg-white" : "bg-gray-100")}>
            <td>{formulaDict(key)}</td>
            <td>{val}</td>
          </tr>
          )}
        </tbody>
      </table>}
    </div>
  </div>
}
