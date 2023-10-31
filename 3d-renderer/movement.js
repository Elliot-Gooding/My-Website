//Handles movement of the character including mouse and keyboard input


//Creates an object to hold boolean states of pressed keys
let pressedKeys = {};
window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; };
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; };



//Handles mouse movement for yaw (panning)
document.onmousemove = function(event){
    if (runningRenderer){
        cam.yaw += event.movementX * cam.mouseSpeed * 0.1;
        while (cam.yaw>360) {cam.yaw -= 360};
        while (cam.yaw<0) (cam.yaw+=360);
    
        cam.pitch -= event.movementY * cam.mouseSpeed * 0.1;
    }
};



//Handles the angle at which the character should move along the XZ plane
function move(){
    if (pressedKeys[87]){
        moveCharacterInDirection(cam.yaw, character.speed);
    };
    if (pressedKeys[65]){
        moveCharacterInDirection(cam.yaw+270, character.speed);
    };
    if (pressedKeys[83]){
        moveCharacterInDirection(cam.yaw+180, character.speed);
    };
    if (pressedKeys[68]){
        moveCharacterInDirection(cam.yaw+90, character.speed);
    };
};



//Moves the character along the XZ plane at a given angle
function moveCharacterInDirection(angle,speed){
    let deltaZ = speed*m.cos(angle);
    let deltaX = speed*m.sin(angle);
    character.x += deltaX;
    character.z += deltaZ;
};