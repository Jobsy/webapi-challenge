const express = require("express");

const dB = require("../data/helpers/projectModel");
const actionDb = require("../data/helpers/actionModel");

const router = express.Router();

//get all project
router.get("/", (req, res) => {
    dB.get()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((err) => {
            res.status(500).json({ error: "The posts information could not be retrieved." + err})
        })
})

//get project by id
router.get("/:id", (req, res) => {
    const { id } = req.params;

    dB.get(id)
        .then((posts) => {

            if (posts.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            res.status(200).json({ posts: posts })
        })
        .catch((err) => {
            res.status(500).json({ error: "The post information could not be retrieved." + err})
        })
})

//get project actions by id
router.get("/:id/projActions", (req, res) => {
    const { id } = req.params;

    dB.getProjectActions(id)
        .then((posts) => {

            if (posts.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            res.status(200).json({ posts: posts })
        })
        .catch((err) => {
            res.status(500).json({ error: "The post information could not be retrieved." + err})
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

module.exports = router;