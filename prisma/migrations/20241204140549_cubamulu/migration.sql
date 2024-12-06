/*
  Warnings:

  - Added the required column `due_date` to the `Peminjaman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `peminjaman` ADD COLUMN `due_date` DATE NOT NULL;
