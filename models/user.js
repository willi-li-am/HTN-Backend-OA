/*
data to store:
{
    "name": <string>,
    "company": <string>,
    "email": <string>,
    "phone": <string>,
    "skills": [
        {
        "skill": <string>,
        "rating": <int>
        }
    ]
}
*/

import db from '../database.js'

const createUserTable = () => {
    const TABLE = `
        CREATE TABLE IF NOT EXISTS
        users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            company TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT UNIQUE NOT NULL,
            skills TEXT NOT NULL
        )
    `

    return new Promise ((resolve, reject) => {
        db.run(TABLE, (err) => {
            if (err) reject(err);
            else resolve("User Table Initialized");
        })
    })
}

export default createUserTable