export type ExtractedData = { [key: string]: { [key: string]: string }[] }
export type ExtractedChecks = { [key: string]: { [key: string]: string } } | null

export const labelNames: Record<string, string> = { incomeStatement: "Income Statement", balanceSheet: "Balance Sheet", ratios: "Ratios" }

export const sectorOptions: { value: string; label: string }[] = [
  { value: "development_banks", label: "Development Banks" },
  { value: "investment", label: "Investment" },
  { value: "life_insurance", label: "Life Insurance" },
  { value: "others", label: "Others" },
  { value: "non_life_insurance", label: "Non Life Insurance" },
  { value: "finance", label: "Finance" },
  { value: "hotels_and_tourism", label: "Hotels And Tourism" },
  { value: "commercial_banks", label: "Commercial Banks" },
  { value: "manufacturing_and_processing", label: "Manufacturing And Processing" },
  { value: "hydro_power", label: "Hydro Power" },
  { value: "micro_finance", label: "Micro Finance" },
];
export const otherSectorOptions: { value: string; label: string }[] = [
  { value: "hrl", label: "HRL" },
  { value: "mkcl", label: "MKCL" },
  { value: "nric", label: "NRIC" },
  { value: "nrm", label: "NRM" },
  { value: "ntc", label: "NTC" },
  { value: "nwcl", label: "NWCL" },
]

export const IBOptions: { value: string, label: string }[] = [
  { value: 'incomeStatement', label: 'Income Statement' },
  { value: 'balanceSheet', label: 'Balance Sheet' },
]

export const IBROptions: { value: string, label: string }[] = [
  ...IBOptions,
  { value: 'ratios', label: 'Ratios' },
]

export const allOptions: { [key: string]: { value: string, label: string }[] } = {
  development_banks: [...IBROptions], //bankingIncomeStatement , bankingBalanceSheet, bankingRation
  investment: [...IBROptions],
  life_insurance: [...IBROptions], //InsuranceIncomeStatement , InsuranceBalanceSheet
  others: [...IBOptions], //**IncomeStatement, **BalanceSheet
  non_life_insurance: [...IBROptions], //InsuranceIncomeStatement , InsuranceBalanceSheet
  finance: [...IBROptions], //bankingIncomeStatement , bankingBalanceSheet, bankingRation

  hotels_and_tourism: [...IBOptions], //htBalanceSheet , htIncomeStatement
  commercial_banks: [...IBROptions], //bankingIncomeStatement , bankingBalanceSheet, bankingRation

  manufacturing_and_processing: [...IBOptions], //mpBalanceSheet , mpIncomeStatement
  hydro_power: [...IBOptions],
  micro_finance: [...IBROptions] //bankingIncomeStatement , bankingBalanceSheet, bankingRation

}
