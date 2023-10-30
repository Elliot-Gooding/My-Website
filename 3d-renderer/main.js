//Entry point of the program

//Creates world objects
objectsToRender = buildScene();

function refreshCycle(){
    console.log("refreshing renderer");
    move();
    draw(objectsToRender);
    if (runningRenderer){
        requestAnimationFrame(refreshCycle);
    }
}