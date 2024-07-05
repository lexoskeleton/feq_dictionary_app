//Message to cheange class if input is empty:
const warningMessage = document.querySelector('.warning-message-hidden');

//Select Input field to verify emptiness:
const input = document.querySelector('#search-field');

//Add event listner to the search button
const searchButton = document
  .querySelector('.search-icon')
  .addEventListener('click', handleSearch);

//Handle Search
function handleSearch() {
  console.log('clicked', typeof input);

  if (input.value === '') {
    warningMessage.style.display = 'block';
    input.style.border = '1px solid var(--warning-color)';
  } else {
    warningMessage.style.display = 'none';
    input.style.border = 'none';
  }
}

input.addEventListener('focus', function () {
  warningMessage.style.display = 'none';
  input.style.border = '1px solid var(--primary-color)';
});
input.addEventListener('keydown', function () {
  input.style.border = 'none';
});
