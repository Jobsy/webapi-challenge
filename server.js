const express = require("express");
const server = express();
const cors = require("cors");
const router = require("./projects/projectsRouter");
const router2 = require("./actions/actionsRouter");


server.use(express.json());
server.use(cors());
server.use("/api/projects", router);
server.use("/api/actions", router2);

server.get("/", (req, res) => {
    res.send("hello world");
})

module.exports = server;