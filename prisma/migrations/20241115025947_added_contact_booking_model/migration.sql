/*
  Warnings:

  - Added the required column `contactName` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookings" ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactName" TEXT NOT NULL,
ADD COLUMN     "contactNumber" TEXT;
