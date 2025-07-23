// DB schema using sqlite
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let db;
const dbPath = path.join(__dirname, "../db/parcel.db");

const initializeDb = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });


        await db.run(`CREATE TABLE IF NOT EXISTS parcels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender TEXT NOT NULL,
        receiver TEXT NOT NULL,
        trackingId TEXT UNIQUE NOT NULL,
        status TEXT NOT NULL
    ); `)
        console.log("server started");
    } catch (e) {
        console.log(`Db error ${e.message}`);
    }

}

module.exports = { initializeDb, getDb: () => db };