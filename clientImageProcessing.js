var serverLocation = "http://localhost:3000";
var imageBox_images;

var birbContent;

window.onload = function(){
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
    
        birbContent = video;
    }
}

function queryImages(){
    var queryName = document.getElementById("input").value;
    /*
    query server ->
    list of matching names and images <-
    update the ImgBox
    */
    var request = JSON.stringify({
        "action":"queryImages",
        "queryName":queryName
    });
    $.post(serverLocation+"?data="+request, handleQueryImages).fail(function(){triggerError("Generic error")})

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
        $(notice).html("There are multiple results for this query; please select an image to download.");
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
        $(image).attr("data-downloadPath", names[i]);
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
    if(paths.length== 1){
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
    $("#content").append(birbContent);
    alert("Uh-oh, we got a problem \nError code: "+statusCode);
}
