import { GenericClientError } from "./generic-client.error";

export class InvalidCSVBodyError extends GenericClientError {
  constructor() {
    const errorMessage =
      'Invalid CSV Body. CSV body should follow the valid header "product_code[number],new_price[number]"';
    super(errorMessage);
  }
}
