import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Comparability } from "../../../core/data/comparability";
import { DataTypes } from "../../../core/data/types/dataTypes";
import { Aspect } from "./Aspect";

@Entity()
export class Property {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column("varchar", { length: 64 })
    @IsNotEmpty()
    public key: string;

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
    public aspect: Aspect;
}
