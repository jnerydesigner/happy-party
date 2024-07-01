/*
  Warnings:

  - You are about to drop the `presents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "presents" DROP CONSTRAINT "presents_list_presents_id_fkey";

-- DropTable
DROP TABLE "presents";

-- CreateTable
CREATE TABLE "ListPresentOnPresentsHot" (
    "listPresentId" TEXT NOT NULL,
    "presentsHotId" TEXT NOT NULL,
    "assingnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "ListPresentOnPresentsHot_pkey" PRIMARY KEY ("listPresentId","presentsHotId")
);

-- AddForeignKey
ALTER TABLE "ListPresentOnPresentsHot" ADD CONSTRAINT "ListPresentOnPresentsHot_listPresentId_fkey" FOREIGN KEY ("listPresentId") REFERENCES "list_presents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListPresentOnPresentsHot" ADD CONSTRAINT "ListPresentOnPresentsHot_presentsHotId_fkey" FOREIGN KEY ("presentsHotId") REFERENCES "presents_hot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
