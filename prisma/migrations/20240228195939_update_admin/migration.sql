/*
  Warnings:

  - You are about to drop the column `is_admin` on the `Shop` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SHOP', 'ADMIN');

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "is_admin";
ALTER TABLE "Shop" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'SHOP';
