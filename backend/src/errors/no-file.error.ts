import { GenericClientError } from "./generic-client.error";

export class NoFileError extends GenericClientError {
  constructor() {
    const errorMessage = "No CSV file uploaded";
    super(errorMessage);
  }
}
