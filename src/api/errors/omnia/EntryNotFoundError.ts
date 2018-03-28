import { HttpError } from "routing-controllers";

export class EntryNotFoundError extends HttpError {
    constructor() {
        super(404, "Entry not found");
    }
}
