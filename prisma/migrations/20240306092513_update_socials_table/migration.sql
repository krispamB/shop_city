/*
  Warnings:

  - You are about to drop the column `id` on the `Social` table. All the data in the column will be lost.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_Social" (
    "social_network" STRING NOT NULL,
    "social_url" STRING NOT NULL,
    "shop_id" STRING NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("shop_id","social_network")
);
INSERT INTO "_prisma_new_Social" ("shop_id","social_network","social_url") SELECT "shop_id","social_network","social_url" FROM "Social";
DROP TABLE "Social" CASCADE;
ALTER TABLE "_prisma_new_Social" RENAME TO "Social";
ALTER TABLE "Social" ADD CONSTRAINT "Social_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
