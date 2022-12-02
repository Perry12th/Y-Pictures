var serverLocation = "http://localhost:3000";
var content;
var identity = prompt("gimme a name");

window.onload = function(){
    content = document.getElementById("content");
    getBirb();
}

//TODO: this is very important
function getBirb(){
    //get the birb video
    var request = JSON.stringify({
        'name':identity,
        'action':'getBirb'})

    $.post(serverLocation+"?data="+request, getBirb_HandleRequest);
    
    //TODO: make the birb video the first thing sent to the client and if error 404 it gets played along with the stickbug music 
}

function getBirb_HandleRequest(data, status){
    //alert("successfully received data");
    var parsedData = JSON.parse(data); 
    var video = document.createElement("video");

    var videoFile = parsedData["path"];
    $(video).attr("type", "video/mp4");
    $(video).attr("src", serverLocation+videoFile);

    //$("#content").append(video);
}


function queryImages(){
    var queryName = document.getElementById("queryField").value;
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
    var parsedData = JSON.parse(data);    
    //alert(parsedData["paths"]);
    //alert(parsedData["names"]);

    var paths = JSON.parse(parsedData["paths"]);
    var names = JSON.parse(parsedData["names"]);

    for(var i = 0; i < paths.length; i++){
        var image = document.createElement("img");
        $(image).attr("src", serverLocation+paths[i]);
        $(content).append(image);
        $(content).append(document.createElement("br"));
        var caption = document.createElement("p");
        $(caption).html(names[i]);
        $(content).append(caption);
        $(content).append(document.createElement("br"));
    }
}

