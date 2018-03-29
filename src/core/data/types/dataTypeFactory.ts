import { DataTypes } from "../interfaces/dataTypes";
import { DataTypeBase } from "./dataTypeBase";
import { IDataTypeConstructor } from "./DataTypeConstructor";

export namespace DataTypeFactory {
    const dataTypes: { [key: number]: DataTypeBase } = {};

    export function register(name: DataTypes, type: DataTypeBase): void {
        dataTypes[name] = type;
    }
}

export function RegisteredDataType(constructor: IDataTypeConstructor): void {
    const type = new constructor();
    DataTypeFactory.register(type.key, type);
}
