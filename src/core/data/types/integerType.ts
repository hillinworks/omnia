import { localize } from "../../localization/localize";
import { IIntegerMetadata } from "../metadata/integerMetadata";
import { RegisteredDataType } from "./dataTypeFactory";
import { DataTypes } from "./dataTypes";
import { NumberType } from "./numberType";

@RegisteredDataType
export class DecimalType extends NumberType<IIntegerMetadata> {
    public get name(): string { return localize("integer"); }
    public get key(): DataTypes { return DataTypes.integer; }
}
