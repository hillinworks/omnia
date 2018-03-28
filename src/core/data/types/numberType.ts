import { LocMessage } from "../../localization/locMessage";
import { INumberMetadata } from "../metadata/numberMetadata";
import { NotComparableError } from "../NotComparableError";
import { DataType } from "./dataType";

export abstract class NumberType<TMetadata extends INumberMetadata> extends DataType<number, TMetadata> {

    protected compareImpl(a: number, b: number): number {
        throw new NotComparableError();
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
