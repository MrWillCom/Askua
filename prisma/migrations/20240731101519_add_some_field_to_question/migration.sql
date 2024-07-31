-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "isReplied" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT true;
