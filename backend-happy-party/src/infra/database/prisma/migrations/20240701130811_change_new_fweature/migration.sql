/*
  Warnings:

  - A unique constraint covering the columns `[partyId]` on the table `type_parties` will be added. If there are existing duplicate values, this will fail.
  - Made the column `partyId` on table `type_parties` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "type_parties" DROP CONSTRAINT "type_parties_partyId_fkey";

-- AlterTable
ALTER TABLE "parties" ADD COLUMN     "typePartyId" TEXT;

-- AlterTable
ALTER TABLE "type_parties" ALTER COLUMN "partyId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "type_parties_partyId_key" ON "type_parties"("partyId");

-- AddForeignKey
ALTER TABLE "type_parties" ADD CONSTRAINT "type_parties_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
