import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";

import { ICompositeKey } from "../../../core/CompositeKey";
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

    @OneToMany(type => Property, property => property.aspect, { eager: true, cascadeInsert: true, cascadeUpdate: false })
    public properties: Property[];

    @ManyToMany(type => Entry, entry => entry.aspects)
    public entries: Promise<Entry[]>;

    public get fullKey(): string {
        return ICompositeKey.toString(this);
    }

    public setKey(key: ICompositeKey): void {
        this.namespace = key.namespace;
        this.key = key.key;
    }
}
