import fetch from 'node-fetch'
import fs from 'fs'
import db from '../database.js'

const getData = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                reject(new Error("Error reading file: " + err))
            } else {
                resolve(JSON.parse(data));
            }
        })
    })
}

const createUser = async (data, url) => {
    await fetch(`${url}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).catch(err => {throw new Error(err)}) 
}

const checkForDuplicateEmails = (jsonList) => {
    const emailSet = new Set(); 

    for (const item of jsonList) {
        if (emailSet.has(item.email)) {
            console.log(item.email);
        }
        emailSet.add(item.email); 
    }
    // bmiller@example.net
    // zjohnson@example.net
    // dsmith@example.net
    // usanders@example.net

    //Since our queries are email dependent they have to be unique
    //These emails appear twice in the data given
};

export const wipeDB = async () => {
    const tables = ["users", "skills"]
    const deletePromises = tables.map(table => {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM ${table}`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`Rows deleted from ${table}`);
                    resolve(`Rows deleted from ${table}`);
                }
            });
        });
    });

    return Promise.all(deletePromises)
        .then((results) => {
            console.log("Successfully wiped DB");
            return "Successfully wiped DB";
        })
        .catch((error) => {
            console.error("Error wiping DB:", error);
            throw error; // Rethrow or handle error as appropriate
        });
}

export const populateDB = async (filePath, backendUrl) => {
    const data = await getData(filePath)
    for (let i in data) {
        await createUser(data[i], backendUrl)
            .catch((err) => console.log(err))
    }
    console.log('done')
    //checkForDuplicateEmails(data)
}

export const resetDB = async (filePath, backendUrl) => {
    wipeDB()
        .then(() => {populateDB(filePath, backendUrl)})
}
