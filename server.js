//express tutorial used: https://www.tutorialspoint.com/expressjs/expressjs_environment.htm

const express = require('express');
const path = require('path'); //https://www.youtube.com/watch?v=Y-tuk36Tqtw&t=5s
const app = express();

console.log("hello world");

app.get('/', (req, res) => {
    res.send("hello world");
})

app.post('/', (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    console.log("received a POST");
    var data = JSON.parse(req.query['data']) //searches for "data?=<...> and the stuff after it"
    var action = data["action"] //gets the value of "action" from data
    console.log("action: " + action);

    if(action == "getBirb"){
        res.sendFile(path.resolve('./public/pictures/dipporb.mp4'));
    }
})

app.listen(3000);

//public/static directories: https://www.tutorialspoint.com/expressjs/expressjs_static_files.htm 
//app.use(express.static('public'));

