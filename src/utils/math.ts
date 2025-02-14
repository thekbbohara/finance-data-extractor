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

  //const convertedValue =
  //  numericValue > 10000 ? numericValue / 1000 : numericValue;
  //
  const convertedValue = numericValue / 1000;
  //
  // Format with commas and two decimal places
  const result = convertedValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return isParenthesized ? `(${result})` : result;
};

// check total

export const parseFormattedNumber = (value: string): number => {
  if (value === "-") return 0;

  // If the value is wrapped in parentheses, treat it as negative.
  let cleanedValue = value;
  if (String(value).startsWith("(") && String(value).endsWith(")")) {
    cleanedValue = `-${value.slice(1, -1)}`;
  }
  // Remove any commas and parse the float.
  return parseFloat(String(cleanedValue).replace(/,/g, ""));
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



