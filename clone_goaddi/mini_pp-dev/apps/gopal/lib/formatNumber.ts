export function formatNumber(
  number: any,
  decimals = 0,
  decimalSeparator = ".",
  thousandSeparator = ",",
) {
  // Ensure number is a valid numeric value
  if (isNaN(number) || number === null) return "";

  // Convert number to string
  let formattedNumber = parseFloat(number).toFixed(decimals).toString();

  // Add thousand separators
  if (thousandSeparator) {
    const parts = formattedNumber.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
    formattedNumber = parts.join(decimalSeparator);
  }

  return formattedNumber;
}
