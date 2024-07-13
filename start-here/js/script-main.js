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
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.title) {
          document.getElementById(
            "title-wrapper"
          ).innerHTML = `<p >No definition found for <strong>${input.value}</strong>.</p>`;
        } else {
          const meanings = data[0].meanings;
          const phonetics = data[0].phonetics;
          let resultHTML = `<h1 class="title">${input.value}</h1>
          `;
          phonetics.forEach((phonetic) => {
            if (phonetic.text)
              resultHTML += ` <div> <h2>${phonetic.text}</h2>
            <div class="audio-wrapper">
            <audio src="">${phonetic.audio}</audio>
            <img
              width="48px"
              height="48px"
              src="./assets/images/icon-play.svg"
              alt="Play"
            />
          </div>
          </div>
            `;
          });
          meanings.forEach((meaning) => {
            resultHTML += `
            <h3>${meaning.partOfSpeech}</h3>`;
            meaning.definitions.forEach((definition, index) => {
              resultHTML += `<p>${index + 1}. ${definition.definition}</p>`;
            });
          });
          document.getElementById("title-wrapper").innerHTML = resultHTML;
        }
      })
      .catch((error) => {
        document.getElementById(
          "title-wrapper"
        ).innerHTML = `<p>An error occurred: ${error.message}</p>`;
      });
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
