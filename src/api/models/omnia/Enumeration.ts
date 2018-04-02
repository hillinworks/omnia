import { Column, Entity, PrimaryColumn } from "typeorm";

import { IEnumValue } from "../../../core/data/interfaces/IEnumValue";

@Entity()
export class Enumeration {
    @PrimaryColumn("varchar", { length: 1024, collation: "ascii_bin", charset: "ascii" })
    public key: string;

    @Column("json")
    public values: IEnumValue[];
}
