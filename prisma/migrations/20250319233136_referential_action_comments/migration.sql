-- DropForeignKey
ALTER TABLE `postcomments` DROP FOREIGN KEY `PostComments_postId_fkey`;

-- DropIndex
DROP INDEX `PostComments_postId_fkey` ON `postcomments`;

-- AddForeignKey
ALTER TABLE `PostComments` ADD CONSTRAINT `PostComments_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
