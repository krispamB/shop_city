-- CreateEnum
CREATE TYPE "Category" AS ENUM ('CATEGORY_1', 'CATEGORY_2', 'CATEGORY_3', 'SERVICES');

-- CreateTable
CREATE TABLE "Shop" (
    "id" STRING NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" STRING NOT NULL,
    "hash" STRING NOT NULL,
    "Shop_name" STRING NOT NULL,
    "shop_cover_image" STRING NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'SERVICES',
    "is_admin" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" STRING NOT NULL,
    "social_network" STRING NOT NULL,
    "social_url" STRING NOT NULL,
    "shop_id" STRING NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" STRING NOT NULL,
    "phone_number" STRING NOT NULL,
    "shop_number" INT4 NOT NULL,
    "images" STRING[],
    "shop_location" STRING,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_email_key" ON "Shop"("email");

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
