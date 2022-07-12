/*
  Warnings:

  - Changed the type of `price` on the `food` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "food" ALTER COLUMN "desc" DROP NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;
