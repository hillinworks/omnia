import { localize } from "../../localization/localize";
import { DataTypes } from "../interfaces/dataTypes";
import { IDecimalMetadata } from "../metadata/decimalMetadata";
import { RegisteredDataType } from "./dataTypeFactory";
import { NumberType } from "./NumberType";

@RegisteredDataType
export class DecimalType extends NumberType<IDecimalMetadata> {
    public get name(): string { return localize("decimal"); }
    public get key(): DataTypes { return DataTypes.Decimal; }
}
