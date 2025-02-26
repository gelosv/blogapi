-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_categorieId_fkey`;

-- DropIndex
DROP INDEX `Post_categorieId_fkey` ON `post`;

-- AlterTable
ALTER TABLE `post` MODIFY `categorieId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categorieId_fkey` FOREIGN KEY (`categorieId`) REFERENCES `Categorie`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
