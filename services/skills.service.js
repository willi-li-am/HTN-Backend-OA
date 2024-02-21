import db from "../database.js"
import { getUser } from "./users.service.js"

export const isValidSkills = (skills) => {
    if (skills.length == 0) return false
    for (let i in skills) {
        if (!(skills[i].skill && skills[i].rating)) {
            return false
        }
    }
    return true
}

export const createSkill = (skill) => {
    const SQL = `
        INSERT INTO skills
        (name, frequency)
        VALUES
        (?, ?)
        ON CONFLICT (name)
        DO UPDATE SET frequency = frequency + 1
    `

    return new Promise((resolve, reject) => {
        db.run(SQL, [skill, 1], (err) => {
            if (err) reject(err)
            resolve("Created skill" + skill)
        })
    })
}

export const getSkills = () => {
    const SQL = `
        SELECT * FROM skills
    `

    return new Promise((resolve, reject) => {
        db.all(SQL, (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

export const getFilteredSkills = (min, max) => {
    //check if min and max are valid numbers
    const minFreq = parseInt(min, 10);
    const maxFreq = parseInt(max, 10);

    if (isNaN(minFreq) || isNaN(maxFreq) || minFreq < 0 || minFreq > maxFreq) {
        throw new Error("Bad Input")
    }

    const SQL = `
        SELECT * FROM skills
        WHERE frequency >= ? AND frequency <= ?
    `

    return new Promise((resolve, reject) => {
        db.all(SQL, [minFreq, maxFreq], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

//updates skill counter
export const decreaseSkillCount = (skill) => {
    //count == 1 or count == -1
    const SQL = `
        UPDATE skills SET frequency = frequency - 1 WHERE name = ?
    `

    return new Promise((resolve, reject) => {
        db.run(SQL, [skill], (err) => {
            if (err) reject(err)
            resolve(checkAndDeleteSkill(skill))
        })
    })
}

export const checkAndDeleteSkill = (skill) => {
    const checkAndDeleteSQL = `
        DELETE FROM skills WHERE name = ? AND frequency <= 0
    `;

    //if count reaches 0, delete the skill
    return new Promise((resolve, reject) => {
        db.run(checkAndDeleteSQL, [skill], (err) => {
            if (err) reject(err)
            resolve("Success")
        })
    })
}

export const compareAndUpdateSkills = async (email, skills) => {
    const user = await getUser(email)

    if (!user) {
        throw new Error('User not found or user has no skills');
    }

    const oldSkills = JSON.parse(user.skills)

    const oldSkillsMap = {}
    const newSkillsMap = {}

    for (let i in oldSkills) {
        oldSkillsMap[oldSkills[i].skill] = 1
    }

    for (let i in skills) {
        newSkillsMap[skills[i].skill] = 1
    }

    for (let key in oldSkillsMap) {
        //missing skills
        if (!(key in newSkillsMap)) {
            await decreaseSkillCount(key)
        }
    }

    for (let key in newSkillsMap) {
        //newly created skills
        if (!(key in oldSkillsMap)) {
            await createSkill(key)
        }
    }
}