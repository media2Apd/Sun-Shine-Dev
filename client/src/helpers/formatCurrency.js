import { getCurrencyLocale } from "../helpers/OrganizationData"; 

const formatCurrency = (amount, options = {}) => {
  // 1. Handle cases where only the options object is passed without an amount (e.g., formatCurrency({ currency: "USD" }))
  if (typeof amount === "object" && amount !== null) {
    options = amount;
    amount = undefined;
  }

  const {
    currency = "INR",
    decimals = 2,
    autoDecimals = false,
  } = options;

  // Get the locale for the currency
  const locale = options.locale || getCurrencyLocale(currency);

  // 2. If amount is not provided, return only the currency symbol
  if (amount === undefined || amount === null) {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    });
    
    // Format a dummy value (0) and extract the currency symbol part
    const parts = formatter.formatToParts(0);
    const currencyPart = parts.find(part => part.type === "currency");
    
    // Return the symbol if found, otherwise fallback to the currency code
    return currencyPart ? currencyPart.value : currency;
  }

  // 3. If amount is provided, format it as currency normally
  let minFraction = decimals;
  let maxFraction = decimals;

  if (autoDecimals) {
    minFraction = Number.isInteger(Number(amount)) ? 0 : decimals;
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: minFraction,
    maximumFractionDigits: maxFraction,
  }).format(amount);
};

export default formatCurrency;