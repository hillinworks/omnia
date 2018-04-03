import { MigrationInterface, QueryRunner } from "typeorm";

// tslint:disable:max-line-length
export class AddOmniaInfrastructures1522303992083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.query("CREATE TABLE `entry` (`key` varchar(1024) CHARACTER SET ascii COLLATE ascii_bin NOT NULL, `name` varchar(128) NOT NULL, `data` json NOT NULL, `parentKey` varchar(1024) CHARACTER SET ascii COLLATE ascii_bin, PRIMARY KEY(`key`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `property` (`key` varchar(1024) CHARACTER SET ascii COLLATE ascii_bin NOT NULL, `isObsolete` tinyint(4) NOT NULL DEFAULT 0, `name` varchar(128) NOT NULL, `description` text NOT NULL, `type` enum('String', Markdown', 'Number', 'Date', 'Enum') NOT NULL, `metadata` json NOT NULL, `comparability` enum('NotComparable', 'PlainComparable', 'BiggerBetter', 'SmallerBetter') NOT NULL DEFAULT 'NotComparable', `aspectKey` varchar(1024) CHARACTER SET ascii COLLATE ascii_bin, `isCollection` tinyint(4) NOT NULL DEFAULT 0, PRIMARY KEY(`key`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `aspect` (`key` varchar(1024) CHARACTER SET ascii COLLATE ascii_bin NOT NULL, `isObsolete` tinyint(4) NOT NULL DEFAULT 0, `name` varchar(128) NOT NULL, `description` text NOT NULL, PRIMARY KEY(`key`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `entry_aspects_aspect` (`entryKey` varchar(1024) CHARACTER SET ascii COLLATE ascii_bin NOT NULL, `aspectKey` varchar(1024) CHARACTER SET ascii COLLATE ascii_bin NOT NULL, PRIMARY KEY(`entryKey`, `aspectKey`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `entry` ADD CONSTRAINT `fk_49549a3a31645ebbbdd6dee8a6c` FOREIGN KEY (`parentKey`) REFERENCES `entry`(`key`)");
        await queryRunner.query("ALTER TABLE `property` ADD CONSTRAINT `fk_4280eaa8151c2efdbe4ea27e959` FOREIGN KEY (`aspectKey`) REFERENCES `aspect`(`key`)");
        await queryRunner.query("ALTER TABLE `entry_aspects_aspect` ADD CONSTRAINT `fk_3556b073ae1f698593feecc160e` FOREIGN KEY (`entryKey`) REFERENCES `entry`(`key`)");
        await queryRunner.query("ALTER TABLE `entry_aspects_aspect` ADD CONSTRAINT `fk_bf636bbd98c34a5e1557dd2bfa4` FOREIGN KEY (`aspectKey`) REFERENCES `aspect`(`key`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `entry_aspects_aspect` DROP FOREIGN KEY `fk_bf636bbd98c34a5e1557dd2bfa4`");
        await queryRunner.query("ALTER TABLE `entry_aspects_aspect` DROP FOREIGN KEY `fk_3556b073ae1f698593feecc160e`");
        await queryRunner.query("ALTER TABLE `property` DROP FOREIGN KEY `fk_4280eaa8151c2efdbe4ea27e959`");
        await queryRunner.query("ALTER TABLE `entry` DROP FOREIGN KEY `fk_49549a3a31645ebbbdd6dee8a6c`");
        await queryRunner.query("DROP TABLE `entry_aspects_aspect`");
        await queryRunner.query("DROP TABLE `aspect`");
        await queryRunner.query("DROP TABLE `property`");
        await queryRunner.query("DROP TABLE `entry`");
    }

}
