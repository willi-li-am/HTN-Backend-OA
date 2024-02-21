import express from "express";
import { createUserController, getUserController, getUsersController } from "../controllers/users.controller.js";
const router = express.Router()

router.get('/', getUsersController) //Gets all users

router.get('/:user', getUserController) //get singular user by email

router.post('/', createUserController) //Make a new user

router.put('/:user') //updates a user for something
//Note: If a user has new skills, these skills should be added to the database. Any existing skills should have their ratings updated.

export default router