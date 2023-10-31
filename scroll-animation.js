const skillsObserver = new IntersectionObserver((element) => {
    element.forEach( (element) => {
        if (element.isIntersecting){
            element.target.classList.remove("hidden");
            element.target.classList.add("show");
        } else {
            element.target.classList.remove("show");
            element.target.classList.add("hidden");
        }
    });
});

const rendererButton = document.getElementById("renderer-button");

function showProjects(){
    const projects = document.querySelectorAll(".project");
    const arrows = document.querySelectorAll(".project-arrow");
    let timeout = 200;
    for (let i = 0; i < projects.length; i++) {
        const arrow = arrows[i];
        const project = projects[i];
        setTimeout(() => {
            arrow.classList.add("show-arrow");
            arrow.classList.remove("hide-arrow");
            setTimeout(() => {                
                project.classList.add("show-project");
                project.classList.remove("hide-project");
            }, 500);
        }, timeout);
        timeout+=50;
        setTimeout(() => {
            rendererButton.classList.add("show-renderer-button");
            rendererButton.classList.remove("hide-renderer-button");
        }, 3000);
    }
}

function hideProjects(){
    const projects = document.querySelectorAll(".project");
    const arrows = document.querySelectorAll(".project-arrow");
    for (let i = 0; i < projects.length; i++) {
        const arrow = arrows[i];
        const project = projects[i];
        arrow.classList.remove("show-arrow");
        arrow.classList.add("hide-arrow");
        project.classList.remove("show-project");
        project.classList.add("hide-project");
        rendererButton.classList.remove("show-renderer-button");
        rendererButton.classList.add("hide-renderer-button");
    }
}

const projectsObserver = new IntersectionObserver((element) => {
    element.forEach( (element) => {
        if (element.isIntersecting && projectsShowing === false){
            line.style.animation = 'none';
            document.getElementById("renderer-error").style.opacity = 0;
            const projectContainer = document.getElementById("projects-text-wrapper");
            projectContainer.classList.add("show-projects");
            projectContainer.classList.remove("hide-projects");
            setTimeout(function() {
                line.style.animation = 'drawLine 4s linear forwards';
                showProjects();
            }, 300);
        } else if (!element.isIntersecting){
            projectsShowing=false;
            const projectContainer = document.getElementById("projects-text-wrapper");
            projectContainer.classList.remove("show-projects");
            projectContainer.classList.add("hide-projects");
            hideProjects();
        }
    });
});

const skillElements = document.getElementById("skills").querySelectorAll('.scroll-animation');
skillElements.forEach((element) =>{
    skillsObserver.observe(element)
});


const line = document.getElementById('animated-line');
const pathLength = line.getTotalLength();
line.style.strokeDasharray = pathLength;
line.style.strokeDashoffset = pathLength;
line.style.animationPlayState = 'paused';
let projectsShowing=false;

const projectsElement = document.getElementById("projects").querySelectorAll('.scroll-animation');
projectsElement.forEach((element) =>{
    projectsObserver.observe(element);
});

const header = document.getElementById("header-wrapper");
const vh = window.innerHeight/100;
const scrollPoint = 20*vh;

window.addEventListener("scroll", () => {
    if (window.scrollY > scrollPoint) {
        header.style.transform = "translateY(-100%) scaleY(0)";
    } else {
        header.style.transform = "translateY(0) scaleY(1)";
    }
});