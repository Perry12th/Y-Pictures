const xhttp = new XMLHttpRequest();

var serverLocation = "http://localhost:3000";
var content;
var identity = prompt("gimme a name");

//debug
xhttp.onload = function(){
    alert(
        "readyState: " + xhttp.readyState 
        + "\n responseText: " + xhttp.responseText
        + "\n responseXML: " + (xhttp.responseXML != null ? "(not empty)" : "(empty)")
        + "\n status: " + xhttp.status
        + "\n status name: " + xhttp.statusText
    );
}

window.onload = function(){
    $("#clickme").click(debug_request);
}


function debug_request(){
    //get the birb video
    var request = JSON.stringify({
        'name':identity,
        'serverURL':serverLocation,
        'action':'getBirb'})
    xhttp.open("POST", serverLocation+"?data="+request, false); //stop the thread just for debugging purposes
    xhttp.send();

    //add a video element if you get the file
    if(xhttp.status == 200){ 
        alert("successfully received data");
        var video = document.createElement("video");

        var videoFile = JSON.parse(xhttp.response)["path"];
        $(video).attr("type", "video/mp4");
        $(video).attr("src", videoFile);

        $("#content").append(video);
    }
    //TODO: make the birb video the first thing sent to the client and if error 404 it gets played along with the stickbug music 
}