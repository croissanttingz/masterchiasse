/*
  Warnings:

  - You are about to drop the `articles` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."chiasse_type" AS ENUM ('text', 'image', 'video', 'external_link');

-- DropTable
DROP TABLE "public"."articles";

-- CreateTable
CREATE TABLE "public"."chiasses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "type" "public"."chiasse_type" NOT NULL DEFAULT 'text',
    "countVotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chiasses_pkey" PRIMARY KEY ("id")
);
