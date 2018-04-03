import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

import { IEnumValue } from "../../../core/data/interfaces/IEnumValue";

@Entity()
export class Enumeration {
    @PrimaryColumn("varchar", { length: 1024, collation: "ascii_bin", charset: "ascii" })
    public key: string;

    @Column("tinyint", { default: false })
    public isObsolete: boolean;

    @Column("varchar", { length: 128 })
    @IsNotEmpty()
    public name: string;

    @Column("text", { nullable: true })
    public description: string;

    @Column("json")
    public values: IEnumValue[];
}
