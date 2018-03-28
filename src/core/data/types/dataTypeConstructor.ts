import { DataTypeBase } from "./dataTypeBase";

export interface IDataTypeConstructor {
    new(): DataTypeBase;
}
