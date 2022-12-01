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


function queryImages(){


}