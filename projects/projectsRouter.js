const express = require("express");

const dB = require("../data/helpers/projectModel");
const actionDb = require("../data/helpers/actionModel");

const router = express.Router();

//get all project
router.get("/", (req, res) => {
    dB.get()
        .then((projects) => {
            res.status(200).json(projects)
        })
        .catch((err) => {
            res.status(500).json({ error: "The projects information could not be retrieved." + err})
        })
})

//get project by id
router.get("/:id", (req, res) => {
    const { id } = req.params;

    dB.get(id)
        .then((projects) => {

            if (projects.length === 0) {
                res.status(404).json({ message: "The project with the specified ID does not exist." })
            }
            res.status(200).json({ projects: projects })
        })
        .catch((err) => {
            res.status(500).json({ error: "The project information could not be retrieved." + err})
        })
})

//get project actions by id
router.get("/:id/projActions", (req, res) => {
    const { id } = req.params;

    dB.getProjectActions(id)
        .then((actions) => {

            if (actions.length === 0) {
                res.status(404).json({ message: "The action with the specified ID does not exist." })
            }
            res.status(200).json({ actions: actions })
        })
        .catch((err) => {
            res.status(500).json({ error: "The action information could not be retrieved." + err})
        })
})

//get actions by action id using project url
router.get("/:id/actions", (req, res) => {
    const { id } = req.params;

    actionDb.get(id)
        .then((actions) => {

            if (actions.length === 0) {
                res.status(404).json({ message: "The action with the specified ID does not exist." })
            }
            res.status(200).json({ actions: actions })
        })
        .catch(() => {
            res.status(500).json({ error: "The action information could not be retrieved." })
        })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    dB.remove(id)
        .then((rmPost) => {
            if (rmPost === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            res.status(200).json({ removedPost: `post with id: ${id} deleted` })
        })
        .catch(() => {
            res.status(500).json({ error: "The post could not be removed" })
        })
})


module.exports = router;