export function brlMask(price: number): string {
  return `R$ ${price.toFixed(2).replace(new RegExp("\\.", "g"), ",")}`;
}
