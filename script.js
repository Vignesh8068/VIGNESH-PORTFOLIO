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
                (uses DOMContentLoaded instead of window
                "load" — DOMContentLoaded fires as soon as
                the page itself is ready, without waiting on
                slow/blocked third-party fonts or icon CDNs.
                A hard safety timeout also guarantees the
                splash screen can never get stuck on screen,
                even in the worst network conditions.)
=========================================================*/

function hideLoader() {

    if (loader && !loader.classList.contains("hidden")) {

        loader.classList.add("hidden");

    }

}

document.addEventListener("DOMContentLoaded", () => {

    setTimeout(hideLoader, 1200);

});

// Absolute safety net: never let the loader stay up more
// than 4 seconds, no matter what else is happening.
setTimeout(hideLoader, 4000);

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

    // If the tab is backgrounded (screen locked, app switched),
    // wait instead of letting the browser's throttled timer
    // leave a half-typed word frozen on screen for a long time.
    if (document.hidden) {

        setTimeout(typingEffect, 300);

        return;

    }

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

/*=========================================================
                    MOUSE GLOW
                (combined with cursor tracking above into a
                single mousemove listener for performance)
=========================================================*/

document.addEventListener("mousemove", (event) => {

    const x = event.clientX;

    const y = event.clientY;

    if (cursorDot) {
        cursorDot.style.left = x + "px";
        cursorDot.style.top = y + "px";
    }

    if (cursorRing) {
        cursorRing.style.left = x + "px";
        cursorRing.style.top = y + "px";
    }

    if (mouseGlow) {
        mouseGlow.style.left = x + "px";
        mouseGlow.style.top = y + "px";
    }

}, { passive: true });

/*=========================================================
                    SCROLL PROGRESS BAR
=========================================================*/

function updateScrollProgress() {

    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    // Guard against divide-by-zero on short pages
    const progress =
        totalHeight > 0
            ? (window.scrollY / totalHeight) * 100
            : 0;

    if (scrollProgress) {
        scrollProgress.style.width =
            progress + "%";
    }

}

/*=========================================================
                    NAVBAR SCROLL EFFECT
=========================================================*/

function updateNavbarState() {

    if (navbar) {
        if (window.scrollY > 60) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }
    }

}

/*=========================================================
                    MOBILE MENU
=========================================================*/

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });
}

/*=========================================================
                CLOSE MENU AFTER CLICK
=========================================================*/

document
.querySelectorAll(".nav-links a")
.forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) navLinks.classList.remove("active");
        if (menuToggle) {
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }

    });

});
/*=========================================================
                BACK TO TOP BUTTON
=========================================================*/

function updateBackToTop() {

    if (backToTop) {
        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }
    }

}

if (backToTop) {
    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });
}

/*=========================================================
                ACTIVE NAVIGATION LINK
=========================================================*/

const sections = document.querySelectorAll("section");

const navItems = document.querySelectorAll(".nav-links a");

function updateActiveNavLink() {

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

}

/*=========================================================
                CONSOLIDATED SCROLL HANDLER
                (single rAF-throttled listener instead of
                four separate scroll listeners, for smoother
                performance especially on mobile devices)
=========================================================*/

let scrollTicking = false;

function onScrollFrame() {

    updateScrollProgress();
    updateNavbarState();
    updateBackToTop();
    updateActiveNavLink();

    scrollTicking = false;

}

window.addEventListener("scroll", () => {

    if (!scrollTicking) {

        requestAnimationFrame(onScrollFrame);
        scrollTicking = true;

    }

}, { passive: true });

// Run once on load so the UI is correct even if the user
// refreshes mid-page (e.g. lands on a mid-page anchor link)
onScrollFrame();

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
                CONTACT FORM WITH FORMSPREE
=========================================================*/

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = this.querySelector('input[name="name"]');
        const email = this.querySelector('input[name="email"]');
        const subject = this.querySelector('input[name="subject"]');
        const message = this.querySelector('textarea[name="message"]');
        const submitBtn = this.querySelector('button[type="submit"]');

        // Validation
        if (
            !name || !email || !subject || !message ||
            name.value.trim() === "" ||
            email.value.trim() === "" ||
            subject.value.trim() === "" ||
            message.value.trim() === ""
        ) {
            alert("❌ Please fill in all fields.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            alert("❌ Please enter a valid email address.");
            email.focus();
            return;
        }

        // Show loading state
        if (submitBtn) {
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
        }

        // Send via FormSpree - REPLACE YOUR_FORM_ID with your actual form ID from formspree.io
        const formData = new FormData(this);
        
        fetch("https://formspree.io/f/meajpboo", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                alert("✅ Thank you! Your message has been sent successfully.\n\nI'll get back to you soon!");
                contactForm.reset();
            } else {
                alert("❌ There was an error sending your message. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("❌ Network error. Please check your connection and try again.");
        })
        .finally(() => {
            // Reset button state
            if (submitBtn) {
                submitBtn.textContent = "Send Message";
                submitBtn.disabled = false;
            }
        });

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

    // Skip on touch devices — there's no persistent mouse
    // position to tilt toward, so this is desktop-only polish.
    if (window.matchMedia("(hover:none)").matches) return;

    const x =
        (event.clientX / window.innerWidth - 0.5) * 18;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 18;

    // Real 3D tilt: rotate toward the cursor on both axes,
    // combined with the existing horizontal/vertical drift.
    const rotateY = x * 1.1;
    const rotateX = -y * 1.1;

    avatar.style.transform =

        `translate3d(${x}px, ${y}px, 0)
         rotateY(${rotateY}deg)
         rotateX(${rotateX}deg)`;

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

        const oldRipple =

            this.querySelector(".ripple");

        if (oldRipple) {

            oldRipple.remove();

        }

        this.appendChild(circle);

        // Remove the ripple once its animation finishes
        // instead of waiting for the next click
        circle.addEventListener("animationend", () => {

            circle.remove();

        });

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
