import { IsNotEmpty } from "class-validator";
import {
    Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn
} from "typeorm";

import { IEntryData } from "../../../core/data/IEntryData";
import { Aspect } from "./Aspect";

@Entity()
export class Entry {

    @PrimaryColumn("varchar", { length: 512, collation: "ascii_general_ci", charset: "ascii" })
    public namespace: string;

    @PrimaryColumn("varchar", { length: 64, collation: "ascii_general_ci", charset: "ascii" })
    @IsNotEmpty()
    public key: string;

    @ManyToMany(type => Aspect, { eager: true })
    @JoinTable()
    public aspects: Aspect[];

    @Column("json")
    public data: IEntryData;

    @OneToMany(type => Entry, entry => entry.parent)
    public children: Promise<Entry[]>;

    @ManyToOne(type => Entry, entry => entry.children)
    public parent: Promise<Entry>;
}
