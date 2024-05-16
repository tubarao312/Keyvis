/*
  Warnings:

  - You are about to drop the column `variableId` on the `Tag` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_TagToVariable" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TagToVariable_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TagToVariable_B_fkey" FOREIGN KEY ("B") REFERENCES "Variable" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL
);
INSERT INTO "new_Tag" ("color", "id", "name") SELECT "color", "id", "name" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
PRAGMA foreign_key_check("Tag");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_TagToVariable_AB_unique" ON "_TagToVariable"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToVariable_B_index" ON "_TagToVariable"("B");
