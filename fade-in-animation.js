const observer = new IntersectionObserver((element) => {
    element.forEach( (element) => {
        if (element.isIntersecting){
            element.target.classList.remove("fade-out");
            element.target.classList.add("fade-in");
        } else {
            element.target.classList.remove("fade-in");
            element.target.classList.add("fade-out");
        }
    });
});

const animatedElements = document.querySelectorAll(".scroll-animation");
animatedElements.forEach((element) =>{
    observer.observe(element)
});