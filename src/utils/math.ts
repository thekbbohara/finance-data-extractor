export const convertToThousands = (formattedString: string) => {
  if (formattedString === "-") return formattedString;
  // Remove commas and convert to float
  let numericValue = parseFloat(formattedString.replace(/,/g, ""));
  if (isNaN(numericValue)) return formattedString;

  // Convert to thousands if greater than 10,000
  if (numericValue > 10000) {
    numericValue = numericValue / 1000;
  }

  // Format back with commas and two decimal places
  return numericValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
