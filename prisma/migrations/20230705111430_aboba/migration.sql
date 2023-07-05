/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Dialogue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dialogue_id_key" ON "Dialogue"("id");
