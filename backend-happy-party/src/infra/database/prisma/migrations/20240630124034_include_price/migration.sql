-- AlterTable
ALTER TABLE "presents" ADD COLUMN     "price" DECIMAL(10,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "presents_hot" ADD COLUMN     "price" DECIMAL(10,2) NOT NULL DEFAULT 0;
