import { localize } from "../../localization/localize";
import { LocMessage } from "../../localization/locMessage";
import { DataTypes } from "../interfaces/dataTypes";
import { IEnumMetadata } from "../interfaces/metadata/IEnumMetadata";
import { NotComparableError } from "../NotComparableError";
import { DataType } from "./DataType";
import { RegisteredDataType } from "./dataTypeFactory";

@RegisteredDataType
export class EnumType extends DataType<string, IEnumMetadata> {

    protected compareImpl(a: string, b: string): number {
        throw new NotComparableError();
    }

    protected coerceImpl(data: string, metadata: IEnumMetadata): string {
        return data;
    }

    protected validateImpl(data: string, metadata: IEnumMetadata, messages: LocMessage[]): void {
        // if (metadata.minLength && data.length < metadata.minLength) {
        //     messages.push(new LocMessage("{name} must have at least {length} characters", { length: metadata.minLength! }));
        // }

        // if (metadata.maxLength && data.length > metadata.maxLength) {
        //     messages.push(new LocMessage("{name} cannot be longer than {length} characters", { length: metadata.maxLength! }));
        // }
    }

    public get name(): string { return localize("enum"); }
    public get key(): DataTypes { return DataTypes.Enum; }
}
