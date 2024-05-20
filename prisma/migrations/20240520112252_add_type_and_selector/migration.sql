/*
  Warnings:

  - Added the required column `selector` to the `Variable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Variable` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Variable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "selector" TEXT NOT NULL,
    "defaultValue" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Variable" ("createdAt", "defaultValue", "description", "id", "name", "updatedAt", "value") SELECT "createdAt", "defaultValue", "description", "id", "name", "updatedAt", "value" FROM "Variable";
DROP TABLE "Variable";
ALTER TABLE "new_Variable" RENAME TO "Variable";
CREATE UNIQUE INDEX "Variable_name_key" ON "Variable"("name");
PRAGMA foreign_key_check("Variable");
PRAGMA foreign_keys=ON;
