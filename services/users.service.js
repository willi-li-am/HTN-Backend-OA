import db from '../database.js'

export const getUsers = () => {
    const SQL = `SELECT * FROM users`

    return new Promise((resolve, reject) => {
        db.all(SQL, (err, rows) => {
            if (err) reject (err)
            resolve(rows)
        })
    })
}

export const getUser = (email) => {
    //uses email as identifier
    const SQL = `
        SELECT *
        FROM users
        WHERE email = ?
    `

    return new Promise((resolve, reject) => {
        db.get(SQL, [email], (err, row) => {
            if (err) reject (err)
            if (row == undefined) reject("user not found")
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

    //update skills

    return new Promise((resolve, reject) => {
        db.run(SQL, [name, company, email, phone, skills], (err) => {
            if (err) reject("An error has occured")
            resolve(`User ${name} has successfully been created!`)
        })
    })
}

export const updateUser = (data) => {
    //add skill/frequency to skills db

    //how to delete skill?
    //update + delete field for skill?
    /**
     * {
     *    skills: {
     *      update: [] //check if exists
     *      delete: [] //check if exists
     *    }
     * }
     */
}

export const deleteUser = (user) => { //assume there was authorization
    //remove skills frequency from skills db
}