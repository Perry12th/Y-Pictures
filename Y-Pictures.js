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

        logo.style.color = "#f2f2f6";

        projectDescriptionBox.style.color = "#f2f2f6";

        projectDescriptionBoxHeader.style.color = "#f2f2f6";
        

        imageListBox.style.borderBlockColor = "black";
        imageListBox.style.color = "#f2f2f6";

        imageBox.style.borderBlockColor = "black";
        imageBox.style.color = "#f2f2f6";

        weatherBox.style.color = "#f2f2f6";

        settingsBox.style.color = "#f2f2f6";

        copyright.style.color = "#f2f2f6";

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

    // Slider returns an array, make all images display none.
    for (var i = 0; i < slider.length; i++) {
        slider[i].style.display = "none";
    }

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