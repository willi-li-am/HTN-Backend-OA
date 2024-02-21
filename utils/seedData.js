import fetch from 'node-fetch'
import fs from 'fs'

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

const populateDB = async (filePath, backendUrl) => {
    const data = await getData(filePath)
    for (let i in data) {
        await createUser(data[i], backendUrl)
            .catch((err) => console.log(err))
    }
    console.log('done')
    //checkForDuplicateEmails(data)
}



populateDB('./data.json', 'http://localhost:3000')