const express = require("express");
const path = require("path");
const app = express();
const port = "8080";

/**
 * Routes
 */
app.get("/", (req, res) => {
    res.status(200).send("Hey");
});