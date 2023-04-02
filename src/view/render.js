const inputElement = document.querySelector('#url-input');
const feedbackElement = document.querySelector('.feedback');

const render = (state, form) => {
  if (!state.form.valid) {
    inputElement.classList.add('is-invalid');
    feedbackElement.classList.replace('text-success', 'text-danger');
    feedbackElement.innerText = state.form.error;
  } else {
    inputElement.classList.remove('is-invalid');
    feedbackElement.classList.replace('text-danger', 'text-success');
    feedbackElement.innerText = 'RSS успешно загружен';
  }
  form.reset();
  inputElement.focus();
};

export default render;
