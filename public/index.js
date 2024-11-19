let text = document.querySelectorAll(".text")
bumpGenerator(text)




function bumpGenerator(textElement) {
    textElement.forEach(element => {
        const arr = Array.from(element.innerText)
        element.innerHTML = "";
        arr.forEach(e => {
            if (e == " ") {
                element.innerHTML += e
            }
            else {
                element.innerHTML += `<span class="span">${e}</span>`;
            }
        });
        let span = document.querySelectorAll("span")
        span.forEach(element => {
            element.addEventListener("mouseover", () => {
                element.classList.add("bump");
            })
            element.addEventListener("mouseout", () => {
                setTimeout(() => {

                    element.classList.remove("bump");
                }, 600)
            })
        });

    });
}


// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

// Scroll event listener
window.addEventListener('scroll', function () {
    const offerSection = document.querySelector('.offer-section');

    // Check if the section is in the viewport
    if (isInViewport(offerSection)) {
        offerSection.classList.add('scrolled-into-view');
    }
});

const observer = new IntersectionObserver((enteries)=>{
    enteries.forEach((entery) => {
        if(entery.isIntersecting){
            entery.target.classList.add("slide-in")
        }
    })
    
})
const animate = document.querySelectorAll(".reserve-head");
animate.forEach((el) => observer.observe(el));
const animate2 = document.querySelectorAll(".ani-img");
animate2.forEach((el) => observer.observe(el));


const observer2 = new IntersectionObserver((enteries)=>{
    enteries.forEach((entery) => {
        if(entery.isIntersecting){
            entery.target.classList.add("slide-out")
        }
    })
    
})
const slideOut = document.querySelectorAll(".ani-img-r");
slideOut.forEach((el)=> observer2.observe(el));