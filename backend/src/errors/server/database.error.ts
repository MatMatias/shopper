import { GenericServerError } from "./generic-server.error";

export class DatabaseError extends GenericServerError {
  constructor(functionName: string) {
    const errorMessage = `Internal server error. An unexpected error ocurred on the server database, on function ${functionName}`;
    super(errorMessage);
  }
}
