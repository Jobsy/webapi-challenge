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
        .then((rmProject) => {
            if (rmProject === 0) {
                res.status(404).json({ message: "The project with the specified ID does not exist." })
            }
            res.status(200).json({ removedPost: `project with id: ${id} deleted` })
        })
        .catch(() => {
            res.status(500).json({ error: "The project could not be removed" })
        })
})

router.put("/:id", (req, res) => {
    const project = req.body;
    const { name, description } = req.body;
    const { url } = req;
    const { id } = req.params;

    if (!name || !description) {
        res.status(400).json({ errorMessage: "Please provide name and description for the project." })
    }
    dB.update(id, project)
        .then((usersID) => {
            if (usersID) {
                res.status(200).json({ updatedProject: project, url: url, operation: "project" })
            }
            res.status(404).json({ message: "The project with the specified ID does not exist." })
        })
        .catch(() => {
            res.status(500).json({ error: "The project information could not be modified." })
        })
})

router.post("/", (req, res) => {
    const project = req.body;
    const { name, description } = req.body;
    const { url } = req;
    if (!name || !description) {
        res.status(400).json({ errorMessage: "Please provide name and description for the project." })
    }
    dB.insert(project)
        .then(() => {
            res.status(201).json({ postedContent: project, url: url, operation: "POST" })
        })
        .catch(() => {
            res.status(500).json({ error: "There was an error while saving the project to the database" })
        })
});


module.exports = router;