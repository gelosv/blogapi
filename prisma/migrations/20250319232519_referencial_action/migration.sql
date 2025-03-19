-- DropForeignKey
ALTER TABLE `userlikedpost` DROP FOREIGN KEY `UserLikedPost_postId_fkey`;

-- AddForeignKey
ALTER TABLE `UserLikedPost` ADD CONSTRAINT `UserLikedPost_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
