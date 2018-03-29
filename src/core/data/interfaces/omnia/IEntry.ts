import { IEntryData } from "../IEntryData";
import { IAspect } from "./IAspect";

export interface IEntry {

    key: string;

    aspects: IAspect[];

    data: IEntryData;

    children: Promise<IEntry[]>;

    parent: Promise<IEntry>;
}
