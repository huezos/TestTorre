const { application } = require("express");
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const app = express();
const port = "8080";

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes
 */
app.get("/", (req, res) => {
    res.render("index", {
        title: "Torre test",
    });
});

app.post("/opportunity", (req, res) => {
    console.log(req.body.opportunity);
    res.render("opportunityDetails", {
        title: "Opportunity details",
        opportunity: req.body.opportunity,
    });
})

app.listen(port, () => {
    console.log(`Listening in port ${port}`);
});