/*=========================================================
                    PORTFOLIO SCRIPT
                    Vigneshwaran Portfolio
=========================================================*/

"use strict";

/*=========================================================
                    SELECTORS
=========================================================*/

const loader = document.getElementById("loader");

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

const mouseGlow = document.getElementById("mouseGlow");

const scrollProgress = document.getElementById("scrollProgress");

const backToTop = document.getElementById("backToTop");

const navbar = document.querySelector(".navbar");

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

const typingElement = document.getElementById("typingText");

/*=========================================================
                    LOADER
=========================================================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 1800);

});

/*=========================================================
                    TYPING ANIMATION
=========================================================*/

const typingWords = [

    "AI Enthusiast",

    "Future Software Engineer",

    "Problem Solver",

    "Continuous Learner",

    "Technology Explorer"

];

let wordIndex = 0;

let charIndex = 0;

let deleting = false;

function typingEffect() {

    const currentWord = typingWords[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex++);

        if (charIndex > currentWord.length) {

            deleting = true;

            setTimeout(typingEffect, 1500);

            return;

        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex--);

        if (charIndex < 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= typingWords.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typingEffect, deleting ? 45 : 90);

}

typingEffect();

/*=========================================================
                    CUSTOM CURSOR
=========================================================*/

document.addEventListener("mousemove", (event) => {

    const x = event.clientX;

    const y = event.clientY;

    cursorDot.style.left = x + "px";
    cursorDot.style.top = y + "px";

    cursorRing.style.left = x + "px";
    cursorRing.style.top = y + "px";

});

/*=========================================================
                    MOUSE GLOW
=========================================================*/

document.addEventListener("mousemove", (event) => {

    mouseGlow.style.left = event.clientX + "px";

    mouseGlow.style.top = event.clientY + "px";

});

/*=========================================================
                    SCROLL PROGRESS BAR
=========================================================*/

window.addEventListener("scroll", () => {

    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (window.scrollY / totalHeight) * 100;

    scrollProgress.style.width =
        progress + "%";

});

/*=========================================================
                    NAVBAR SCROLL EFFECT
=========================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});

/*=========================================================
                    MOBILE MENU
=========================================================*/

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuToggle.classList.toggle("active");

});

/*=========================================================
                CLOSE MENU AFTER CLICK
=========================================================*/

document
.querySelectorAll(".nav-links a")
.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.classList.remove("active");

    });

});
/*=========================================================
                BACK TO TOP BUTTON
=========================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/*=========================================================
                ACTIVE NAVIGATION LINK
=========================================================*/

const sections = document.querySelectorAll("section");

const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (

            link.getAttribute("href") === "#" + currentSection

        ) {

            link.classList.add("active");

        }

    });

});

/*=========================================================
                SCROLL REVEAL
=========================================================*/

const revealElements = document.querySelectorAll(

    ".glass-card, .section-heading"

);

const revealObserver = new IntersectionObserver(

(entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("reveal");

            setTimeout(() => {

                entry.target.classList.add("active");

            }, 100);

        }

    });

},

{

    threshold: 0.15

}

);

revealElements.forEach(element => {

    revealObserver.observe(element);

});

/*=========================================================
                LEARNING PROGRESS BAR
=========================================================*/

const progressBars = document.querySelectorAll(

    ".progress-fill"

);

const progressObserver = new IntersectionObserver(

(entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const width =

            entry.target.dataset.width;

            entry.target.style.width =

            width + "%";

        }

    });

},

{

    threshold: 0.5

}

);

progressBars.forEach(bar => {

    progressObserver.observe(bar);

});

/*=========================================================
                SIMPLE CARD TILT
=========================================================*/

const cards = document.querySelectorAll(

".glass-card"

);

cards.forEach(card => {

    card.addEventListener(

        "mousemove",

        (event) => {

            const rect =

            card.getBoundingClientRect();

            const x =

            event.clientX - rect.left;

            const y =

            event.clientY - rect.top;

            const rotateY =

            (x / rect.width - 0.5) * 10;

            const rotateX =

            (0.5 - y / rect.height) * 10;

            card.style.transform =

            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

        }

    );

    card.addEventListener(

        "mouseleave",

        () => {

            card.style.transform = "";

        }

    );

});
/*=========================================================
                CONTACT FORM VALIDATION
=========================================================*/

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            this.querySelector('input[name="name"]');

        const email =
            this.querySelector('input[name="email"]');

        const subject =
            this.querySelector('input[name="subject"]');

        const message =
            this.querySelector('textarea[name="message"]');

        if (

            name.value.trim() === "" ||

            email.value.trim() === "" ||

            subject.value.trim() === "" ||

            message.value.trim() === ""

        ) {

            alert("Please fill in all fields.");

            return;

        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {

            alert("Please enter a valid email address.");

            email.focus();

            return;

        }

        alert(

            "Thank you! Your message has been validated successfully.\n\nYou can later connect this form to Formspree, EmailJS or your own backend."

        );

        contactForm.reset();

    });

}

/*=========================================================
                SMOOTH SCROLL FOR LINKS
=========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const target = document.querySelector(

            this.getAttribute("href")

        );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});

/*=========================================================
                HERO IMAGE PARALLAX
=========================================================*/

const avatar = document.querySelector(".avatar-wrapper");

window.addEventListener("mousemove", (event) => {

    if (!avatar) return;

    const x =
        (event.clientX / window.innerWidth - 0.5) * 18;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 18;

    avatar.style.transform =

        `translate(${x}px, ${y}px)`;

});

/*=========================================================
                BUTTON RIPPLE EFFECT
=========================================================*/

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("click", function (event) {

        const circle = document.createElement("span");

        const diameter = Math.max(

            this.clientWidth,

            this.clientHeight

        );

        const radius = diameter / 2;

        circle.style.width =

            circle.style.height = diameter + "px";

        circle.style.left =

            event.clientX -

            this.getBoundingClientRect().left -

            radius + "px";

        circle.style.top =

            event.clientY -

            this.getBoundingClientRect().top -

            radius + "px";

        circle.classList.add("ripple");

        const ripple =

            this.querySelector(".ripple");

        if (ripple) {

            ripple.remove();

        }

        this.appendChild(circle);

    });

});

/*=========================================================
                CURRENT YEAR (OPTIONAL)
=========================================================*/

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent =

        new Date().getFullYear();

}

/*=========================================================
                END OF SCRIPT.JS
=========================================================*/

console.log(

"%cPortfolio Loaded Successfully 🚀",

"color:#22D3EE;font-size:16px;font-weight:bold;"

);
