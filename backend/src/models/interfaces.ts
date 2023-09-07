export interface Product {
  code: number;
  name: string;
  cost_price: number;
  sales_price: number;
}

export interface CSVRow {
  product_code: number;
  new_price: number;
}

export interface ProductWithErrors {
  code: number;
  name: string;
  cost_price: number;
  sales_price: number;
  new_price: number;
  errors: string[];
}
