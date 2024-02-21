//list of skills and frequency
import db from '../database.js'

const createSkillFrequencyTable = () => {
    const TABLE = `
        CREATE TABLE IF NOT EXISTS
        skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            skill TEXT UNIQUE NOT NULL,
            frequency NUMBER NOT NULL
        )
    `

    return new Promise((resolve, reject) => {
        db.run(TABLE, (err) => {
            if (err) reject (err)
            resolve("Skill Table Initialized")
        })
    })
}

export default createSkillFrequencyTable