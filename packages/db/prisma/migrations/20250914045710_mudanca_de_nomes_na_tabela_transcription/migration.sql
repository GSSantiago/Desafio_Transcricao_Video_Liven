/*
  Warnings:

  - You are about to drop the column `durationSec` on the `Transcription` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Transcription` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `User` table. All the data in the column will be lost.
  - Added the required column `durationInSeconds` to the `Transcription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileSize` to the `Transcription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Transcription" DROP COLUMN "durationSec",
DROP COLUMN "size",
ADD COLUMN     "durationInSeconds" INTEGER NOT NULL,
ADD COLUMN     "fileSize" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "nome",
ADD COLUMN     "name" TEXT NOT NULL;
