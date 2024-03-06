/*
  Warnings:

  - The values [CATEGORY_1,CATEGORY_2,CATEGORY_3] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "Category" ADD VALUE 'HOME';
ALTER TYPE "Category" ADD VALUE 'TECH';
ALTER TYPE "Category" ADD VALUE 'BEAUTY';
ALTER TYPE "Category" ADD VALUE 'WELLNESS';
ALTER TYPE "Category" ADD VALUE 'CAFE';
ALTER TYPE "Category" ADD VALUE 'FASHION';
ALTER TYPE "Category" ADD VALUE 'KIDS';
ALTER TYPE "Category" ADD VALUE 'STATIONARY';
ALTER TYPE "Category" ADD VALUE 'HYPERMARKET';
ALTER TYPE "Category"DROP VALUE 'CATEGORY_1';
ALTER TYPE "Category"DROP VALUE 'CATEGORY_2';
ALTER TYPE "Category"DROP VALUE 'CATEGORY_3';
