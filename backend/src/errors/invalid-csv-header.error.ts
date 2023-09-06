import { GenericClientError } from "./generic-client.error";

export class InvalidCSVHeaderError extends GenericClientError {
  constructor() {
    const errorMessage =
      'Invalid CSV Header. CSV header should be "product_code,new_price"';
    super(errorMessage);
  }
}
