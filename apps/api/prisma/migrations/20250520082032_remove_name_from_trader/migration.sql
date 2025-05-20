/*
  Warnings:

  - You are about to drop the column `name` on the `Trader` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trader" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Trader" ("createdAt", "email", "id", "password", "updatedAt") SELECT "createdAt", "email", "id", "password", "updatedAt" FROM "Trader";
DROP TABLE "Trader";
ALTER TABLE "new_Trader" RENAME TO "Trader";
CREATE UNIQUE INDEX "Trader_email_key" ON "Trader"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
