import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";

import { Entry } from "./Entry";
import { Property } from "./Property";

@Entity()
export class Aspect {

    @PrimaryColumn("varchar", { length: 512, collation: "ascii_general_ci", charset: "ascii" })
    public namespace: string;

    @PrimaryColumn("varchar", { length: 64, collation: "ascii_general_ci", charset: "ascii" })
    @IsNotEmpty()
    public key: string;

    @Column("varchar", { length: 128 })
    @IsNotEmpty()
    public name: string;

    @Column("text")
    public description: string;

    @OneToMany(type => Property, property => property.aspect)
    public properties: Property[];

    @ManyToMany(type => Entry, entry => entry.aspects)
    public entries: Entry[];

}
