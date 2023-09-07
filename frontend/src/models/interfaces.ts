export interface ProductWithErrors {
  code: number;
  name: string;
  cost_price: number;
  sales_price: number;
  new_price: number;
  errors: string[];
}

export interface ProductToBeUpdated {
  code: number;
  new_price: number;
}