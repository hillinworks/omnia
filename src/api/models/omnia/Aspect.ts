import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";

import { Entry } from "./Entry";
import { Property } from "./Property";

@Entity()
export class Aspect {

    @PrimaryColumn("varchar", { length: 1024, collation: "ascii_bin", charset: "ascii" })
    public key: string;

    @Column("tinyint")
    public isObsolete: boolean;

    @Column("varchar", { length: 128 })
    @IsNotEmpty()
    public name: string;

    @Column("text")
    public description: string;

    @OneToMany(type => Property, property => property.aspect, { eager: true, cascadeInsert: true, cascadeUpdate: false })
    public properties: Property[];

    @ManyToMany(type => Entry, entry => entry.aspects)
    public entries: Promise<Entry[]>;
}
