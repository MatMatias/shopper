export class GenericClientError extends Error {
  statusCode: number = 400;
  override name: string = "Bad Request";

  constructor(message: string) {
    super(message);
  }
}
