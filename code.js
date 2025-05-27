// Dark Mode handling:
let darkmode = localStorage.getItem("darkmode") ?? 0; // Default to light mode
let darkLightModeEl = document.getElementById("lightmode-darkmode");
const darkmodeSquareEls = document.querySelectorAll(
  ".square-outline.showing"
);
let showingDarkmodeSquares = true;

function darkMode() {
  document.documentElement.classList.add("invert-dark");
  document.documentElement.classList.remove("invert-light");
  var projectsWrapper = document
    .getElementById("main-page-projects-wrapper");
  projectsWrapper.classList.add("invert-dark");
  projectsWrapper.classList.remove("invert-light");

  var checkboxEl = document.getElementById("darkmode-enabled");
  checkboxEl.classList.add("enabled");

  darkLightModeEl.setAttribute("title", "Set to light mode.");
}

function lightMode() {
  document.documentElement.classList.add("invert-light");
  document.documentElement.classList.remove("invert-dark");
  var projectsWrapper = document
    .getElementById("main-page-projects-wrapper");
  projectsWrapper.classList.add("invert-light");
  projectsWrapper.classList.remove("invert-dark");
  
  var checkboxEl = document.getElementById("darkmode-enabled");
  checkboxEl.classList.remove("enabled");

  darkLightModeEl.setAttribute("title", "Set to dark mode.");
}

if (parseInt(darkmode) === 1) {
  darkMode();
} else if (parseInt(darkmode) === 0) {
  lightMode();
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Flicker handling:
const symbols = ["λ", "%", "_", "<", "[", "{"];
const openingBrackets = ["<", "[", "{"];
const closingBrackets = [">", "]", "}"];
let previousSymbol;

const flickerInterval = 10000;
const darkmodeChangeInterval = 2000;

function flickerEffect() {
  // Depends on screen size to target correct elements
  const titleElementChildren =
    window.screen.width > 605
      ? document.getElementById("fullscreentitle").children
      : [
          ...document.getElementById("smallscreentitle1").children,
          ...document.getElementById("smallscreentitle2").children,
        ];
  
  if (!flickerBaseCase(titleElementChildren)) {
    return;
  }

  // Get random symbol that does not match previous random symbol
  let symbolIndex, randomSymbol;
  do {
    symbolIndex = Math.floor(Math.random() * symbols.length);
    randomSymbol = symbols[symbolIndex];
  } while (previousSymbol === randomSymbol);
  previousSymbol = randomSymbol;

  let firstLetterIdx;
  do {
    firstLetterIdx = Math.floor(Math.random() * titleElementChildren.length);
  } while (
    titleElementChildren[firstLetterIdx].classList.contains("flicker-disabled") || 
    openingBrackets.includes(randomSymbol) &&
    !validOpenBracket(randomSymbol, titleElementChildren, firstLetterIdx)
  );
  const firstLetter = titleElementChildren[firstLetterIdx];

  if (validOpenBracket(randomSymbol, titleElementChildren, firstLetterIdx)) {
    const closeBracket = closingBrackets[openingBrackets.findIndex(b => b === randomSymbol)];

    let secondLetterIdx;
    do {
      secondLetterIdx = Math.floor(Math.random() * titleElementChildren.length);
    } while (
      titleElementChildren[secondLetterIdx].classList.contains("flicker-disabled") || 
      !validCloseBracket(closeBracket, titleElementChildren, secondLetterIdx, firstLetterIdx)
    );

    const secondLetter = titleElementChildren[secondLetterIdx];
    replaceLetter(secondLetter, closeBracket);
  }

  replaceLetter(firstLetter, randomSymbol);
}

function flickerBaseCase(titleElementChildren) {
   return Array.from(titleElementChildren).length === 16 &&
          Array.from(titleElementChildren).filter(el => el.classList.contains("flicker-disabled")).length === 2 &&
          Array.from(titleElementChildren).filter(el => el.classList.contains("daniel")).length === 6 &&
          Array.from(titleElementChildren).filter(el => el.classList.contains("jacks")).length === 5 &&
          Array.from(titleElementChildren).filter(el => el.classList.contains("open-bracket-enabled")).length === 7 &&
          Array.from(titleElementChildren).filter(el => el.classList.contains("close-bracket-enabled")).length === 7
}

function validOpenBracket(symbol, titleElementChildren, index) {
  return openingBrackets.includes(symbol) && 
         titleElementChildren[index].classList.contains("open-bracket-enabled")
}

function validCloseBracket(symbol, titleElementChildren, index, openBracketIndex) {
  return closingBrackets.includes(symbol) && 
         titleElementChildren[index].classList.contains("close-bracket-enabled") &&
         titleMatch(titleElementChildren, index, openBracketIndex) &&
         index > openBracketIndex + 1;
}

function titleMatch(titleElementChildren, index, openBracketIndex) {
  return titleElementChildren[openBracketIndex].classList.contains("daniel") &&
         titleElementChildren[index].classList.contains("daniel") ||
         titleElementChildren[openBracketIndex].classList.contains("jacks") &&
         titleElementChildren[index].classList.contains("jacks");
}

function replaceLetter(letter, symbol) {
  const prevLetter = letter.innerHTML;
  letter.innerHTML = symbol;
  letter.classList.add("flicker");

  setTimeout(() => {
    letter.classList.remove("flicker");
  }, 200);

  setTimeout(() => {
    letter.classList.add("flicker");
    letter.innerHTML = prevLetter;
    setTimeout(() => {
      letter.classList.remove("flicker");
    }, 200);
  }, 2000);
}

function getRandomIndex(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr.splice(randomIndex, 1)[0];
}

function showAndHideDarkmodeLetters() {
  const remaining = [...darkmodeSquareEls];

  const interval = setInterval(() => {
    if (remaining.length === 0) {
      clearInterval(interval);
      showingDarkmodeSquares = !showingDarkmodeSquares;
      setTimeout(() => {
        showAndHideDarkmodeLetters();
      }, darkmodeChangeInterval * 4);
      return;
    }

    const el = getRandomIndex(remaining);
    if (showingDarkmodeSquares) {
      showLetter(el);
    } else if (!showingDarkmodeSquares) {
      hideLetter(el);
    }
  }, darkmodeChangeInterval);
}

function hideLetter(el) {
  el.classList.add("flicker");

  setTimeout(() => {
    el.classList.remove("flicker");
  }, 200);

  el.classList.add("showing");
  el.classList.remove("notshowing");
  el.children[0].classList.add("notshowing");
  el.children[0].classList.remove("showing");
}

function showLetter(el) {
  el.classList.add("flicker");

  setTimeout(() => {
    el.classList.remove("flicker");
  }, 200);

  el.classList.add("notshowing");
  el.classList.remove("showing");
  el.children[0].classList.add("showing");
  el.children[0].classList.remove("notshowing");
}

setInterval(flickerEffect, flickerInterval);
showAndHideDarkmodeLetters();

// Preview My Work on mobile devices:
const previewInterval = 3500;
let previewIdx = 0;

function previewWork() {
  if (!isMobile()) return;

  const projectItemsArr = Array.from(document.getElementsByClassName("projects-item"));

  projectItemsArr.forEach(el => {
    el.classList.remove("preview");
  });

  if (!projectItemsArr.some(el => el.classList.contains("hover_effect"))) {
    projectItemsArr[previewIdx].classList.add("preview");
    previewIdx++;
    if (previewIdx === projectItemsArr.length) {
      previewIdx = 0;
    }
  }
}

setInterval(previewWork, previewInterval)

// Event Listeners:
document.getElementById("about-link").addEventListener("click", function (e) {
  handleNavClick(e);
});
document
  .getElementById("about-link")
  .addEventListener("touchstart", function (e) {
    handleNavClick(e);
  });

document
  .getElementById("experience-link")
  .addEventListener("click", function (e) {
    handleNavClick(e);
  });
document
  .getElementById("experience-link")
  .addEventListener("touchstart", function (e) {
    handleNavClick(e);
  });

document.getElementById("contact-link").addEventListener("click", function (e) {
  handleNavClick(e);
});
document
  .getElementById("contact-link")
  .addEventListener("touchstart", function (e) {
    handleNavClick(e);
  });

darkLightModeEl.addEventListener("click", handleDarkMode);

document
  .getElementById("main-page-contact-list-emailcopy")
  .addEventListener("click", handleCopy);

// Functions to Handle Logic:
function handleDarkMode() {
  if (parseInt(darkmode) === 1) {
    lightMode();
    darkmode = 0;
    localStorage.setItem("darkmode", darkmode);
  } else if (parseInt(darkmode) === 0) {
    darkMode();
    darkmode = 1;
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
      document
        .getElementById("main-page-content-wrapper")
        .classList.remove("experience");
      document
        .getElementById("main-page-content-wrapper")
        .classList.remove("contact");
      document
        .getElementById("main-page-content-wrapper")
        .classList.remove("resume");
      document
        .getElementById("main-page-content-wrapper")
        .classList.add("about");
      document.getElementById("about-link").innerHTML = "<p>About &#x2022</p>";
      document.getElementById("experience-link").innerHTML =
        "<p>Experience</p>";
      document.getElementById("contact-link").innerHTML = "<p>Contact</p>";
      break;
    case "experience":
      document
        .getElementById("main-page-content-wrapper")
        .classList.remove("about");
      document
        .getElementById("main-page-content-wrapper")
        .classList.remove("contact");
      document
        .getElementById("main-page-content-wrapper")
        .classList.remove("resume");
      document
        .getElementById("main-page-content-wrapper")
        .classList.add("experience");
      document.getElementById("about-link").innerHTML = "<p>About</p>";
      document.getElementById("experience-link").innerHTML =
        "<p>Experience &#x2022</p>";
      document.getElementById("contact-link").innerHTML = "<p>Contact</p>";
      break;
    case "contact":
      document
        .getElementById("main-page-content-wrapper")
        .classList.remove("about");
      document
        .getElementById("main-page-content-wrapper")
        .classList.remove("experience");
      document
        .getElementById("main-page-content-wrapper")
        .classList.remove("resume");
      document
        .getElementById("main-page-content-wrapper")
        .classList.add("contact");
      document.getElementById("about-link").innerHTML = "<p>About</p>";
      document.getElementById("experience-link").innerHTML =
        "<p>Experience</p>";
      document.getElementById("contact-link").innerHTML =
        "<p>Contact &#x2022</p>";
      break;
    default:
      break;
  }
}
