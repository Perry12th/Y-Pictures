var darkMode = false;

function ToggleDarkMode()
{
    var projectDescriptionBox = document.getElementById("projectDescriptionBox");
    var projectDescriptionBoxHeader = document.getElementById("projectDescriptionBoxHeader");
    var imageListBox = document.getElementById("imageListBox");
    var imageButtons = document.getElementById("imageButtons");
    var imageBox = document.getElementById("imageBox");
    var weatherBox = document.getElementById("weatherBox");
    var settingsBox = document.getElementById("settingsBox");
    var copyright = document.getElementById("copyright");

    if (darkMode)
    {
        document.body.style.background = "white";
        projectDescriptionBox.style.borderBlockColor = "white";
        projectDescriptionBoxHeader.style.color = "white";
        imageListBox.style.borderBlockColor = "white";
        imageBox.style.borderBlockColor = "white";
        weatherBox.style.borderBlockColor = "white";
        settingsBox.style.borderBlockColor = "white";
        copyright.style.color = "white";
    }
    else
    {
        document.body.style.background = "grey";
        projectDescriptionBox.style.borderBlockColor = "black";
        projectDescriptionBoxHeader.style.color = "black";
        imageListBox.style.borderBlockColor = "black";
        imageBox.style.borderBlockColor = "black";
        weatherBox.style.borderBlockColor = "black";
        settingsBox.style.borderBlockColor = "black";
        copyright.style.color = "black";
    }
    darkMode = !darkMode;
}

function ToggleBackgroundMusic()
{

}

function ToggleSoundEffects()
{

}

function PlayClickEffect()
{

}