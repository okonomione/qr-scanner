const defaultOptions = {
  significantDigits: 2,
  thousandsSeparator: ',',
  decimalSeparator: '.',
  symbol: '$',
};

interface iCurrencyOptions {
  significantDigits: number;
  thousandsSeparator: string;
  decimalSeparator: string;
  symbol: string;
}

export function currencyFormatter(
  value?: string | number | undefined,
  options?: iCurrencyOptions,
) {
  value = +(value ?? 0);
  options = {...defaultOptions, ...options};
  value = value.toFixed(options.significantDigits);

  const [currency, decimal] = value.split('.');
  return `${options.symbol} ${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator,
  )}${options.decimalSeparator}${decimal}`;
}
