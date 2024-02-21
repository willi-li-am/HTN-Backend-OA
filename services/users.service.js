import db from '../database.js'
import { compareAndUpdateSkills, createSkill, isValidSkills } from './skills.service.js'

export const getUsers = () => {
    const SQL = `SELECT * FROM users`

    return new Promise((resolve, reject) => {
        db.all(SQL, (err, rows) => {
            if (err) reject (err)
            for (let i in rows) {
                rows[i].skills = JSON.parse(rows[i].skills)
            }
            resolve(rows)
        })
    })
}

export const getUser = (email) => {
    const SQL = `
        SELECT *
        FROM users
        WHERE email = ?
    `

    return new Promise((resolve, reject) => {
        db.get(SQL, [email], (err, row) => {
            if (err) reject (err)
            if (row == undefined) reject("user not found")
            row.skills = JSON.parse(row.skills)
            resolve(row)
        })
    })
}

export const createUser = (data) => {
    const name = data.name
    const company = data.company
    const email = data.email
    const phone = data.phone
    const skills = data.skills

    //checks for input validity
    if (!(name && company && email && phone && skills)) {
        throw new Error("Invalid inputs")
    }

    const SQL = `
        INSERT INTO users
        (name, company, email, phone, skills)
        VALUES
        (?, ?, ?, ?, ?)
    `

    //check skill validity
    if (!isValidSkills(skills)) {
        throw new Error("Skill input is invalid")
    }

    //update skills
    for (let i in skills) {
        createSkill(skills[i].skill)
    }

    return new Promise((resolve, reject) => {
        db.run(SQL, [name, company, email, phone, JSON.stringify(skills)], (err) => {
            if (err) reject("An error has occured")
            resolve(`User ${name} has successfully been created!`)
        })
    })
}

export const updateUser = async (data) => {
    const {email, ...updatedData} = data
    const skills = updatedData.skills

    //checks validity of skill input and +/- frequency accordingly
    if (skills && isValidSkills(skills)) {
        compareAndUpdateSkills(email, skills)
    } else {
        throw new Error("Bad skill input")
    }
    
    const setKeys = []
    const setValues = []

    for (let key in updatedData) {
        if (key == 'skills') {
            setValues.push(JSON.stringify(skills))
        } else {
            setValues.push(updatedData[key])
        }
        setKeys.push(`${key} = ?`);
    }

    if (setKeys.length == 0) {
        reject("Nothing to update")
    }
   
    setValues.push(email)
    const SQL_keys = setKeys.join(', ')

    //sets all new data to be updated
    const SQL = `UPDATE users SET ${SQL_keys} WHERE email = ?`

    return new Promise((resolve, reject) => {
        db.run(SQL, setValues, (err) => {
            if (err) reject(err)
            resolve(`Updated ${email}!`)
        })
    })
}