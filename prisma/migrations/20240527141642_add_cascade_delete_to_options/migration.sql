-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DropdownOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "variableId" TEXT NOT NULL,
    CONSTRAINT "DropdownOption_variableId_fkey" FOREIGN KEY ("variableId") REFERENCES "Variable" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DropdownOption" ("id", "value", "variableId") SELECT "id", "value", "variableId" FROM "DropdownOption";
DROP TABLE "DropdownOption";
ALTER TABLE "new_DropdownOption" RENAME TO "DropdownOption";
PRAGMA foreign_key_check("DropdownOption");
PRAGMA foreign_keys=ON;
