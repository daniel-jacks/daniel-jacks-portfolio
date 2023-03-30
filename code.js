let data = fetch("https://jte6ot75ci.execute-api.us-west-2.amazonaws.com/GetPersonalProjectData", {
    method: "GET",
    mode: "cors",
})
.then(response => {
    return response.json()
})
.then(carouselData => {
    carouselData.forEach(proj => {
        console.log(proj)
        // let carouselItemImg = document.createElement("img")
        // carouselItemImg.setAttribute("src", "https://picsum.photos/1000/600")
        
        // let carouselItemTitle = document.createElement("h3")
        // carouselItemTitle.innerText = `${proj.ProjectTitle}`
        // carouselItemTitle.classList.add("project-title")

        let carouselItemLink = document.createElement("a")
        // carouselItemLink.setAttribute("href", proj.ProjectURL)
        // carouselItemLink.setAttribute("target", "_blank")
        // carouselItemLink.setAttribute("rel", "noreferrer")
        
        // let carouselItem = document.createElement("div")
        // carouselItem.setAttribute("style", "background-image: url('https://picsum.photos/1000/600'); height: 300px; background-size: 100% 100%;")
        // carouselItem.appendChild(carouselItemTitle)
        // carouselItem.appendChild(carouselItemImg)

        // document.getElementById("main-page-carousel-wrapper").appendChild(carouselItem)
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

