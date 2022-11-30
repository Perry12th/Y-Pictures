var darkMode = false;

function ToggleDarkMode()
{
    var logo = document.getElementById("logo");
    var projectDescriptionBox = document.getElementById("projectDescriptionBox");
    var projectDescriptionBoxHeader = document.getElementById("projectDescriptionBoxHeader");
    var imageListBox = document.getElementById("imageListBox");
    var imageButtons = document.getElementById("imageButtons");
    var imageBox = document.getElementById("imageBox");
    var weatherBox = document.getElementById("weatherBox");
    var settingsBox = document.getElementById("settingsBox");
    var copyright = document.getElementById("copyright");
    var colorMode = document.getElementById("colorMode");
    var musicMode = document.getElementById("musicMode");
    var soundMode = document.getElementById("soundMode");

    if (darkMode)
    {
        logo.style.color = "black";
        document.body.style.background = "#f2f2f6";
        
        projectDescriptionBox.style.color = "black";

        projectDescriptionBoxHeader.style.color = "black";
        

        imageListBox.style.borderBlockColor = "white";
        imageListBox.style.color = "black";

        imageBox.style.borderBlockColor = "white";
        imageBox.style.color = "black";

        weatherBox.style.color = "black";

        settingsBox.style = "black";

        copyright.style.color = "black";

        colorMode.textContent = "Enable Dark Mode";
    }
    else
    {
        document.body.style.background = "gray";

        logo.style.color = "white";

        projectDescriptionBox.style.color = "white";

        projectDescriptionBoxHeader.style.color = "white";
        

        imageListBox.style.borderBlockColor = "black";
        imageListBox.style.color = "white";

        imageBox.style.borderBlockColor = "black";
        imageBox.style.color = "white";

        weatherBox.style.color = "white";

        settingsBox.style.color = "white";

        copyright.style.color = "white";

        colorMode.textContent = "Disable Dark Mode";
    }
    darkMode = !darkMode;
}

function ToggleBackgroundMusic()
{
    // musicMode.textContent = "Enable Background Music";
    // musicMode.textContent = "Disable Background Music";
}

function ToggleSoundEffects()
{
    // soundMode.textContent = "Disable Sound Effects";
    // soundMode.textContent = "Disable Sound Effects";
}

function PlayClickEffect()
{
}

// Sub slider algorithm
var counter = 1;

slide(counter)

function addSlide(num) {
    slide(counter = counter + num)
}

function currentSlide(num) {
    slide(counter = num);
}

// Main slider algorithm
function slide(num) {
    var slider = document.getElementsByClassName("slider");
    var dots = document.getElementsByClassName("dots");

    // If the counter is at the 10th position and pressed forward, go to the 1st position
    if (num > slider.length) {
        counter = 1;
    }

    // If the counter is at the 1st position and pressed back, go to the 10th position
    if (num < 1) {
        counter = slider.length;
    }

    // Slider returns an array, make all images display none.
    for (var i = 0; i < slider.length; i++) {
        slider[i].style.display = "none";
    }

    for (var i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "")
    }

    slider[counter - 1].style.display = "block";
    dots[counter - 1].className += " active";
}