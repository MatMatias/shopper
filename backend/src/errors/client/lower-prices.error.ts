import { GenericClientError } from "./generic-client.error";

export class LowerPricesError extends GenericClientError {
  constructor() {
    const errorMessage =
      "Invalid prices. Each product's new prices should be higher than it's cost price";
    super(errorMessage);
  }
}
