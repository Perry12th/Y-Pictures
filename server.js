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
                "path":"/VERYImportant/dipporb.mp4",
                "audioPath":"/VERYImportant/Get Stick Bugged Lol.mp3"
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

//returns a list of image paths
function getImagePaths(){

    const allImagePaths = [
        "/games/Hollow Knight - Broken Vessel.jpg",
        "/games/Elite Dangerous - The Cerulean Gas Giant - Maia A 1.jpg",
        "/games/God of War.jpg",
        "/games/League of Legends.jpg",
        "/games/Legend of Zelda - Nice Game.jpg",
        "/games/Terraria - 2d minecraft.jpg",
        "/games/Tetris - Everyone knows this.jpg",
        "/games/Forza Horizon 5 - Crusing on the countryside.jpg",
        "/games/Titanfall 2 - IT'S FASTBALL TIME.jpg",
        "/games/Minecraft - Is this really Minecraft.jpg",
    ];

    return allImagePaths;
}

//returns just the image name from the inputted path based on forward slashes; 
//e.g. /files/pictures/games/Hollow Knight.png -> Hollow Knight
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
//ex: /folder1/folder2/folder3/filename.txt -> filename.txt
function getNamesFromPaths(paths){
    var names = [];
    for(var i = 0; i < paths.length; i++){
        names.push(getImageNameFromPath(paths[i]));
    }
    return names;
}

//returns the list of paths with a name that matches (at least partially) the query string
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
        var doesMatch = false;
        for(var j = 0; j < imageName.length; j++){
            //first, find the index of the first character in the name that matches the first character of query
            if(imageName.charAt(j) != queryString.charAt(0)){
                //skip this iteration if it doesn't match
                continue;
            }

            //each time the (above condition) is triggered, check the *next* <query string length> characters for a match
            for(var k = j; (k - j < queryString.length) && (k < imageName.length); k++){
                doesMatch = true;
                //break and false if there is a non-matching character
                if(imageName.charAt(k) != queryString.charAt(k - j)){
                    doesMatch = false;
                    break;
                }
            }
            //if a match was found based on the above loop, exit early
            if(doesMatch) break;
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

