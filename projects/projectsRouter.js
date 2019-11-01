const express = require("express");

const dB = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json("it's workinggggg!!!")
})