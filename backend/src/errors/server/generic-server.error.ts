export class GenericServerError extends Error {
  statusCode: number = 500;
  override name: string = "Internal Server error";

  constructor(message: string) {
    super(message);
  }
}
