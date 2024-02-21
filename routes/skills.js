import express from 'express'
import { getSkillsController } from '../controllers/skills.controller.js'
const router = express.Router()

router.get('/', getSkillsController)

export default router