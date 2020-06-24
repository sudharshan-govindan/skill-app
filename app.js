require('dotenv').config();
//var cloudant = require('cloudant');
var express = require('express');
var bodyParser = require('body-parser');
var stringSimilarity = require('string-similarity');
let secureEnv = require('secure-env');
//global.env = secureEnv({secret:'mySecretPassword'});

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
  res.sendFile("views/index.html", {"root": __dirname});
});

var Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant({url: "https://66fe83f7-f925-45ed-b758-5d0a75f7cbee-bluemix:0d5dffb251e4115ea1e9da9476c37df07e4fb2e6b79e222a960dd4fad0675ac7@66fe83f7-f925-45ed-b758-5d0a75f7cbee-bluemix.cloudantnosqldb.appdomain.cloud"});
var dbname = 'mydb';


//var cloudant = cloudant({account:global.env.cloudantusername, password:global.env.cloudantpassword});

var responsequiz1;
var responsequiz2;

var time;
var url;
var counter=0;

quizdb = cloudant.db.use(dbname);


app.post('/quizsubmission', function(req,res){

    var doc={
        _id:req.headers.host + req.url,
        responsequiz1: req.body.quiz_1,
        responsequiz2: req.body.quiz_2,
        responsequiz3: req.body.quiz_3,
        time: new Date().toISOString(),
        email: req.body.cloudemail
        };

quizdb.insert(doc,function(err,body,header){
    if(err){
        res.sendFile(__dirname + "/views/error.html");
        console.log('Error:'+err.message);
        return;
    }
    else{
        res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<center><h2>Thank you for answering the questions!</h2><center>');
    //res.write('<center><h3>You have scored '+quizscore+'!</h3><center>');
    res.end();
    }
});

    //return res.sendFile(__dirname+"/views/success.html");
});

const port = 3001;
app.listen(port, function () {
    console.log("Server running on port: %d", port);
});
module.exports = app;
