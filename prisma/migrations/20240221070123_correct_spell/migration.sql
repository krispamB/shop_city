/*
  Warnings:

  - You are about to drop the column `Shop_name` on the `Shop` table. All the data in the column will be lost.
  - Added the required column `shop_name` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "Shop_name";
ALTER TABLE "Shop" ADD COLUMN     "shop_name" STRING NOT NULL;
