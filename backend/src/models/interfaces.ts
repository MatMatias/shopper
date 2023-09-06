export interface Product {
  code: number;
  name: string;
  current_price: number;
  new_price: number;
}

export interface CSVRow {
  product_code: number;
  new_price: number;
}
