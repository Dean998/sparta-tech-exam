/*
  Warnings:

  - You are about to alter the column `traderId` on the `Trade` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- CreateTable
CREATE TABLE "Trader" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commodity" TEXT NOT NULL,
    "traderId" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL,
    CONSTRAINT "Trade_traderId_fkey" FOREIGN KEY ("traderId") REFERENCES "Trader" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Trade" ("commodity", "id", "price", "quantity", "timestamp", "traderId") SELECT "commodity", "id", "price", "quantity", "timestamp", "traderId" FROM "Trade";
DROP TABLE "Trade";
ALTER TABLE "new_Trade" RENAME TO "Trade";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Trader_email_key" ON "Trader"("email");
