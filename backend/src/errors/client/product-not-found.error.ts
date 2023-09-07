import { GenericClientError } from "./generic-client.error";

export class ProductNotFoundError extends GenericClientError {
  constructor() {
    const errorMessage =
      "One or more products were not found. All products in the CSV must be already created in the database";
    super(errorMessage);
  }
}
