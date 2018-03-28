import { localize } from "../../localization/localize";
import { RegisteredDataType } from "./dataTypeFactory";
import { DataTypes } from "./dataTypes";
import { StringType } from "./stringType";

@RegisteredDataType
export class MarkdownType extends StringType {
    public get name(): string { return localize("markdown"); }
    public get key(): DataTypes { return DataTypes.markdown; }
}
