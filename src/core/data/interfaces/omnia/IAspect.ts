import { IEntry } from "./IEntry";
import { IProperty } from "./IProperty";

export interface IAspect {
    key: string;
    isObsolete: boolean;
    name: string;
    description: string;
    properties: IProperty[];
    entries: IEntry[];
}
