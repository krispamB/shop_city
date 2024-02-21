/*
  Warnings:

  - Added the required column `shop_owner` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "shop_owner" STRING NOT NULL;
