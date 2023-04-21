document.getElementById("about-link").addEventListener("click", function (e) {
    handleNavClick(e);
});
document.getElementById("work-link").addEventListener("click", function (e) {
    handleNavClick(e);
});
document.getElementById("contact-link").addEventListener("click", function (e) {
    handleNavClick(e);
});

let data = fetch("https://z1m3d49k84.execute-api.us-west-2.amazonaws.com/projects", {
    method: "GET",
    mode: "cors",
})
.then(response => {
    return response.json()
})
.then(carouselData => {
    arrayOfProjects = carouselData;
    let projectsElement = document.getElementById("main-page-projects-wrapper");
    carouselData.forEach((proj, idx) => {
        let projectLink = document.createElement("a");
        projectLink.innerHTML = "Go to project &rarr;";
        projectLink.setAttribute("href", proj.ProjectURL);
        projectLink.setAttribute("rel", "noreferrer");
        projectLink.setAttribute("target", "_blank");
        
        let projectLinkDiv = document.createElement("div");
        projectLinkDiv.appendChild(projectLink);

        let projectDetails = document.createElement("p");
        projectDetails.innerHTML = proj.projectDetails;

        let projectTitle = document.createElement("h4");
        projectTitle.textContent = proj.projectTitle;

        let hoverArea = document.createElement("div");
        hoverArea.appendChild(projectTitle);
        hoverArea.appendChild(projectDetails);
        hoverArea.appendChild(projectLinkDiv);

        let projectImg = document.createElement("img");
        projectImg.setAttribute("src", proj.projectImg);
        projectImg.setAttribute("alt", proj.projectImgDesc);
        
        let projectItem = document.createElement("div");
        projectItem.addEventListener("touchstart", function(){
            let classList = Array.from(projectItem.classList);
            if (classList.includes("hover_effect")) {
                projectItem.classList.remove("hover_effect");
                return;
            }
            projectItem.classList.add("hover_effect")
        });
        projectItem.setAttribute("class", "projects-item")
        projectItem.setAttribute("style", `--order: ${idx }`)
        projectItem.appendChild(projectImg);
        projectItem.appendChild(hoverArea);
        projectsElement.appendChild(projectItem);
    })
})
.catch(err => {
    console.error(err)
})

function handleNavClick(e) {
    e.preventDefault();
    
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
