/*
  Warnings:

  - Added the required column `companyId` to the `budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `expenditure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalExpenditureId` to the `expenditure` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_budget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "total" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "companyId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "budget_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "budget_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_budget" ("createdAt", "description", "id", "name", "price", "quantity", "status", "total", "updatedAt", "userId") SELECT "createdAt", "description", "id", "name", "price", "quantity", "status", "total", "updatedAt", "userId" FROM "budget";
DROP TABLE "budget";
ALTER TABLE "new_budget" RENAME TO "budget";
CREATE TABLE "new_expenditure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "remaining" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "totalExpenditureId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,
    CONSTRAINT "expenditure_totalExpenditureId_fkey" FOREIGN KEY ("totalExpenditureId") REFERENCES "totalExpenditure" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "expenditure_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "expenditure_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_expenditure" ("amount", "createdAt", "departmentId", "id", "remaining", "updatedAt", "year") SELECT "amount", "createdAt", "departmentId", "id", "remaining", "updatedAt", "year" FROM "expenditure";
DROP TABLE "expenditure";
ALTER TABLE "new_expenditure" RENAME TO "expenditure";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
