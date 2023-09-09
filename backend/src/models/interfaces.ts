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

export interface Pack {
  id: number;
  pack_id: number;
  product_id: number;
  qty: number;
}

export interface AggregatedPack {
  id: number;
  pack_id: number;
  products_quantities: ProductQuantity[];
}

export interface ProductQuantity {
  product_id: number;
  qty: number;
}
