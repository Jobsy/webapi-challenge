const express = require("express");
const server = express();
const router = require("./projects/projectsRouter");
const router2 = require("./actions/actionsRouter");


server.use(express.json());
server.use("/api/projects", router);
server.use("/api/actions", router2);

server.get("/", (req, res) => {
    res.send("hello world");
})

module.exports = server;