export interface GeminiTool {
  name: string;
  description: string;
  run: (args: { input: string }) => string;
}

// convertToThousands
export const convertToThousands = (formattedString: string): string => {
  if (formattedString === "-") return formattedString;
  if (formattedString.endsWith("%")) return formattedString;

  // Check if the string is wrapped in parentheses
  const isParenthesized =
    formattedString.startsWith("(") && formattedString.endsWith(")");
  let valueToConvert = formattedString;

  if (isParenthesized) {
    // Remove the surrounding parentheses
    valueToConvert = valueToConvert.slice(1, formattedString.length - 1);
  }

  // Remove commas and convert to a number
  const numericValue = parseFloat(valueToConvert.replace(/,/g, ""));
  if (isNaN(numericValue)) return formattedString;

  // Divide by 1000 if the number is greater than 10,000
  const convertedValue =
    numericValue > 10000 ? numericValue / 1000 : numericValue;

  // Format with commas and two decimal places
  const result = convertedValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return isParenthesized ? `(${result})` : result;
};

// check total

const parseFormattedNumber = (value: string): number => {
  if (value === "-") return 0;

  // If the value is wrapped in parentheses, treat it as negative.
  let cleanedValue = value;
  if (value.startsWith("(") && value.endsWith(")")) {
    cleanedValue = `-${value.slice(1, -1)}`;
  }

  // Remove any commas and parse the float.
  return parseFloat(cleanedValue.replace(/,/g, ""));
};

export const checkTotal = (
  values: string[],
  total: string,
): "ture" | "false" => {
  const reducedTotal = values.reduce(
    (acc, curr) => acc + parseFormattedNumber(curr),
    0,
  );
  const parsedTotal = parseFormattedNumber(total);
  return parsedTotal === reducedTotal ? "ture" : "false";
};

export const compareTotal = (
  data: { [key: string]: string }[],
  checks: { totalKey: string; valuesKeys: string[] }[],
) => {
  const dict: { [key: string]: string } = {};
  data.forEach((i) => {
    const [k, v] = Object.entries(i)[0];
    dict[k] = v;
  });
  const res: { [key: string]: string } = {};
  checks.forEach((c) => {
    const values: string[] = c.valuesKeys.map((key: string) => dict[key] ?? 0);
    const total: string = dict[c.totalKey];
    res[c.totalKey] = checkTotal(values, total);
  });
  return res;
};

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
