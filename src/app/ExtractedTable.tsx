"use client"
import Tabs from "@/components/common/Tabs";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { dataDict } from "@/lib/gemini/config/dict";
import { allOptions, ExtractedChecks, ExtractedData } from "@/lib/consts/fde";
import { Input, Select } from "antd";
import { Calculator } from "./Calculator";

export const ExtractedTable = ({
  data,
  selectedSector,
  otherSelectedSector,
  handleDataChange,
  extractedChecks
}: {
  data: ExtractedData;
  selectedSector: string | null;
  otherSelectedSector: string | null;
  handleDataChange: (label: string, index: number, key: string, val: string) => void;
  extractedChecks: ExtractedChecks
}) => {
  const extractedTabs: string[] = allOptions[selectedSector ?? "other"].reduce((acc: string[], curr: { value: string }) => {
    acc.push(curr.value)
    return acc
  }, [])
  const [activeTab, setActiveTab] = useState(extractedTabs[0])
  if (!selectedSector) return;
  return <div>
    <Tabs tabs={[...extractedTabs, "Calculator"]} activeTab={activeTab} setActiveTab={setActiveTab} />
    {activeTab == "Calculator" && <Calculator selectedSector={selectedSector} data={data} />}
    {data[activeTab] && <table border={1} cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th className='w-full flex'><span className='w-fit mr-auto'>Particulars</span></th>
          <th>2081/82</th>
        </tr>
      </thead>
      <tbody>
        {data[activeTab].map((item: { [key: string]: string }, id: number) =>
          Object.entries(item).map(([key, val]: [string, string]) => (
            <tr key={id + key} className={cn(id % 2 == 0 ? "bg-white" : "bg-gray-100")}>
              <td>{dataDict(key, selectedSector, otherSelectedSector) || key}</td>
              <td>
                <input
                  type="text"
                  value={val}
                  onChange={e => handleDataChange(activeTab, id, key, e.target.value)}
                  className={cn(
                    "rounded-none bg-transparent border focus:border border-transparent px-2",
                    id % 2 == 0 ? "border-b-slate-300 focus:border-b-slate-500  hover:border-b-slate-500" : "border-b-black focus:border-b-black hover:border-b-slate-500 ",
                    extractedChecks && extractedChecks[activeTab] && extractedChecks[activeTab][key] && extractedChecks[activeTab][key] == "false" ? "border border-b-red-500 focus:border-red-500" : "", "w-full"
                  )}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>}
  </div>
}
