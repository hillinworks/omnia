import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Comparability } from "../../../core/data/Comparability";
import { DataTypes } from "../../../core/data/types/dataTypes";
import { Aspect } from "./Aspect";

@Entity()
export class Property {

    @PrimaryColumn("varchar", { length: 1024, collation: "ascii_bin", charset: "ascii" })
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

    @Column({ type: "varchar", nullable: true, length: 1024, collation: "ascii_bin", charset: "ascii" })
    public aspectKey: string;

    @ManyToOne(type => Aspect)
    public aspect: Promise<Aspect>;

}
