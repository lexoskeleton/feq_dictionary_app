//Message to cheange class if input is empty:
const warningMessage = document.querySelector(".warning-message-hidden");

//Select Input field to verify emptiness:
const input = document.querySelector("#search-field");

//Add event listner to the search button
const searchButton = document
  .querySelector(".search-icon")
  .addEventListener("click", handleSearch);

//Handle Search
function handleSearch() {
  console.log("clicked", typeof input);

  if (input.value === "") {
    warningMessage.style.display = "block";
    input.classList.add("search-box--warning");
  } else {
    warningMessage.style.display = "none";
    input.classList.remove("search-box--warning");
  }
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
const selectFont = document.getElementById("font-select");

function handleFontChange() {
  const font = selectFont.value;
  switch (font) {
    case "Sans-Serif":
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

// Event listener on select font change
selectFont.addEventListener("change", handleFontChange);
