const { application } = require("express");
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const JSONdb = require('simple-json-db');
const { appendFile } = require("fs");
const db = new JSONdb('database.json');
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
    const body = req.body;
    res.render("opportunityDetails", {
        title: "Opportunity details",
        opportunity: body.opportunity,
        email: body.email,
    });
})

app.post("/saveOpportunity", (req, res) => {
    const body = req.body;
    const key = "/" + body.email;
    const opportunity = body.opportunity;
    const objective = body.objectiveOpportunity;
    var opportunities = db.get(key) || {};
    if(opportunities[opportunity] === undefined){
        opportunities[opportunity] = {
            id: opportunity,
            name: objective,
        };
    }
    db.set(key, opportunities);
    res.send({
        status: "OK",
    });
})

app.listen(port, () => {
    console.log(`Listening in port ${port}`);
});