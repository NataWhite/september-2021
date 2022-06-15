/*
  Warnings:

  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - Added the required column `likes` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `likes` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `city`,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `status` BOOLEAN NULL DEFAULT false,
    MODIFY `age` INTEGER NULL;
