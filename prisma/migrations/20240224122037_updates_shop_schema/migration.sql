/*
  Warnings:

  - A unique constraint covering the columns `[shop_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shop_id` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "shop_id" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_shop_id_key" ON "Profile"("shop_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
