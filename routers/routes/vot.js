const express = require("express");
const { addVot, deleteVot } = require("./../controllers/vot");

const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

const votRouter = express.Router();
votRouter.post("/addVot", authentication, addVot);
votRouter.delete("/deleteVot", authentication, deleteVot);

module.exports = votRouter;
