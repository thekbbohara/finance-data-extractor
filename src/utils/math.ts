export const convertToThousands = (formattedString: string) => {
  if (formattedString === "-") return formattedString;
  if (formattedString.endsWith("%")) return formattedString;
  // isStartsWithParentheses
  const isSWP =
    formattedString.startsWith("(") && formattedString.endsWith(")");
  let val = formattedString;
  if (isSWP) {
    val = val.slice(1, val.length - 1);
  }
  // Remove commas and convert to float
  let numericValue = parseFloat(val.replace(/,/g, ""));
  if (isNaN(numericValue)) return formattedString;

  // Convert to thousands if greater than 10,000
  if (numericValue > 10000) {
    numericValue = numericValue / 1000;
  }

  // Format back with commas and two decimal places
  const result = numericValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (isSWP) {
    return `(${result})`;
  }
  return result;
};
