const express = require("express");

const actionDb = require("../data/helpers/actionModel");

const router = express.Router();

router.get('/', (req, res) => {
    actionDb.get()
    .then((actions) => {
        res.status(200).json(actions)
    })
    .catch(() => {
        res.status(500).json({ error: "The actions information could not be retrieved." })
    })
});



module.exports = router;