/*
  Warnings:

  - Made the column `name` on table `Box` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Box" ALTER COLUMN "name" SET NOT NULL;
