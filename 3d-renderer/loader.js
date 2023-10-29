const loadBtn = document.getElementById("renderer-button")
loadBtn.onclick = function(e){
    document.getElementById("projects-text-wrapper").classList.add("slide-out")
    setTimeout(() => {
        document.getElementById("renderer-container").classList.remove("shrink-out")
        document.getElementById("renderer-container").classList.add("expand-in")
    }, 600);
}