import { localize } from "../../localization/localize";
import { LocMessage } from "../../localization/locMessage";
import { DataTypes } from "../interfaces/dataTypes";
import { IStringMetadata } from "../interfaces/metadata/IStringMetadata";
import { NotComparableError } from "../NotComparableError";
import { DataType } from "./DataType";
import { RegisteredDataType } from "./dataTypeFactory";

@RegisteredDataType
export class StringType extends DataType<string, IStringMetadata> {

    protected compareImpl(a: string, b: string): number {
        throw new NotComparableError();
    }

    protected coerceImpl(data: string, metadata: IStringMetadata): string {
        if (metadata.maxLength && data.length > metadata.maxLength) {
            return data.substr(0, metadata.maxLength);
        }

        return data;
    }

    protected validateImpl(data: string, metadata: IStringMetadata, messages: LocMessage[]): void {
        if (metadata.minLength && data.length < metadata.minLength) {
            messages.push(new LocMessage("{name} must have at least {length} characters", { length: metadata.minLength! }));
        }

        if (metadata.maxLength && data.length > metadata.maxLength) {
            messages.push(new LocMessage("{name} cannot be longer than {length} characters", { length: metadata.maxLength! }));
        }
    }

    public get name(): string { return localize("string"); }
    public get key(): DataTypes { return DataTypes.String; }
}
