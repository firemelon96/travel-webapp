/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Bookings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Bookings" ADD COLUMN     "paymentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_paymentId_key" ON "Bookings"("paymentId");

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
