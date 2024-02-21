import { getFilteredSkills, getSkills } from "../services/skills.service.js"

export const getSkillsController = (req, res) => {
    if (req.query.min_frequency && req.query.max_frequency) {
        getFilteredSkills(req.query.min_frequency, req.query.max_frequency)
            .then((data) => res.send(data))
            .catch(err => res.send(err).status(500))
    } else {
        getSkills()
            .then((data) => res.send(data))
            .catch(err => res.send(err).status(500))
    }
}