export const formatCurrency = (
  value: number,
  locale: string = "id-ID",
  currency: string = "IDR"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};
