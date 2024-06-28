/*
  Warnings:

  - Added the required column `image` to the `presents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_sailler` to the `presents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "presents" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "url_sailler" TEXT NOT NULL;
