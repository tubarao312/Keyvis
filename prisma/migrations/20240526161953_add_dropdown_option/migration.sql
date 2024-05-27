/*
  Warnings:

  - You are about to drop the `DropdownOptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DropdownOptions";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "DropdownOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL,
    "variableId" TEXT NOT NULL,
    CONSTRAINT "DropdownOption_variableId_fkey" FOREIGN KEY ("variableId") REFERENCES "Variable" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DropdownOption_variableId_selected_key" ON "DropdownOption"("variableId", "selected");
