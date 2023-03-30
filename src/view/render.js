const inputElement = document.querySelector('#url-input');
const feedbackElement = document.querySelector('.feedback');

const render = (state, form) => {
  if (!state.form.valid) {
    inputElement.classList.add('is-invalid');
  } else {
    inputElement.classList.remove('is-invalid');
  }
  feedbackElement.innerText = state.form.error;
  form.reset();
  inputElement.focus();
};

export default render;
