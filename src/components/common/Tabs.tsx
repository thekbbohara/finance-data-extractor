import { cn } from "@/utils/cn";
import { Button } from "antd";
import { Dispatch, SetStateAction } from "react";

const Tabs = ({ tabs, activeTab, setActiveTab, className, activeClass, inActiveClass }: { activeClass?: string; inActiveClass?: string; className?: string; tabs: string[]; activeTab: string; setActiveTab: Dispatch<SetStateAction<string>> }) => {
  return (
    <ul className="flex gap-2 mb-2 pt-1">
      {tabs.map((tab, i) => <li key={i} onClick={() => { setActiveTab(tab) }}>
        <Button
          className={cn("rounded-md text-black font-semibold py-4", activeTab == tab ? cn("bg-[#fff] border-[#fff] focus:border-[#fff] hover:bg-[#fff]", activeClass) : cn("bg-[#e8e6e3] border-[#e8e6e3] hover:bg-[#e8e6e3]", inActiveClass), className)}
        >
          {{ balanceSheet: "Balance sheet", incomeStatement: "Income statement", ratios: "Ratios" }[tab] ?? tab}
        </Button>
      </li>)}
    </ul>
  )
}
export default Tabs
