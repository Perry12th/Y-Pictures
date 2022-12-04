var serverLocation = "http://localhost:3000";
var imageBox_images;

var birbContent;
var getStickBugged;

function loadImageProcessing(){
    imageBox_images = document.getElementById("imageBox_images");
    getBirb();
    populateImageList();
}

//load the image carousel
function populateImageList(){
    var request = JSON.stringify({
        "action":"queryImages",
        "queryName":""
    });
    $.post(serverLocation+"?data="+request, populate).fail(function(){triggerError("Generic error")})

    function populate(data, status){
        var parsedData = JSON.parse(data);    
        var paths = JSON.parse(parsedData["paths"]);

        for(var i = 0; i < paths.length; i++){
            $(document.getElementById("imageList"+(i+1))).attr(
                "src", serverLocation+paths[i]
                )
        }
    }
}

//TODO: this is very important
function getBirb(){
    //get the birb video
    var request = JSON.stringify({'action':'getBirb'});

    $.post(serverLocation+"?data="+request, getBirb_HandleRequest);
    
    //TODO: make the birb video the first thing sent to the client and if error 404 it gets played along with the stickbug music 

    function getBirb_HandleRequest(data, status){
        //alert("successfully received data");
        var parsedData = JSON.parse(data); 
        var video = document.createElement("video");
    
        var videoFile = parsedData["path"];
        $(video).attr("type", "video/mp4");
        $(video).attr("src", serverLocation+videoFile);
        $(video).prop("autoplay", true);

        var audio = document.createElement("audio");
        var audioFile = parsedData["audioPath"];
        $(audio).attr("type", "audio/mpeg");
        $(audio).attr("src", serverLocation+audioFile);
        $(audio).prop("autoplay", true);
        
        getStickBugged = audio; 
        birbContent = video;
    }
}

function queryImages(queryName){
    
    if(queryName == undefined){
        queryName = document.getElementById("input").value;
    }

    if(queryName == undefined || queryName.length == 0){
        alert("Search cannot be empty");
        return;
    }
    /*
    query server ->
    list of matching names and images <-
    update the ImgBox
    */
    sendQuery(queryName, handleQueryImages);
}
function sendQuery(queryName, callbackFunction){
    var request = JSON.stringify({
        "action":"queryImages",
        "queryName":queryName
    });

    $.post(serverLocation+"?data="+request, callbackFunction).fail(function(){triggerError("Generic error")})
}

//used to track what's currently in the image display so that they can be refresh with each inquiry
function handleQueryImages(data, status){

    clearImageBox();
    /*
    It's bad QOL to clear the images before new results come in but it's clearer to show
    any error that comes up this way ¯\_(ツ)_/¯
    */

    if(status != "success"){
        triggerError(status);
    }
    
    var parsedData = JSON.parse(data);    
    var paths = JSON.parse(parsedData["paths"]);
    var names = JSON.parse(parsedData["names"]);

    
    if(paths.length > 1){
        var notice = document.createElement("p");
        $(notice).html("There are multiple results for this query; please click to select an image to download.");
        $(notice).attr("id", "multipleQueryResultsNotice");
        $(imageBox_images).append(notice);
    }
    if(paths.length == 0){
        var notice = document.createElement("p");
        $(notice).html("No results");
        $(notice).attr("id", "multipleQueryResultsNotice");
        $(imageBox_images).append(notice);
    }

    //finally append all the matching results
    for(var i = 0; i < paths.length; i++){
        //first, the image
        var image = document.createElement("img");
        var imageID = "imageBoxImg"+i;
        $(image).attr("id", imageID);
        $(image).attr("src", serverLocation+paths[i]);
        $(image).attr("data-downloadPath", serverLocation+paths[i]);
        $(image).attr("onclick", "selectImage(\""+imageID+"\")");
        $(imageBox_images).append(image);

        $(imageBox_images).append(document.createElement("br"));

        //then, the captions
        var caption = document.createElement("p");
        var captionID = "imageBoxCaption"+i;
        $(caption).attr("id", captionID);
        $(caption).html(names[i]);
        $(imageBox_images).append(caption);

        $(imageBox_images).append(document.createElement("br"));
    }
    if(paths.length == 1){
        selectImage("imageBoxImg0");
    }
    
    function clearImageBox(){
        $(imageBox_images).empty();

        selectedImageID = "";
    }
}

var selectedImageID;
function selectImage(id){
    selectedImageID = id;

    var imageDownloadLink = document.getElementById("imageDownloadLink");
    $(imageDownloadLink).attr(
        "href",
        document.getElementById(selectedImageID).getAttribute("data-downloadpath")
        );
}

function checkImageDownload(){
    //TODO
    if(selectedImageID == undefined || selectedImageID.length == 0 ){
        alert("You have not selected/there is no image to download.");
    }

}




function triggerError(statusCode){
    var errorCaption = document.createElement("p");
    $(errorCaption).html("Uh-oh, can't connect to the server — Error code: " + statusCode);
    $(imageBox_images).append(errorCaption);

    //ok maybe we don't want the TA to have the GET STICKBUGGED LOL blasting through their speakers all of the sudden
    //$(imageBox_images).append(birbContent);
    //$(imageBox_images).append(getStickBugged);

    alert("Uh-oh, we got a problem \nError code: "+statusCode);
}
