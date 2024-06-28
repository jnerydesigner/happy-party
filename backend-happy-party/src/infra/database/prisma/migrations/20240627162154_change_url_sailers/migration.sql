/*
  Warnings:

  - You are about to drop the column `url_sailler` on the `presents` table. All the data in the column will be lost.
  - You are about to drop the column `url_sailler` on the `presents_hot` table. All the data in the column will be lost.
  - Added the required column `url_sailers` to the `presents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_sailers` to the `presents_hot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "presents" DROP COLUMN "url_sailler",
ADD COLUMN     "url_sailers" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "presents_hot" DROP COLUMN "url_sailler",
ADD COLUMN     "url_sailers" TEXT NOT NULL;
