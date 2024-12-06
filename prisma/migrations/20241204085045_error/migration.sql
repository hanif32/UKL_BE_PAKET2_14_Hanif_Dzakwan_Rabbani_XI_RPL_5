/*
  Warnings:

  - You are about to drop the column `nama_barang` on the `barang` table. All the data in the column will be lost.
  - Added the required column `name` to the `Barang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `barang` DROP COLUMN `nama_barang`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
