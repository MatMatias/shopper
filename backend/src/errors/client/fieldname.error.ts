import { GenericClientError } from "./generic-client.error";

export class FieldnameError extends GenericClientError {
  constructor() {
    const errorMessage = "Request body must have a 'file' field";
    super(errorMessage);
  }
}
