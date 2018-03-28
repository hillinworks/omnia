import { HttpError } from "routing-controllers";

export class AspectNotFoundError extends HttpError {
    constructor() {
        super(404, "Aspect not found");
    }
}
