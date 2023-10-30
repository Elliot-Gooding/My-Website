//Entry point of the program

//Creates world objects
objectsToRender = buildScene();

requestAnimationFrame(refreshCycle);
function refreshCycle(){
    move();
    draw(objectsToRender);
    requestAnimationFrame(refreshCycle);
}