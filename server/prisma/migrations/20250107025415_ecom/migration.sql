/*
  Warnings:

  - You are about to drop the column `descrtiption` on the `product` table. All the data in the column will be lost.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `descrtiption`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    MODIFY `sold` INTEGER NOT NULL DEFAULT 0;
