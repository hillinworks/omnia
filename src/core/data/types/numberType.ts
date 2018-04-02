import { LocMessage } from "../../localization/locMessage";
import { DataTypes } from "../interfaces/dataTypes";
import { INumberMetadata } from "../interfaces/metadata/INumberMetadata";
import { DataType } from "./DataType";

export class NumberType<TMetadata extends INumberMetadata> extends DataType<number, TMetadata> {

    public get name(): string { return "number"; }

    public get key(): DataTypes { return DataTypes.Number; }

    protected compareImpl(a: number, b: number): number {
        return a - b;
    }

    protected coerceImpl(data: number, metadata: TMetadata): number {
        if (metadata.maxValue && data > metadata.maxValue) {
            return metadata.maxValue;
        }

        if (metadata.minValue && data < metadata.minValue) {
            return metadata.minValue;
        }

        return data;
    }

    protected validateImpl(data: number, metadata: TMetadata, messages: LocMessage[]): void {
        if (metadata.minValue && data < metadata.minValue) {
            messages.push(new LocMessage("{name} must be larger than {value}", { value: metadata.minValue! }));
        }

        if (metadata.maxValue && data > metadata.maxValue) {
            messages.push(new LocMessage("{name} must be smaller than {value}", { length: metadata.maxValue! }));
        }
    }

}
