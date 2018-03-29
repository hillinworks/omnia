import { localize } from "../../localization/localize";
import { DataTypes } from "../interfaces/dataTypes";
import { RegisteredDataType } from "./dataTypeFactory";
import { StringType } from "./StringType";

@RegisteredDataType
export class MarkdownType extends StringType {
    public get name(): string { return localize("markdown"); }
    public get key(): DataTypes { return DataTypes.Markdown; }
}
