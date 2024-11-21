// Local Storage Vars

let darkmode = localStorage.getItem("darkmode") ?? 1;
let darkLightModeEl = document.getElementById("lightmode-darkmode");

function darkMode() {
    darkLightModeEl.innerHTML = "01001100"; 
    document.documentElement.style.setProperty("filter", "none");
    document.getElementById("main-page-projects-wrapper").style.setProperty("filter", "none");
}

function lightMode() {
    darkLightModeEl.innerHTML = "01000100"; 
    document.documentElement.style.setProperty("filter", "invert()");
    document.getElementById("main-page-projects-wrapper").style.setProperty("filter", "invert()");
}

if (parseInt(darkmode) === 1) {
    lightMode();
    darkLightModeEl.setAttribute("title", "Set to light mode.");
}
else if (parseInt(darkmode) === 0) {
    darkMode();
    darkLightModeEl.setAttribute("title", "Set to dark mode.");
}

// Event Listeners:

document.getElementById("about-link").addEventListener("click", function (e) {
    handleNavClick(e);
});
document.getElementById("about-link").addEventListener("touchstart", function (e) {
    handleNavClick(e);
});

document.getElementById("work-link").addEventListener("click", function (e) {
    handleNavClick(e);
});
document.getElementById("work-link").addEventListener("touchstart", function (e) {
    handleNavClick(e);
});

document.getElementById("contact-link").addEventListener("click", function (e) {
    handleNavClick(e);
});
document.getElementById("contact-link").addEventListener("touchstart", function (e) {
    handleNavClick(e);
});

darkLightModeEl.addEventListener("click", handleDarkMode);

document.getElementById("main-page-contact-list-emailcopy").addEventListener("click", handleCopy)

// Functions To Handle Logic:

function handleDarkMode() {
    if (parseInt(darkmode) === 1) {
        darkmode = 0;
        darkMode();
        localStorage.setItem("darkmode", darkmode);
    }
    else if (parseInt(darkmode) === 0) {
        darkmode = 1;
        lightMode();
        localStorage.setItem("darkmode", darkmode);
    }
}

function handleCopy() {
    navigator.clipboard.writeText("daniel.jakob.jackson@gmail.com");

    let copyEmailPopup = document.getElementById("emailcopy-popup");
    let copyEmailPopupList = Array.from(copyEmailPopup.classList);
    if (!copyEmailPopupList.includes("triggered")) {
        copyEmailPopup.classList.add("triggered");

        setTimeout(() => {
            copyEmailPopup.classList.remove("triggered");
        }, 2000);
    }
}

function handleNavClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    let currInnerHTML = e.target.innerHTML.toLowerCase().replace("•", "").trim();

    switch (currInnerHTML) {
        case "about":
            document.getElementById("main-page-content-wrapper").classList.remove("work")
            document.getElementById("main-page-content-wrapper").classList.remove("contact")
            document.getElementById("main-page-content-wrapper").classList.remove("resume")
            document.getElementById("main-page-content-wrapper").classList.add("about")
            document.getElementById("about-link").innerHTML = "<p>About &#x2022</p>"
            document.getElementById("work-link").innerHTML = "<p>Work</p>"
            document.getElementById("contact-link").innerHTML = "<p>Contact</p>"
            break;
        case "work":
            document.getElementById("main-page-content-wrapper").classList.remove("about")
            document.getElementById("main-page-content-wrapper").classList.remove("contact")
            document.getElementById("main-page-content-wrapper").classList.remove("resume")
            document.getElementById("main-page-content-wrapper").classList.add("work")
            document.getElementById("about-link").innerHTML = "<p>About</p>"
            document.getElementById("work-link").innerHTML = "<p>Work &#x2022</p>"
            document.getElementById("contact-link").innerHTML = "<p>Contact</p>"
            break;
        case "contact":
            document.getElementById("main-page-content-wrapper").classList.remove("about")
            document.getElementById("main-page-content-wrapper").classList.remove("work")
            document.getElementById("main-page-content-wrapper").classList.remove("resume")
            document.getElementById("main-page-content-wrapper").classList.add("contact")
            document.getElementById("about-link").innerHTML = "<p>About</p>"
            document.getElementById("work-link").innerHTML = "<p>Work</p>"
            document.getElementById("contact-link").innerHTML = "<p>Contact &#x2022</p>"
            break;
        default:
            break;
    }
}
