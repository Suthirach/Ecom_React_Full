/*
  Warnings:

  - You are about to drop the column `update` on the `order` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `update`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
