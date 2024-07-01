/*
  Warnings:

  - The primary key for the `list_present_on_presents_hot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `listPresentId` on the `list_present_on_presents_hot` table. All the data in the column will be lost.
  - You are about to drop the column `presentsHotId` on the `list_present_on_presents_hot` table. All the data in the column will be lost.
  - Added the required column `list_present_id` to the `list_present_on_presents_hot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `present_hot_id` to the `list_present_on_presents_hot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "list_present_on_presents_hot" DROP CONSTRAINT "list_present_on_presents_hot_listPresentId_fkey";

-- DropForeignKey
ALTER TABLE "list_present_on_presents_hot" DROP CONSTRAINT "list_present_on_presents_hot_presentsHotId_fkey";

-- AlterTable
ALTER TABLE "list_present_on_presents_hot" DROP CONSTRAINT "list_present_on_presents_hot_pkey",
DROP COLUMN "listPresentId",
DROP COLUMN "presentsHotId",
ADD COLUMN     "list_present_id" TEXT NOT NULL,
ADD COLUMN     "present_hot_id" TEXT NOT NULL,
ADD CONSTRAINT "list_present_on_presents_hot_pkey" PRIMARY KEY ("list_present_id", "present_hot_id");

-- AddForeignKey
ALTER TABLE "list_present_on_presents_hot" ADD CONSTRAINT "list_present_on_presents_hot_list_present_id_fkey" FOREIGN KEY ("list_present_id") REFERENCES "list_presents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_present_on_presents_hot" ADD CONSTRAINT "list_present_on_presents_hot_present_hot_id_fkey" FOREIGN KEY ("present_hot_id") REFERENCES "presents_hot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
