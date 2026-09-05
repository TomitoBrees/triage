-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PatientSymptom" ADD VALUE 'traumatological';
ALTER TYPE "PatientSymptom" ADD VALUE 'abdominal';
ALTER TYPE "PatientSymptom" ADD VALUE 'cardiac';
ALTER TYPE "PatientSymptom" ADD VALUE 'respiratory';
ALTER TYPE "PatientSymptom" ADD VALUE 'infection';
ALTER TYPE "PatientSymptom" ADD VALUE 'neurological';
ALTER TYPE "PatientSymptom" ADD VALUE 'urinary';
ALTER TYPE "PatientSymptom" ADD VALUE 'gynecological';
ALTER TYPE "PatientSymptom" ADD VALUE 'dermatological';
ALTER TYPE "PatientSymptom" ADD VALUE 'ent';
ALTER TYPE "PatientSymptom" ADD VALUE 'psychological';
ALTER TYPE "PatientSymptom" ADD VALUE 'intoxication';
ALTER TYPE "PatientSymptom" ADD VALUE 'general-weakness';
