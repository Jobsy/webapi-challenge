const express = require("express");

const actionDb = require("../data/helpers/actionModel");

const router = express.Router();

router.get('/', (req, res) => {
    actionDb.get()
    .then((actions) => {
        res.status(200).json(actions)
    })
    .catch((err) => {
        res.status(500).json({ error: "The actions information could not be retrieved." + err})
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    actionDb.get(id)
        .then((actions) => {

            if (actions.length === 0) {
                res.status(404).json({ message: "The action with the specified ID does not exist." })
            }
            res.status(200).json({ actions: actions })
        })
        .catch((err) => {
            res.status(500).json({ error: "The action information could not be retrieved." + err})
        })
});


module.exports = router;