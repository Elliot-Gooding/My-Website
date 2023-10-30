const observer = new IntersectionObserver((element) => {
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

const animatedElements = document.querySelectorAll(".scroll-animation");
animatedElements.forEach((element) =>{
    observer.observe(element)
});