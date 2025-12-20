import { CustomError } from "./custom-error";

export class ValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: { message: string; field?: string }[]) {
    super("Validation error");
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    return this.errors;
  }
}
