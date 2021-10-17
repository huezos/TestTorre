const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const port = "3000";
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,    
    password: "",
    user: "",
    database: "",
    host: "",
    port: 2
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

app.post("/saveOpportunity", async (req, res) => {
    const body = req.body;
    const email = body.email;
    const opportunity = body.opportunity;
    const objective = body.objectiveOpportunity;
    linkEmailOpportunity(email, opportunity, objective);
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
 * Function to save the realtionship email - opportunity
 * @param string email
 * @param string opportunity 
 * @param string objective 
 */
async function linkEmailOpportunity(email, opportunity, objective){
    var relations = await searchExistsEmailOpportunity(email, opportunity);
    if(relations.length == 0){
        pool.query(`INSERT INTO ebdb.EmailFollowOpportunity(email, 
            opportunity, objective) VALUES (?, ?, ?)
        `, [email, opportunity, objective], 
        function(error, results, fields){
            if (error){
                throw error;
            }
        });
    }
}

/**
 * Function to get of alredy exists the relations between 
 * email and opportunity
 * @param string email 
 * @param string opportunity 
 * @returns 
 */
function searchExistsEmailOpportunity(email, opportunity){
    return new Promise((resolve, reject) => {
        pool.query(`SELECT 1 FROM ebdb.EmailFollowOpportunity
            WHERE email = ? 
                AND opportunity = ?
                AND active = 1 
        `, [email, opportunity], 
        function(error, results, fields){
            if (error){
                reject(error);
                throw error;
            }
            resolve(results);
        }); 
    });
}