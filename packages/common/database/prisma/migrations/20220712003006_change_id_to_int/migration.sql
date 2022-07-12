/*
  Warnings:

  - The primary key for the `address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `food` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `food` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `menuCategoryId` column on the `food` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `addressId` column on the `info_contact` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `menu_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `menu_category` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "food" DROP CONSTRAINT "food_menuCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "info_contact" DROP CONSTRAINT "info_contact_addressId_fkey";

-- AlterTable
ALTER TABLE "address" DROP CONSTRAINT "address_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "address_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "food" DROP CONSTRAINT "food_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "menuCategoryId",
ADD COLUMN     "menuCategoryId" INTEGER,
ADD CONSTRAINT "food_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "info_contact" DROP COLUMN "addressId",
ADD COLUMN     "addressId" INTEGER;

-- AlterTable
ALTER TABLE "menu_category" DROP CONSTRAINT "menu_category_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "menu_category_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "info_contact" ADD CONSTRAINT "info_contact_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food" ADD CONSTRAINT "food_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "menu_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
