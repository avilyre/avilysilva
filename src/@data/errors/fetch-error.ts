export class FetchError extends Error {
  constructor(message: string) {
    super();
    this.name = "FetchError";
    this.message = message;
  }
}
