-- DropForeignKey
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_businessId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerEngagement" DROP CONSTRAINT "CustomerEngagement_businessId_fkey";

-- DropForeignKey
ALTER TABLE "PlatformIntegration" DROP CONSTRAINT "PlatformIntegration_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Strategy" DROP CONSTRAINT "Strategy_businessId_fkey";
