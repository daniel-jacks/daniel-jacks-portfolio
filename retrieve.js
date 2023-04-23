
let data = fetch("../projs.json", {
    method: "GET",
    mode: "cors",
})
.then(response => {
    return response.json()
})
.then(projectData => {
    arrayOfProjects = projectData;
    let projectsElement = document.getElementById("main-page-projects-wrapper");
    projectData.forEach((proj, idx) => {
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
        projectItem.addEventListener("touchstart", function(e){
            e.stopPropagation();
            let classList = Array.from(projectItem.classList);
            if (!classList.includes("hover_effect")) {
                projectItem.classList.add("hover_effect");
        
                setTimeout(() => {
                    projectItem.classList.remove("hover_effect");
                }, 8000);
            }
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