const $ = q => document.querySelector(q);
const form = $('form');
const formTitle = $('form h2');
const fieldset = $('fieldset');
const radioButtons = [...document.querySelectorAll('input')];
const hintSpan = $('form span');
const dialog = $('dialog');
const resultSpan = $('dialog span');

const POPUP_DURATION = 2000;
let priorTimeoutId = '';


fieldset.addEventListener('click', handleFieldsetClick);
form.addEventListener('submit', handleFormSubmit);


function handleFieldsetClick(e) {
  if (e.target != e.currentTarget) return
  radioButtons.forEach(el => el.checked = false);
}


function handleFormSubmit(e) {
  e.preventDefault(); //don't reset form just yet;

  if (!validateInput()) return;

  if (showDialog(e)) setTimeout(hideDialog, POPUP_DURATION);
}


function validateInput() {
  const radioValidity = radioButtons[0].validity?.valid;

  if (radioValidity) return true;

  // If invalid, focus on button and show tooltip
  radioButtons[0].focus();
  
  ['sr-only', 'scale-0', 'after:scale-0']
    .forEach(c => hintSpan.classList.remove(c));

  // Hide tooltip
  clearTimeout(priorTimeoutId); // Cancel hiding scheduled by multiple unintended clicks

  priorTimeoutId = setTimeout(()=> {
    hintSpan.className += ' sr-only scale-0 after:scale-0';
  }, POPUP_DURATION );

  return false

}


function showDialog() {
  // Fill up dialog template
  const formData = new FormData(form);
  const rating = formData.get('rating');

  if (rating === null) return false; // Exit and don't run hideDialog

  resultSpan.textContent = `You selected ${rating} out of 5`;

  // Hide form
  form.className += ' scale-0 invisible';

  // Show dialog
  dialog.classList.remove('scale-0');
  dialog.classList.remove('invisible');

  // Focus for screen reader
  dialog.addEventListener("transitionend", _ => {
    resultSpan.focus();
  }, {once : true});

  return true; // Run hideDialog
}


function hideDialog() {
  // Show form
  form.reset();
  form.classList.remove('scale-0');
  form.classList.remove('invisible');
  
  // Hide dialog
  dialog.className += ' scale-0 invisible';
}
