var darkMode = false;
var audioEnabled = false;
var musicEnabled = false;
var clickEffect = new Audio('audio/clickEffect.wav');
var lofiGirlMusic = new Audio('audio/lofiGirlMusic.mp3');


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
    var weatherTitle = document.getElementById("weatherTitle");
    var stringTitle = document.getElementById("stringTitle");
    var cardTemp = document.getElementsByClassName("cardTemp");

    if (darkMode)
    {
        logo.style.color = "black";
        document.body.style.background = "#f2f2f6";
        
        projectDescriptionBox.style.color = "black";
        projectDescriptionBox.style.backgroundColor = "#eee";

        projectDescriptionBoxHeader.style.color = "black";
        

        imageListBox.style.borderBlockColor = "#eee";
        imageListBox.style.color = "black";

        stringTitle.style.color = "black";

        imageBox.style.borderBlockColor = "#eee";
        imageBox.style.color = "black";

        weatherBox.style.color = "black";
        weatherTitle.style.color = "black";

        settingsBox.style = "black";
        settingsBox.style.backgroundColor = "#eee";

        copyright.style.color = "black";

        colorMode.textContent = "Enable Dark Mode";
    }
    else
    {
        document.body.style.background = "#121212";

        logo.style.color = "#eee";

        projectDescriptionBox.style.color = "#eee";
        projectDescriptionBox.style.backgroundColor = "#152028";

        projectDescriptionBoxHeader.style.color = "#eee";
        

        imageListBox.style.borderBlockColor = "black";

        imageBox.style.borderBlockColor = "black";
        imageBox.style.color = "#eee";

        stringTitle.style.color = "#eee";

        weatherBox.style.borderColor = "black";
        weatherTitle.style.color = "#eee";

        settingsBox.style.color = "#eee";
        settingsBox.style.backgroundColor = "#152028";
        settingsBox.style.borderColor = "#eee";

        copyright.style.color = "#eee";

        colorMode.textContent = "Disable Dark Mode";
    }
    darkMode = !darkMode;

    PlayClickEffect();
}

function ToggleBackgroundMusic()
{
    musicEnabled = !musicEnabled;
    var musicMode = document.getElementById("musicMode");
    if (musicEnabled)
    {
        startMusic();
        musicMode.textContent = "Disable Background Music";
    }
    else
    {
        stopMusic();
        musicMode.textContent = "Enable Background Music";
    }

    PlayClickEffect();
}

function startMusic()
{
    lofiGirlMusic.play();
    lofiGirlMusic.loop = true;
}

function stopMusic()
{
    lofiGirlMusic.pause();
}

function ToggleSoundEffects()
{

    audioEnabled = !audioEnabled;
    var soundMode = document.getElementById("soundMode");
    // soundMode.textContent = "Disable Sound Effects";
    if (audioEnabled)
    {
        soundMode.textContent = "Disable Sound Effects";
    }
    else
    {
        soundMode.textContent = "Enable Sound Effects";
    }

    PlayClickEffect();
}

function PlayClickEffect()
{
    if (audioEnabled)
    {
        clickEffect.play();
    }
}

// Sub slider algorithm
var counter = 1;

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

    // slider returns an array, make all images display none.
    for (var i = 0; i < slider.length; i++) {
        slider[i].style.display = "none";
    }

    // dots returns an array, make all dots nothing
    for (var i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
    }

    slider[counter - 1].style.display = "block";
    
    dots[counter - 1].className += " active";
}

function addSlide(num) {
    slide(counter = counter + num)
    PlayClickEffect();
}

function currentSlide(num) {
    slide(counter = num);
    PlayClickEffect();
}