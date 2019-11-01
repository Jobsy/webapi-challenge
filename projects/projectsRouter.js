const express = require("express");

const dB = require("../data/helpers/projectModel");

const router = express.Router();

//get all project
router.get("/", (req, res) => {
    dB.get()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch(() => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
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
        .catch(() => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

module.exports = router;