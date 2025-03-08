/*
  Warnings:

  - Added the required column `remaining` to the `expenditure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remaining` to the `totalExpenditure` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_expenditure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "remaining" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "departmentId" INTEGER NOT NULL,
    CONSTRAINT "expenditure_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_expenditure" ("amount", "createdAt", "departmentId", "id", "updatedAt", "year") SELECT "amount", "createdAt", "departmentId", "id", "updatedAt", "year" FROM "expenditure";
DROP TABLE "expenditure";
ALTER TABLE "new_expenditure" RENAME TO "expenditure";
CREATE TABLE "new_totalExpenditure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "remaining" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "totalExpenditure_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_totalExpenditure" ("amount", "companyId", "createdAt", "id", "updatedAt", "year") SELECT "amount", "companyId", "createdAt", "id", "updatedAt", "year" FROM "totalExpenditure";
DROP TABLE "totalExpenditure";
ALTER TABLE "new_totalExpenditure" RENAME TO "totalExpenditure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
