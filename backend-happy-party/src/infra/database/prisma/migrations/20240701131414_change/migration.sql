/*
  Warnings:

  - You are about to drop the column `partyId` on the `type_parties` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "type_parties" DROP CONSTRAINT "type_parties_partyId_fkey";

-- DropIndex
DROP INDEX "type_parties_partyId_key";

-- AlterTable
ALTER TABLE "type_parties" DROP COLUMN "partyId";

-- AddForeignKey
ALTER TABLE "parties" ADD CONSTRAINT "parties_typePartyId_fkey" FOREIGN KEY ("typePartyId") REFERENCES "type_parties"("id") ON DELETE SET NULL ON UPDATE CASCADE;
