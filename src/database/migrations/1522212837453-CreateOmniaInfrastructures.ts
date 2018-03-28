import { MigrationInterface, QueryRunner } from "typeorm";

// tslint:disable:max-line-length
export class CreateOmniaInfrastructures1522212837453 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.query("CREATE TABLE `entry` (`namespace` varchar(512) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL, `key` varchar(64) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL, `data` json NOT NULL, `parentNamespace` varchar(512) CHARACTER SET ascii COLLATE ascii_general_ci, `parentKey` varchar(64) CHARACTER SET ascii COLLATE ascii_general_ci, PRIMARY KEY(`namespace`, `key`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `property` (`id` varchar(255) NOT NULL PRIMARY KEY, `key` varchar(64) NOT NULL, `name` varchar(128) NOT NULL, `description` text NOT NULL, `type` enum('string', 'identifier', 'markdown', 'integer', 'decimal', 'reference', 'year', 'date', '0', '1', '2', '3', '4', '5', '6', '7') NOT NULL, `metadata` json NOT NULL, `comparability` enum('NotComparable', 'BiggerBetter', 'SmallerBetter', '0', '1', '2') NOT NULL DEFAULT '0', `aspectNamespace` varchar(512) CHARACTER SET ascii COLLATE ascii_general_ci, `aspectKey` varchar(64) CHARACTER SET ascii COLLATE ascii_general_ci) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `aspect` (`namespace` varchar(512) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL, `key` varchar(64) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL, `name` varchar(128) NOT NULL, `description` text NOT NULL, PRIMARY KEY(`namespace`, `key`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `entry_aspects_aspect` (`entryNamespace` varchar(512) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL, `entryKey` varchar(64) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL, `aspectNamespace` varchar(512) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL, `aspectKey` varchar(64) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL, PRIMARY KEY(`entryNamespace`, `entryKey`, `aspectNamespace`, `aspectKey`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `entry` ADD CONSTRAINT `fk_2d513c4f95dea0053db850cc4d3` FOREIGN KEY (`parentNamespace`, `parentKey`) REFERENCES `entry`(`namespace`,`key`)");
        await queryRunner.query("ALTER TABLE `property` ADD CONSTRAINT `fk_a471a2f4ddfd66ff37df59809c2` FOREIGN KEY (`aspectNamespace`, `aspectKey`) REFERENCES `aspect`(`namespace`,`key`)");
        await queryRunner.query("ALTER TABLE `omnia`.`pet` ADD CONSTRAINT `fk_29afab316d1eccbc4b52ba2e8c8` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `entry_aspects_aspect` ADD CONSTRAINT `fk_8b3ea6aa2ec3ee4a24b62d683b2` FOREIGN KEY (`entryNamespace`, `entryKey`) REFERENCES `entry`(`namespace`,`key`)");
        await queryRunner.query("ALTER TABLE `entry_aspects_aspect` ADD CONSTRAINT `fk_28ba696e97eff5cbdc309ccdccc` FOREIGN KEY (`aspectNamespace`, `aspectKey`) REFERENCES `aspect`(`namespace`,`key`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `entry_aspects_aspect` DROP FOREIGN KEY `fk_28ba696e97eff5cbdc309ccdccc`");
        await queryRunner.query("ALTER TABLE `entry_aspects_aspect` DROP FOREIGN KEY `fk_8b3ea6aa2ec3ee4a24b62d683b2`");
        await queryRunner.query("ALTER TABLE `omnia`.`pet` DROP FOREIGN KEY `fk_29afab316d1eccbc4b52ba2e8c8`");
        await queryRunner.query("ALTER TABLE `property` DROP FOREIGN KEY `fk_a471a2f4ddfd66ff37df59809c2`");
        await queryRunner.query("ALTER TABLE `entry` DROP FOREIGN KEY `fk_2d513c4f95dea0053db850cc4d3`");
        await queryRunner.query("DROP TABLE `entry_aspects_aspect`");
        await queryRunner.query("DROP TABLE `aspect`");
        await queryRunner.query("DROP TABLE `property`");
        await queryRunner.query("DROP TABLE `entry`");
    }

}
