const express = require("express");

const dB = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
    // dB.get()
    // .then(() => {
        res.status(200).json("it's workinggggg!!!")
    // }).catch(() => { res.status(500).json("")})
})



module.exports = router;