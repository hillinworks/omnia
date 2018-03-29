import { localize } from "../../localization/localize";
import { DataTypes } from "../interfaces/dataTypes";
import { IIntegerMetadata } from "../metadata/integerMetadata";
import { RegisteredDataType } from "./dataTypeFactory";
import { NumberType } from "./NumberType";

@RegisteredDataType
export class DecimalType extends NumberType<IIntegerMetadata> {
    public get name(): string { return localize("integer"); }
    public get key(): DataTypes { return DataTypes.Integer; }
}
