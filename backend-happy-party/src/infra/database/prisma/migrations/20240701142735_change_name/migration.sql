/*
  Warnings:

  - You are about to drop the `ListPresentOnPresentsHot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ListPresentOnPresentsHot" DROP CONSTRAINT "ListPresentOnPresentsHot_listPresentId_fkey";

-- DropForeignKey
ALTER TABLE "ListPresentOnPresentsHot" DROP CONSTRAINT "ListPresentOnPresentsHot_presentsHotId_fkey";

-- DropTable
DROP TABLE "ListPresentOnPresentsHot";

-- CreateTable
CREATE TABLE "list_present_on_presents_hot" (
    "listPresentId" TEXT NOT NULL,
    "presentsHotId" TEXT NOT NULL,
    "assingnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "list_present_on_presents_hot_pkey" PRIMARY KEY ("listPresentId","presentsHotId")
);

-- AddForeignKey
ALTER TABLE "list_present_on_presents_hot" ADD CONSTRAINT "list_present_on_presents_hot_listPresentId_fkey" FOREIGN KEY ("listPresentId") REFERENCES "list_presents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list_present_on_presents_hot" ADD CONSTRAINT "list_present_on_presents_hot_presentsHotId_fkey" FOREIGN KEY ("presentsHotId") REFERENCES "presents_hot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
