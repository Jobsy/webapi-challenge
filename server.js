const express = require("express");
const server = express();
const router = require("./projects/projectsRouter");

server.use(express.json());
server.use("/api/projects", router);

server.get("/", (req, res) => {
    res.send("hello world");
})

module.exports = server;