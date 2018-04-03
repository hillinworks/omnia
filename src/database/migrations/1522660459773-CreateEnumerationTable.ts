import { MigrationInterface, QueryRunner } from "typeorm";

// tslint:disable:max-line-length
export class CreateEnumerationTable1522660459773 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `enumeration` (`key` varchar(1024) CHARACTER SET ascii COLLATE ascii_bin NOT NULL, `isObsolete` tinyint(4) NOT NULL DEFAULT 0, `name` varchar(128) NOT NULL, `description` text NOT NULL, `values` json NOT NULL, PRIMARY KEY(`key`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `enumeration`");
    }

}
