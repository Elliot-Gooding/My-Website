//Handles the main logic for how pixels are rendered

const canvas = document.getElementById("window");
const ctx = canvas.getContext("2d");
canvas.width = cam.screenWidth;
canvas.height = cam.screenHeight;

function draw(objectsToRender){
    clearScreen();
    const pixels = [];
    cam.screenWidth = window.innerWidth * 38/100;
    cam.screenHeight = window.innerWidth * 38/100;
    canvas.width = cam.screenWidth;
    canvas.height = cam.screenHeight;
    objectsToRender.forEach(object => {
        let objectPixels = projectObj(object);
    });
}

function clearScreen(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function drawPixel(pixel){
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(pixel.x, pixel.y, 1, 1);
}