/*
  Warnings:

  - You are about to drop the column `name` on the `Business` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "name",
ADD COLUMN     "businessName" TEXT,
ADD COLUMN     "companyName" TEXT;
