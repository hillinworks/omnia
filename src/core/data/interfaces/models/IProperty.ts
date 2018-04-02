import { Comparability } from "../Comparability";
import { DataTypes } from "../dataTypes";
import { IAspect } from "./IAspect";

export interface IProperty {

    key: string;

    isObsolete: boolean;

    name: string;

    description: string;

    type: DataTypes;

    metadata: any;

    comparability: Comparability;

    aspectKey: string;

    aspect: IAspect;

}
