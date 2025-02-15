"use client"
import { ExtractedData } from "@/lib/consts/fde"
import { bankingRatiosFormulas, FinancialData, Formula, formulaDict, insuranceRatiosFormulas } from "@/lib/gemini/config/formulas";
import { cn } from "@/utils/cn";
import { Button, Input, InputRef, Select } from "antd"
import { Dispatch, RefObject, SetStateAction } from "react";

export const Calculator = ({
  data,
  selectedSector,
  quarter,
  setQuarter,
  companyInputRef,
  quarterEndPrice,
  setQuarterEndPrice,
  calculatedRatios,
  setCalculatedRatios
}: {
  data: ExtractedData;
  selectedSector: string;
  quarter: 1 | 2 | 3 | 4;
  setQuarter: Dispatch<SetStateAction<1 | 2 | 3 | 4>>;
  companyInputRef: RefObject<InputRef | null>;
  quarterEndPrice: string;
  setQuarterEndPrice: Dispatch<SetStateAction<string>>;
  calculatedRatios: FinancialData | null;
  setCalculatedRatios: Dispatch<SetStateAction<FinancialData | null>>;

}) => {
  const reducedData = (): FinancialData => {
    const rd = [...data.incomeStatement, ...data.balanceSheet].reduce((acc, curr) => {
      const [k, v] = Object.entries(curr)[0];
      acc[k] = v;
      return acc
    }, {})
    return rd;
  }
  const calculateRatios = (quarter: 1 | 2 | 3 | 4, quarter_end_price: string) => {
    if (!data.balanceSheet || !data.incomeStatement) return null;
    const company = companyInputRef.current !== null ? companyInputRef.current.input?.value : ""
    const result: FinancialData = {};
    const fd: FinancialData = reducedData()
    fd.quarter_end_price = quarter_end_price || "-"
    const calc = (formulas: Formula[]) => {
      formulas.forEach((i) => {
        const [key, fn] = Object.entries(i)[0]
        const calVal = fn(fd, quarter, company)
        fd[key] = calVal ?? "-";
        result[key] = calVal ?? "-"
      })
    }
    switch (selectedSector) {
      case "commercial_banks":
      case "development_banks":
      case "finance":
      case "micro_finance":
        calc(bankingRatiosFormulas)
        break;
      case "life_insurance":
      case "non_life_insurance":
        calc(insuranceRatiosFormulas)
      default:
        break;
    }
    setCalculatedRatios(result)
  }
  return <div className="flex flex-col gap-4">
    <div className="flex flex-wrap gap-2 w-full">
      <div className=" flex items-center">
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
      <div className="w-fit flex items-center ">
        <span className="">Company: </span>
        <Input className="w-fit" placeholder="Optional" ref={companyInputRef} type="text" />
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
