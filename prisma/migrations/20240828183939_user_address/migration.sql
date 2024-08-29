/*
  Warnings:

  - You are about to drop the column `state` on the `UserAddress` table. All the data in the column will be lost.
  - Made the column `city` on table `UserAddress` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "state",
ALTER COLUMN "city" SET NOT NULL;
