import express from 'express'
import dotenv from 'dotenv'
import { populateDB, resetDB, wipeDB } from '../utils/seedData.js'
const router = express.Router()

dotenv.config()

router.get("/reset", (req, res) => {
    resetDB('./utils/data.json', process.env.BACKEND_URL)
    .then(() => res.send("Database wiped and repopulated"))
    .catch((err) => res.status(500).send(err))
})

router.get("/populate", (req, res) => {
    populateDB('./utils/data.json', process.env.BACKEND_URL)
    .then(() => res.send("Database populated"))
    .catch((err) => res.status(500).send(err))
})

router.get("/wipe", (req, res) => {
    wipeDB()
    .then(() => res.send("Database wiped"))
    .catch((err) => res.status(500).send(err))
})

export default router