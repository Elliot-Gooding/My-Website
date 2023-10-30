let runningRenderer = false;

document.addEventListener('keyup', function(event) {
    event.preventDefault()
    console.log(event.code);
    if (event.code == "Escape" && runningRenderer === true) {
        runningRenderer = false;
        document.getElementById("renderer-container").classList.remove("expand-in");
        document.getElementById("renderer-container").classList.add("shrink-out");
        setTimeout(() => {
            if (!runningRenderer){
                document.getElementById("projects-text-wrapper").classList.remove("slide-out");
            }
        }, 600);
    }
});


const loadBtn = document.getElementById("renderer-button");
loadBtn.onclick = function(e){
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