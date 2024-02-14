import sqlite3 from "sqlite3"

const db = new sqlite3.Database("hackers.db")

export default db