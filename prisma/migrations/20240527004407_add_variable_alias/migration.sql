/*
  Warnings:

  - The required column `alias` was added to the `Variable` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Variable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "selector" TEXT NOT NULL,
    "defaultValue" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Variable" ("createdAt", "defaultValue", "description", "id", "name", "selector", "type", "updatedAt", "value") SELECT "createdAt", "defaultValue", "description", "id", "name", "selector", "type", "updatedAt", "value" FROM "Variable";
DROP TABLE "Variable";
ALTER TABLE "new_Variable" RENAME TO "Variable";
CREATE UNIQUE INDEX "Variable_name_key" ON "Variable"("name");
CREATE UNIQUE INDEX "Variable_alias_key" ON "Variable"("alias");
PRAGMA foreign_key_check("Variable");
PRAGMA foreign_keys=ON;
