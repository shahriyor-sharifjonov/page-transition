function pageTransition() {
    var tl = gsap.timeline();
    tl.to('ul.transition li', {duration: .5, scaleY: 1, transformOrigin: "bottom left", stagger: .2})
    tl.to('ul.transition li', {duration: .5, scaleY: 0, transformOrigin: "bottom left", stagger: .1, delay: .1})
}

function contentAnimation(){
    var tl = gsap.timeline();
    tl.from(".line span", 1, {y: 120, ease: "power1.out", delay: 1, skewY: 17, stagger: {amount: 0}}, "-=1.1")
    tl.from('.cta', {duration: .8, translateY: 50, opacity: 0})
    tl.to('img', {clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"}, "-=1.1") 
}

function setMenuLinks() {
    const links = document.querySelectorAll('.header__link');
    const location = window.location.pathname;
    links.forEach(link => {
        const linkHref = '/' + link.getAttribute('href');
        if(linkHref == location){
            link.classList.add('active');
            link.setAttribute('href', '#!');
        }else{
            link.classList.remove('active');
            const dataHref = link.getAttribute('data-href');
            link.setAttribute('href', dataHref);
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        setMenuLinks();
    }, 200);
})



function delay(n) {
    n = n || 2000;
    return new Promise(done => {
        setTimeout(() => {
            done();
        }, n);
    });
}


barba.init({
    sync: true,
    transitions: [{
        async leave(data) {
            const done = this.async();
            pageTransition();
            setMenuLinks();
            await delay(1500);
            done();
        },
        async enter(data) {
            contentAnimation();
        },
        async once(data) {
            contentAnimation();
        },
    }]
})