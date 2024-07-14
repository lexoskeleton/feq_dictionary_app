//Message to cheange class if input is empty:
const warningMessage = document.querySelector(".warning-message-hidden");
//Select Input field to verify emptiness:
const input = document.querySelector("#search-field");

//Add event listner to the search button
const searchButton = document
  .querySelector(".search-icon")
  .addEventListener("click", handleSearch);

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

              if (meaning.partOfSpeech === "verb") {
                const example = resultWrapper.querySelector(".example");
                if (example) {
                  example.querySelector("p").innerText =
                    "“Keyboarding is the part of this job I hate the most.”";
                }
              }
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
