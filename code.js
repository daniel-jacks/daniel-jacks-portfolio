// Dark Mode handling:
let darkmode = localStorage.getItem("darkmode") ?? 0; // Default to light mode
let darkLightModeEl = document.getElementById("lightmode-darkmode");

function darkMode() {
  darkLightModeEl.innerHTML = "01001100";
  document.documentElement.style.setProperty("filter", "none");
  document
    .getElementById("main-page-projects-wrapper")
    .style.setProperty("filter", "none");
  
  darkLightModeEl.setAttribute("title", "Set to light mode.");
}

function lightMode() {
  darkLightModeEl.innerHTML = "01000100";
  document.documentElement.style.setProperty("filter", "invert()");
  document
    .getElementById("main-page-projects-wrapper")
    .style.setProperty("filter", "invert()");
  
  darkLightModeEl.setAttribute("title", "Set to dark mode.");
}

if (parseInt(darkmode) === 1) {
  darkMode();
} else if (parseInt(darkmode) === 0) {
  lightMode();
}

// Tickle Flicker handling:
const symbols = ["λ", "%", "_", "[", "{"];
const openingBrackets = ["[", "{"];
const closingBrackets = ["]", "}"];
const validOpeningBracketIndices = [0, 1, 2, 3, 7, 8, 9];
let previousSymbol;

const interval = 13500;

function flickerEffect() {
  const titleElementChildren =
    window.screen.width > 605
      ? document.getElementById("fullscreentitle").children
      : [
          ...document.getElementById("smallscreentitle1").children,
          ...document.getElementById("smallscreentitle2").children,
        ];

  let symbolIndex, randomSymbol;
  do {
    symbolIndex = Math.floor(Math.random() * symbols.length);
    randomSymbol = randomSymbol = symbols[symbolIndex];
    console.log(randomSymbol);
  } while (previousSymbol === randomSymbol);

  previousSymbol = randomSymbol;

  let letterIndex;
  do {
    letterIndex = Math.floor(Math.random() * titleElementChildren.length);
  } while (
    titleElementChildren[letterIndex].classList.contains("flicker-disabled") ||
    (openingBrackets.includes(randomSymbol) &&
      !validOpeningBracketIndices.includes(letterIndex))
  );

  const firstLetter = titleElementChildren[letterIndex];
  if (openingBrackets.includes(randomSymbol)) {
    const closingSymbol =
      closingBrackets[openingBrackets.findIndex((v) => v === randomSymbol)];
    let secondLetterIndex;
    do {
      secondLetterIndex = Math.floor(
        Math.random() * titleElementChildren.length
      );
    } while (
      titleElementChildren[secondLetterIndex].classList.contains(
        "flicker-disabled"
      ) ||
      secondLetterIndex <= letterIndex ||
      secondLetterIndex === letterIndex + 1 ||
      secondLetterIndex > letterIndex + 3
    );
    const secondLetter =
      titleElementChildren[secondLetterIndex] ??
      titleElementChildren[titleElementChildren.length - 1];
    replaceLetter(secondLetter, closingSymbol);
  }

  replaceLetter(firstLetter, randomSymbol);
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
  }, 3000);
}

setInterval(flickerEffect, interval);

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
