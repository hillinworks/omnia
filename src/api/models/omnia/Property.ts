import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Comparability } from "../../../core/data/interfaces/Comparability";
import { DataTypes } from "../../../core/data/interfaces/dataTypes";
import { Aspect } from "./Aspect";

@Entity()
export class Property {

    @PrimaryColumn("varchar", { length: 1024, collation: "ascii_bin", charset: "ascii" })
    public key: string;

    @Column("tinyint", { default: false })
    @IsNotEmpty()
    public isObsolete: boolean;

    @Column("varchar", { length: 128 })
    @IsNotEmpty()
    public name: string;

    @Column("text", { nullable: true })
    public description: string;

    @Column("enum", { enum: DataTypes })
    @IsNotEmpty()
    public type: DataTypes;

    @Column("tinyint", { default: 0 })
    @IsNotEmpty()
    public isCollection: boolean;

    @Column("json", { nullable: true })
    public metadata: any;

    @Column("enum", { enum: Comparability, default: Comparability.NotComparable.toString() })
    public comparability: Comparability;

    @Column({ type: "varchar", nullable: true, length: 1024, collation: "ascii_bin", charset: "ascii" })
    public aspectKey: string;

    @ManyToOne(type => Aspect)
    public aspect: Promise<Aspect>;

}
