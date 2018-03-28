import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Comparability } from "../../../core/data/comparability";
import { DataTypes } from "../../../core/data/types/dataTypes";
import { Aspect } from "./Aspect";

@Entity()
export class Property {

    @PrimaryColumn("varchar", { length: 512, collation: "ascii_general_ci", charset: "ascii" })
    @IsNotEmpty()
    public namespace: string;

    @PrimaryColumn("varchar", { length: 64, collation: "ascii_general_ci", charset: "ascii" })
    @IsNotEmpty()
    public key: string;

    @Column("tinyint")
    public isObsolete: boolean;

    @Column("varchar", { length: 128 })
    @IsNotEmpty()
    public name: string;

    @Column("text")
    public description: string;

    @Column("enum", { enum: DataTypes })
    @IsNotEmpty()
    public type: DataTypes;

    @Column("json")
    public metadata: any;

    @Column("enum", { enum: Comparability, default: Comparability.NotComparable.toString() })
    public comparability: Comparability;

    @ManyToOne(type => Aspect)
    public aspect: Promise<Aspect>;
}
