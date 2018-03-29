import {
    Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn
} from "typeorm";

import { IEntryData } from "../../../core/data/interfaces/IEntryData";
import { Aspect } from "./Aspect";

@Entity()
export class Entry {

    @PrimaryColumn("varchar", { length: 1024, collation: "ascii_bin", charset: "ascii" })
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
