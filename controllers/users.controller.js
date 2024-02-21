import { createUser, getUser, getUsers } from "../services/users.service.js"

export const getUsersController = (req, res) => {
    getUsers()
        .then(data => res.send(data))
        .catch((err) => res.status(500).send(err))
}

export const createUserController = (req, res) => {
    createUser(req.body)
        .then(data => res.send(data))
        .catch((err) => res.status(500).send(err))
}

export const getUserController = (req, res) => {
    getUser(req.params.user)
        .then((data) => res.send(data))
        .catch(err => res.status(500).send(err))
}