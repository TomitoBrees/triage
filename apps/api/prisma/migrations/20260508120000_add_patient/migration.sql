-- CreateEnum
CREATE TYPE "PatientSymptom" AS ENUM (
    'chest-pain',
    'breathing-difficulty',
    'sudden-speech-difficulty',
    'facial-drooping',
    'severe-bleeding',
    'swelling-face-lips-throat',
    'fainting',
    'weakness-arm-leg',
    'confusion',
    'head-injury',
    'sucidal-ideation',
    'abdominal-pain-pregnant'
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "french" INTEGER NOT NULL,
    "symptom" "PatientSymptom",

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);
