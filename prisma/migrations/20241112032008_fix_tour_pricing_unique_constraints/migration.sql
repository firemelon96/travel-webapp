/*
  Warnings:

  - A unique constraint covering the columns `[tourId,pricingType,minGroupSize,maxGroupSize]` on the table `TourPricing` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TourPricing_tourId_key";

-- CreateIndex
CREATE UNIQUE INDEX "TourPricing_tourId_pricingType_minGroupSize_maxGroupSize_key" ON "TourPricing"("tourId", "pricingType", "minGroupSize", "maxGroupSize");
