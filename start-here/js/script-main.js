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
    input.classList.add('search-box--warning');
  } else {
    warningMessage.style.display = 'none';
    input.classList.remove('search-box--warning');
  }
}

input.addEventListener('focus', function () {
  warningMessage.style.display = 'none';
  input.classList.remove('search-box--warning');
  input.classList.add('search-box--focus');
});
input.addEventListener('keydown', function () {
  input.classList.remove('search-box--warning');
  input.classList.remove('search-box--focus');
});
