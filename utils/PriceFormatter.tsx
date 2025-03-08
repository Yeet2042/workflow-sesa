export default function PriceFormatter(price: number): string {
  return new Intl.NumberFormat("ten-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
}
