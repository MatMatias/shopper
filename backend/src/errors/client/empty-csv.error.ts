import { GenericClientError } from "./generic-client.error";

export class EmptyCSVError extends GenericClientError {
  constructor() {
    const errorMessage =
      'CSV is empty. CSV format must be "product_code, new_price"';
    super(errorMessage);
  }
}
