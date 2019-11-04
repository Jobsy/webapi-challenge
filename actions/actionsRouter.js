
const express = require("express");

const actionDb = require("../data/helpers/actionModel");

const router = express.Router();

router.get('/', (req, res) => {
  
  actionDb.get()
    .then((actions) => {
      res.status(200).json(actions)
    })
    .catch((err) => {
      res.status(500).json({ error: "The actions information could not be retrieved." + err })
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
      res.status(500).json({ error: "The action information could not be retrieved." + err })
    })
});

router.delete('/:id', (req, res) => {

  const { id } = req.params;
  actionDb.remove(id)
    .then((rmAction) => {
      if (rmAction === 0) {
        res.status(404).json({ message: "The action with the specified ID does not exist." })
      }
      res.status(200).json({ removedAction: `action with id: ${id} deleted` })
    })
    .catch(() => {
      res.status(500).json({ error: "The action could not be removed" })
    })
});

router.put('/:id', (req, res) => {

  const action = req.body;
  const { description, notes, completed } = req.body;
  const { url } = req;
  const { id } = req.params;

  if (!description || !notes || !completed) {
    res.status(400).json({ errorMessage: "Please provide description, notes, completed for the action." })
  }
  actionDb.update(id, action)
    .then((usersID) => {
      if (usersID) {
        res.status(200).json({ updatedAction: action, url: url, operation: "PUT" })
      }
      res.status(404).json({ message: "The action with the specified ID does not exist." })
    })
    .catch((err) => {
      res.status(500).json({ error: "The post information could not be modified." + err })
    })
});


module.exports = router;