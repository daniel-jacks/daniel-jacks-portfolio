function handleClick(e) {
    e.preventDefault();
    
    let currInnerHTML = e.target.innerHTML.toLowerCase().replace("•", "").trim()

    switch (currInnerHTML) {
        case "about":
            document.getElementById("main-page-content-wrapper").classList.remove("work")
            document.getElementById("main-page-content-wrapper").classList.remove("contact")
            document.getElementById("main-page-content-wrapper").classList.remove("resume")
            document.getElementById("main-page-content-wrapper").classList.add("about")
            document.getElementById("about-link").innerHTML = "<p>About &#x2022</p>"
            document.getElementById("work-link").innerHTML = "<p>Work</p>"
            document.getElementById("contact-link").innerHTML = "<p>Contact</p>"
            document.getElementById("resume-link").innerHTML = "<p>Resume</p>"
            break;
        case "work":
            document.getElementById("main-page-content-wrapper").classList.remove("about")
            document.getElementById("main-page-content-wrapper").classList.remove("contact")
            document.getElementById("main-page-content-wrapper").classList.remove("resume")
            document.getElementById("main-page-content-wrapper").classList.add("work")
            document.getElementById("about-link").innerHTML = "<p>About</p>"
            document.getElementById("work-link").innerHTML = "<p>Work &#x2022</p>"
            document.getElementById("contact-link").innerHTML = "<p>Contact</p>"
            document.getElementById("resume-link").innerHTML = "<p>Resume</p>"
            break;
        case "contact":
            document.getElementById("main-page-content-wrapper").classList.remove("about")
            document.getElementById("main-page-content-wrapper").classList.remove("work")
            document.getElementById("main-page-content-wrapper").classList.remove("resume")
            document.getElementById("main-page-content-wrapper").classList.add("contact")
            document.getElementById("about-link").innerHTML = "<p>About</p>"
            document.getElementById("work-link").innerHTML = "<p>Work</p>"
            document.getElementById("contact-link").innerHTML = "<p>Contact &#x2022</p>"
            document.getElementById("resume-link").innerHTML = "<p>Resume</p>"
            break;
        case "resume":
            document.getElementById("main-page-content-wrapper").classList.remove("about")
            document.getElementById("main-page-content-wrapper").classList.remove("work")
            document.getElementById("main-page-content-wrapper").classList.remove("contact")
            document.getElementById("main-page-content-wrapper").classList.add("resume")
            document.getElementById("about-link").innerHTML = "<p>About</p>"
            document.getElementById("work-link").innerHTML = "<p>Work</p>"
            document.getElementById("contact-link").innerHTML = "<p>Contact</p>"
            document.getElementById("resume-link").innerHTML = "<p>Resume &#x2022</p>"
            break;
        default:
            break;
    }
}