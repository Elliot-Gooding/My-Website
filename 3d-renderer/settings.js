//Sets initial character and camera conditions

const character = {
    x:-30,
    y:0,
    z:-30,
    speed:1,
}

const cam = {
    yaw:30,
    pitch:0,
    roll:0,
    mouseSpeed:1,
    hFOV:120,
    vFOV:120,
    nearPlane:1,
    farPlane:500,
    screenWidth: 640,
    screenHeight: 640
}

//Creating maths and clipper objects
const m = new DegreeMaths();
const clipperNP = new ClipperNearPlane();
const clipperR = new ClipperRightPlane();
const clipperL = new ClipperLeftPlane();