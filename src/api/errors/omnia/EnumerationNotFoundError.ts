import { HttpError } from "routing-controllers";

export class EnumerationNotFoundError extends HttpError {
    constructor() {
        super(404, "Enumeration not found");
    }
}
