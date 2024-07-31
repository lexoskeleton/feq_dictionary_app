// To access the body of the page
const body = document.querySelector("body");

//Message to change class if input is empty:
const warningMessage = document.querySelector(".warning-message");

//Select Input field to verify emptiness:
const input = document.querySelector("#search-field");
//Select button-search:
const searchButton = document.querySelector(".search-button");

//Add event listner to the search button
searchButton.addEventListener("click", handleSearchButtonClick);

input.addEventListener("focus", handleSearchInputFocus);

//Handle Search
function handleSearchButtonClick() {
  if (input.value === "") {

    warningMessage.classList.remove("warning-message--hidden");
    input.classList.add("search-input--warning");
    return;
    
  } else {
    warningMessage.style.display = "none";
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.title) {
          document.getElementById(
            "title-wrapper"
          ).innerHTML = `<p>No definition found for <strong>${input.value}</strong>.</p>`;
        } else {
          const meanings = data[0].meanings;
          const phonetics = data[0].phonetics;

          document.querySelector(".title").innerText = input.value;

          phonetics.forEach((phonetic) => {
            if (phonetic.text) {
              const h2 = document.querySelector("h2");
              h2.innerText = phonetic.text;

              const audio = document.querySelector("audio");
              audio.src = phonetic.audio;
            }
          });

          const resultWrappers = document.querySelectorAll(".result-wrapper");
          resultWrappers.forEach((resultWrapper, index) => {
            const meaning = meanings[index];
            if (meaning) {
              const gramType = resultWrapper.querySelector(
                ".gramitical-type_wrapper h3"
              );
              gramType.innerText = meaning.partOfSpeech;

              const meaningResultWrapper = resultWrapper.querySelector(
                ".meaning-result_wrapper"
              );
              const listOfMeanings =
                meaningResultWrapper.querySelector(".list-of-meanings");
              listOfMeanings.innerHTML = "";

              meaning.definitions.forEach((definition) => {
                const li = document.createElement("li");
                li.innerText = definition.definition;
                listOfMeanings.appendChild(li);
              });

            }
          });

          // Update source
          const sourceDiv = document.querySelector("div > h4 + a");
          sourceDiv.innerText = data[0].sourceUrls;
          sourceDiv.href = data[0].sourceUrls;
        }
      })
      .catch((error) => {
        document.getElementById(
          "title-wrapper"
        ).innerHTML = `<p>An error occurred: ${error.message}</p>`;
      });
    input.classList.remove("search-box--warning");
  }

  warningMessage.classList.add("warning-message--hidden");
  input.classList.remove("search-input--warning");

  // The input.value can be used as input in the fetch call
  fetchDictionary(input.value);
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
// access toggle button
const toggleBtn = document.querySelector("#toggle");

function toggleDarkMode() {

  document.body.classList.toggle("dark-mode");
}

toggleBtn.addEventListener("change", toggleDarkMode);
