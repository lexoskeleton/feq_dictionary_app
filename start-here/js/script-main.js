// To access the body of the page
const body = document.querySelector("body");

//Message to change class if input is empty:
const warningMessage = document.querySelector(".warning-message");

//Select Input field to verify emptiness:
const input = document.querySelector("#search-field");
//Select button-search:
const searchButton = document.querySelector(".search-button");

// audio element and play image
const pronunciationAudio = document.querySelector("audio");
const playImage = document.getElementById("play-image");

//Add event listener to the search button
searchButton.addEventListener("click", handleSearchButtonClick);
input.addEventListener("keyup", function (e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    searchButton.click();
  }
});

input.addEventListener("focus", handleSearchInputFocus);

//Handle Search
async function handleSearchButtonClick() {
  const allResultsContainer = document.querySelector("#all-results");
  const errorContainer = document.querySelector("#error-container");

  if (input.value === "") {
    warningMessage.classList.remove("warning-message--hidden");
    // add display: block to show a message
    warningMessage.style.display = "block";
    input.classList.add("search-input--warning");
    return;
  }
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`
  );

  // need to check for 404 error
  if (response.ok) {
    allResultsContainer.classList.remove("hidden");
    errorContainer.classList.add("hidden");

    const data = await response.json();
    const meanings = data[0].meanings;
    const phonetics = data[0].phonetics[0];

    document.querySelector(".title").innerText = input.value;

    if (phonetics.text) {
      // use specific selector
      const h2 = document.querySelector(".phonetic-subtitle");
      h2.innerText = phonetics.text;
      const audioWrapper = document.querySelector(".audio-wrapper");
      // conditional play audio display
      if (phonetics.audio.length) {
        audioWrapper.style.display = "block";
        const audio = document.querySelector("audio");
        audio.src = phonetics.audio;
      } else {
        audioWrapper.style.display = "none";
      }
    }

    const resultWrappers = document.querySelectorAll(".result-wrapper");

    resultWrappers.forEach((resultWrapper, index) => {
      const meaningResultWrapper = resultWrapper.querySelector(
        ".meaning-result_wrapper"
      );

      const listOfMeanings =
        meaningResultWrapper.querySelector(".list-of-meanings");
      listOfMeanings.innerHTML = "";

      const meaning = meanings[index];
      if (meaning) {
        const gramType = resultWrapper.querySelector(
          ".gramitical-type_wrapper h3"
        );
        gramType.innerText = meaning.partOfSpeech;

        meaning.definitions.forEach((definition) => {
          const li = document.createElement("li");
          li.textContent = definition.definition;
          if (definition.example) {
            const example = document.createElement("div");
            example.classList.add("example");
            example.textContent = `"${definition.example}"`;
            li.appendChild(example);
          }
          if (definition.synonyms.length) {
            const synonyms = document.createElement("div");
            synonyms.classList.add("subtitle-light-grey", "synonym");
            synonyms.textContent = definition.synonyms.join(", ");
            li.appendChild(synonyms);
          }
          if (definition.antonyms.length) {
            const antonyms = document.createElement("div");
            antonyms.classList.add("subtitle-light-grey", "antonym");
            antonyms.textContent = definition.antonyms.join(", ");
            li.appendChild(antonyms);
          }

          listOfMeanings.appendChild(li);
        });
        if (meaning.synonyms && meaning.synonyms.length > 0) {
          const synonyms = resultWrapper.querySelector(".synonyms_wrapper p");
          synonyms.textContent = meaning.synonyms.join(", ");
        } else {
          const synonyms = resultWrapper.querySelector(".synonyms_wrapper");
          synonyms.textContent = "";
        }
        if (meaning.antonyms && meaning.antonyms.length > 0) {
          const antonyms = resultWrapper.querySelector(".antonyms_wrapper p");
          antonyms.textContent = meaning.antonyms.join(", ");
        } else {
          const antonyms = resultWrapper.querySelector(".antonyms_wrapper");
          antonyms.textContent = "";
        }
      }
    });

    // Update source
    const sourceDiv = document.getElementById("source");
    sourceDiv.innerText = data[0].sourceUrls[0];
    sourceDiv.href = data[0].sourceUrls[0];
  } else {
    allResultsContainer.classList.add("hidden");
    errorContainer.classList.remove("hidden");
  }

  warningMessage.classList.add("warning-message--hidden");
  input.classList.remove("search-input--warning");
}

function handleSearchInputFocus() {
  warningMessage.classList.add("warning-message--hidden");
  input.classList.remove("search-input--warning");
}

function fetchDictionary(value) {
  console.log("fetchDictionary", value);
}

input.addEventListener("focus", function () {
  warningMessage.style.display = "none";
  input.classList.remove("search-box--warning");
  input.classList.add("search-box--focus");
});
input.addEventListener("keydown", function () {
  input.classList.remove("search-box--warning");
  input.classList.remove("search-box--focus");
});

// Select font-selection
const customSelect = document.querySelector(".custom-select");
const selectBtn = document.querySelector(".select-button");
const selectedValue = document.querySelector(".selected-value");
const optionsList = document.querySelectorAll(".select-dropdown li");

// add a click event to select button
selectBtn.addEventListener("click", () => {
  // add/remove active class on the container element
  customSelect.classList.toggle("active");
  // update the aria-expanded attribute based on the current state
  selectBtn.setAttribute(
    "aria-expanded",
    selectBtn.getAttribute("aria-expanded") === "true" ? "false" : "true"
  );
});

// change body font function
function handleFontChange(font) {
  switch (font) {
    case "Sans Serif":
      document.body.style.fontFamily = `"Inter", sans-serif`;
      break;
    case "Serif":
      document.body.style.fontFamily = `"Lora", serif`;
      break;
    case "Mono":
      document.body.style.fontFamily = `"Inconsolata", monospace`;
      break;
    default:
      throw new Error("Invalid font");
  }
}

// add event listener to list items
optionsList.forEach((option) => {
  function handler(e) {
    // Click Events
    if (e.type === "click" && e.clientX !== 0 && e.clientY !== 0) {
      const font = this.children[1].textContent;
      selectedValue.textContent = font;
      customSelect.classList.remove("active");
      handleFontChange(font);
    }
  }
  option.addEventListener("click", handler);
});

// Dark Mode Toggle Functionality
// DOMContentLoaded event allows for the script to run before the page loads
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector("#toggle");

  // Add event listener for the toggle button
  toggleBtn.addEventListener("click", function () {
    if (toggleBtn.checked) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  });
});

// add event listener to click play image
playImage.addEventListener("click", () => {
  pronunciationAudio.play();
});
