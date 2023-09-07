import { GenericClientError } from "./generic-client.error";

export class FileExtensionError extends GenericClientError {
  constructor() {
    const errorMessage = "File uploaded must be a .csv";
    super(errorMessage);
  }
}
