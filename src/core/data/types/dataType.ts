import { LocMessage } from "../../localization/LocMessage";
import { INoMetadata } from "../metadata/noMetadata";
import { DataTypeBase } from "./dataTypeBase";

export abstract class DataType<TValue, TMetadata = INoMetadata> extends DataTypeBase {

    public compare(a: any, b: any): number {
        return this.compareImpl(this.convertData(a), this.convertData(b));
    }

    public coerce(data: any, metadata: any): any {
        return this.coerceImpl(this.convertData(data), this.convertMetadata(metadata));
    }

    public validate(data: any, metadata: any): LocMessage[] {
        const messages: LocMessage[] = [];
        this.validateImpl(this.convertData(data), this.convertMetadata(metadata), messages);
        return messages;
    }

    protected convertData(data: any): TValue {
        return data as TValue;
    }

    protected convertMetadata(metadata: any): TMetadata {
        return metadata as TMetadata;
    }

    protected abstract compareImpl(a: TValue, b: TValue): number;

    protected abstract coerceImpl(data: TValue, metadata: TMetadata): TValue;

    protected abstract validateImpl(data: TValue, metadata: TMetadata, messages: LocMessage[]): void;

}
