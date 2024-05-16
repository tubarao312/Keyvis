-- AlterTable
ALTER TABLE "Variable" ADD COLUMN "defaultValue" TEXT;

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "variableId" TEXT,
    CONSTRAINT "Tag_variableId_fkey" FOREIGN KEY ("variableId") REFERENCES "Variable" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
