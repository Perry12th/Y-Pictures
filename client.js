const { query } = require("express");

var serverLocation = "http://localhost:3000";
var content;
var identity = prompt("gimme a name");

window.onload = function(){
    
}

function debug_request(){
    //get the birb video
    var request = JSON.stringify({
        'name':identity,
        'action':'getBirb'})

    $.post(serverLocation+"?data="+request, debug_HandleRequest);
    
    //TODO: make the birb video the first thing sent to the client and if error 404 it gets played along with the stickbug music 
}

function debug_HandleRequest(data, status){
    alert("successfully received data");
    var video = document.createElement("video");

    var videoFile = JSON.parse(data)["path"];
    $(video).attr("type", "video/mp4");
    $(video).attr("src", serverLocation+videoFile);

    $("#content").append(video);
}


function queryImages(queryName){
    /*
    query server ->
    list of matching names and images <-
    cache the images (chrome already does this?)
    update the carousel and corresponding names
        array of corresponding names and image paths
    */
    var request = JSON.stringify({
        "name":identity,
        "action":"queryImages",
        "queryName":queryName
    });

    $.post(serverLocation+"?data="+request, handleQueryImages)
}
function handleQueryImages(data, status){

}

