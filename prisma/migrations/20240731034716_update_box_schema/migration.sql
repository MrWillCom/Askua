-- AlterTable
ALTER TABLE "Box" ADD COLUMN     "descption" TEXT,
ADD COLUMN     "open" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT true;
