-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "sharedAnswers" JSONB,
ADD COLUMN     "specificAnswers" JSONB;
