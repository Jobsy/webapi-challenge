const express = require("express");

const dB = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
    dB.get()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch(() => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})



module.exports = router;