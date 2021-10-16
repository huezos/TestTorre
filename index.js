const express = require("express");
const path = require("path");
const app = express();
const port = "8080";

app.set("view engine", "pug");

/**
 * Routes
 */
app.get("/", (req, res) => {
    res.render("index", {
        title: "Torre test",
    });
});

app.listen(port, () => {
    console.log(`Listening in port ${port}`);
});