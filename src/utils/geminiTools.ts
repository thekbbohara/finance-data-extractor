import { checkTotal, convertToThousands } from "./math";

export interface GeminiTool {
  name: string;
  description: string;
  run: (args: { input: string }) => string;
}


// Create a tool object that wraps the conversion function
export const convertToThousandsTool: GeminiTool = {
  name: "ConvertToThousands",
  description:
    "Converts a formatted numeric string into thousands if its numeric value exceeds 10,000. Accepts inputs like '69000','15,000', '(25,000)', '-' and strings ending with '%'.",
  run: ({ input }) => convertToThousands(input),
};

export const checkTotalTool: GeminiTool = {
  name: "CheckTotal",
  description:
    "Checks whether the sum of an array of formatted numeric strings equals the provided total. " +
    "Accepts input as a JSON string with keys 'values' (string array) and 'total' (string).",
  run: ({ input }) => {
    try {
      const parsed = JSON.parse(input) as { values: string[]; total: string };
      return checkTotal(parsed.values, parsed.total);
    } catch {
      return "false";
    }
  },
};

