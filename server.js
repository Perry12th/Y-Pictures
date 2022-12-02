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
                "path":"/VERYImportant/dipporb.mp4"
            })
            res.send(toSend);
            break;
        }
        case "queryImages":{
            //client's query string
            var queryName = data["queryName"];

            console.log("query name: "+queryName);

            //*all* the image paths matching the client's query string
            var paths = getMatchingOf(queryName);

            console.log("matches: "+paths);//debug
            console.log("repspective match names: "+getNamesFromPaths(paths));//debug

            //send both the paths and image names (they should be in order)
            var toSend = JSON.stringify({
                "paths":JSON.stringify(paths),
                "names":JSON.stringify(getNamesFromPaths(paths))
            })
            res.send(toSend);
            break;
        }
        default: console.log("error: no action at all or no matching action for: " + action);
        }
    }
)


const allImagePaths = [
    "/games/Hollow Knight - Broken Vessel.jpg",
    "/games/Elite Dangerous - The Cerulean Gas Giant - Maia A 1.jpg"
];

//returns a list of image paths
function getImagePaths(){
    return allImagePaths;
}

//returns just the image name from the inputted path based on forward slashes; e.g. /files/pictures/games/Hollow Knight.png -> Hollow Knight
function getImageNameFromPath(path){
    var lastForwardSlashPos = 0;
    //identify the index of the last foward slash
    for(var i = 0; i < path.length; i++){
        if(path.charAt(i) == "/"){
            lastForwardSlashPos = i;
        }
    }

    var imageName = "";
    //Everything after the last forward slash is considered the name
    for(var i = lastForwardSlashPos + 1; i < path.length; i++){
        imageName += path.charAt(i);
    }
    return imageName;
}

//given an array of paths, return the name (everything after the last forward slash)
function getNamesFromPaths(paths){
    var names = [];
    for(var i = 0; i < paths.length; i++){
        names.push(getImageNameFromPath(paths[i]));
    }
    return names;
}

//returns the list ofpaths with a name that matches (at least partially) the query string
function getMatchingOf(queryString){

    var imagePaths = getImagePaths();

    var matches = []; //this is an array of paths, not name strings
    for(var i = 0; i < imagePaths.length; i++){
        var imagePath = imagePaths[i];

        var imageName = getImageNameFromPath(imagePath);
        
        //QOL: remove spaces so that a single space doesn't cut potential results
        //and also decapitalize, of course
        queryString = removeSpacesFromString(queryString).toLowerCase(); 
        imageName = removeSpacesFromString(imageName).toLowerCase();

        //determine if the query string is a match
        var doesMatch = true;
        for(var j = 0; j < queryString.length; j++){
            if(imageName.charAt(j) != queryString.charAt(j)){
                doesMatch = false;
                break;
            }
        }
        if(doesMatch){
            matches.push(imagePath); //add it to matches if so
        } 
    }
    //TODO (if necessary): prioritize exact matches, then expand search to partial matches

    return matches;
}

function removeSpacesFromString(str){
    var newStr = "";
    for(var i = 0; i < str.length; i++){
        if(str.charAt(i) != " "){
            newStr += str.charAt(i);
        }
    }
    return newStr;
}

app.listen(3000);
//public/static directories: https://www.tutorialspoint.com/expressjs/expressjs_static_files.htm 
app.use(express.static('public'));

