import { GenericClientError } from "./generic-client.error";
import { POLICY_PRICE_READJUSTMENT } from "@src/policies";

export class PricesReadjustmentError extends GenericClientError {
  constructor() {
    const errorMessage = `Invalid prices. Each products' new prices should be exactly ${POLICY_PRICE_READJUSTMENT} times higher or lower than before`;
    super(errorMessage);
  }
}
