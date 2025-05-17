-- CreateTable
CREATE TABLE "Trade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commodity" TEXT NOT NULL,
    "traderId" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL
);
