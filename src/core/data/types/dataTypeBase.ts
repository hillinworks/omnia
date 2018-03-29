import { LocMessage } from "../../localization/LocMessage";
import { DataTypes } from "../interfaces/dataTypes";

export abstract class DataTypeBase {

    public abstract get name(): string;

    public abstract get key(): DataTypes;

    public abstract compare(a: any, b: any): number;

    public abstract coerce(data: any, metadata: any): any;

    public abstract validate(data: any, metadata: any): LocMessage[];

}
