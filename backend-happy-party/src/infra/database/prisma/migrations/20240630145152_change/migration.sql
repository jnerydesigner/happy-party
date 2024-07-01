/*
  Warnings:

  - You are about to drop the column `type_party_id` on the `parties` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "parties" DROP CONSTRAINT "parties_type_party_id_fkey";

-- DropIndex
DROP INDEX "parties_type_party_id_key";

-- AlterTable
ALTER TABLE "parties" DROP COLUMN "type_party_id";

-- AlterTable
ALTER TABLE "type_parties" ADD COLUMN     "partyId" TEXT;

-- AddForeignKey
ALTER TABLE "type_parties" ADD CONSTRAINT "type_parties_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "parties"("id") ON DELETE SET NULL ON UPDATE CASCADE;
