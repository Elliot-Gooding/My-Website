let runningRenderer = false;

function exitRenderer(event) {
    if ( (event.code == "Escape" || event == "Escape") && runningRenderer === true) {
        runningRenderer = false;
        document.getElementById("renderer-container").classList.remove("expand-in");
        document.getElementById("renderer-container").classList.add("shrink-out");
        setTimeout(() => {
            if (!runningRenderer){
                document.getElementById("projects-text-wrapper").classList.remove("slide-out");
            }
        }, 600);
    }
}

document.addEventListener('keyup', exitRenderer);


document.getElementById("renderer-button").addEventListener('click', loadRenderer);

function loadRenderer(e){
    requestAnimationFrame(refreshCycle);
    runningRenderer = true;
    document.getElementById('projects-scroll').scrollIntoView();
    document.getElementById("projects-text-wrapper").classList.add("slide-out");
    setTimeout(() => {
        if (runningRenderer){
            document.getElementById("renderer-container").classList.remove("shrink-out");
            document.getElementById("renderer-container").classList.add("expand-in");
        }
    }, 600);
}

const rendererObserver = new IntersectionObserver((element) => {
    element.forEach( (element) => {
        if (!element.isIntersecting && runningRenderer === true){
            exitRenderer("Escape");
        }
    });
});

const rendererElement = document.getElementById("renderer-container");
rendererObserver.observe(rendererElement);

setInterval(() => {
    if (runningRenderer){
        document.body.requestPointerLock();  
    } else {
        document.exitPointerLock();
    }
}, 16);

