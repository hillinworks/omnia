import { INumberMetadata } from "./numberMetadata";

export interface IDecimalMetadata extends INumberMetadata {
    precision: number;
}
