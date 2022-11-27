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
        'action':'getBirb'})
    xhttp.open("POST", serverLocation+"?data="+request, false); //stop the thread just for debugging purposes
    xhttp.send();

    //add a video element if you get the file
    if(xhttp.status == 200){ 
        //TODO the page *is* receiving data (5mb video according to inspect element) but how do you parse it into something you can view???
        alert("successfully received data");
        var video = document.createElement("video");
        $(video).attr("src", xhttp.response);
        $("#content").append(video);
    }
}