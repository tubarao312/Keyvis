-- CreateTable
CREATE TABLE "DropdownOptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL,
    "variableId" TEXT NOT NULL,
    CONSTRAINT "DropdownOptions_variableId_fkey" FOREIGN KEY ("variableId") REFERENCES "Variable" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DropdownOptions_variableId_selected_key" ON "DropdownOptions"("variableId", "selected");
