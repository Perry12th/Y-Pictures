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

    const data = JSON.parse(req.query['data']) //searches for "data?=<...> and the stuff after it"
    const action = data["action"] //gets the value of "action" from data
    console.log("action: " + action);
    
    switch(action){
        case "getBirb":{
            var toSend = JSON.stringify({
                "path":"/pictures/dipporb.mp4"
            })
            res.send(toSend);
            break;
        }
        case "queryImages":{
            var queryName = action["queryName"];

            var paths = getMatchingOf(queryName);

            var toSend = JSON.stringify({
                "paths":paths
                //"names":names TODO
            })
        }
    }
})


//returns a list of image <paths/objects>
function getImagePaths(){

}

//returns just the image name from the inputted <path/object> based on forward slashes; e.g. /files/pictures/games/Hollow Knight.png -> Hollow Knight
function getImageNameFromPath(path){

}

//returns the list of <paths/objects> with a name that matches (at least partially) the query string
function getMatchingOf(queryString){

    var imagePaths = ["foo", "foo bar", "bar"]; //TODO: replace with getImagePaths()

    //TODO: if we're not allowed to use objects, make this a 2d array with a name property
    var matches = []; //this is an array of paths, not strings
    for(var i = 0; i < imagePaths.length; i++){
        var imagePath = imagePaths[i];
        var imageName = getImageNameFromPath(imagePath);
        
        //TODO: get rid of spaces from both imageName and queryString

        //determine if the query string is a match
        var matches = true;
        for(var j = 0; j < imageName.length; j++){
            if(imageName.charAt[j] != queryString.charAt[j]){
                matches = false;
                break;
            }
        }
        if(matches) matches.push(imagePath); //add it to matches if so
    }
    //TODO (if necessary): prioritize exact matches, then expand search to partial matches

    return matches;
}




app.listen(3000);
//public/static directories: https://www.tutorialspoint.com/expressjs/expressjs_static_files.htm 
app.use(express.static('public'));

