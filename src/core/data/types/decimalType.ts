import { localize } from "../../localization/localize";
import { IDecimalMetadata } from "../metadata/decimalMetadata";
import { RegisteredDataType } from "./dataTypeFactory";
import { DataTypes } from "./dataTypes";
import { NumberType } from "./numberType";

@RegisteredDataType
export class DecimalType extends NumberType<IDecimalMetadata> {
    public get name(): string { return localize("decimal"); }
    public get key(): DataTypes { return DataTypes.Decimal; }
}
