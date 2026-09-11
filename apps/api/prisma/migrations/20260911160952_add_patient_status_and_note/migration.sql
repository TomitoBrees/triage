-- CreateEnum
CREATE TYPE "PatientStatus" AS ENUM ('waiting', 'seen', 'released');

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "iaoNote" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "status" "PatientStatus" NOT NULL DEFAULT 'waiting';
