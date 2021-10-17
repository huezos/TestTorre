const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const port = "3000";
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : "",
  user     : "",
  password : "",
  port     : ""
});


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
    const email = body.email;
    const opportunity = body.opportunity;
    const objective = body.objectiveOpportunity;
    connection.query('SELECT id FROM ebdb.Email WHERE email = ?', [email], 
        function (error, results, fields) {
            if (error){
                throw error;
            }
            if(results.length == 0){
                connection.query("INSERT INTO ebdb.Email(email) VALUES(?)", [email], 
                    function(error, results, fields){
                        if (error){
                            throw error;
                        }
                        linkEmailOpportunity(results.insertId, opportunity, objective);    
                    });
            }
            else{
                linkEmailOpportunity(results[0].id, opportunity, objective);
            }
    });
    res.send({
        status: "OK",
    });
});

app.post("/deleteOpportunity", (req, res) => {
    const body = req.body;
    const key = "/" + body.email;
    const opportunity = body.opportunity;
    var opportunities = db.get(key) || {};
    if(opportunities[opportunity] !== undefined){
        delete opportunities[opportunity];
    }
    db.set(key, opportunities);
    res.send({
        status: "OK",
    });
});

app.post("/saved", (req, res) => {
    const body = req.body;
    res.render("saved", {
        title: "Opportunities saved",
        email: body.email,
    });
});

app.post("/opportunitiesSaved", (req, res) => {
    const body = req.body;
    res.send({
        status: "OK",
        opportunities: db.get("/" + body.email) || {},
    });
})

app.listen(port, () => {
    console.log(`Listening in port ${port}`);
});

/**
 * Functions
 */

/**
 * Function to save the realtionship email - opportunity
 * @param int idEmail 
 * @param string opportunity 
 * @param string objective 
 */
function linkEmailOpportunity(idEmail, opportunity, objective){
    connection.query(`INSERT INTO ebdb.EmailFollowOpportunity(fkIdEmail, 
        fkIdOpportunity, objective) VALUES (?, ?, ?)
    `, [idEmail, opportunity, objective], 
    function(error, results, fields){
        if (error){
            throw error;
        }
    });
}