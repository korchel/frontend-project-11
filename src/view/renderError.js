const renderError = (state, elements) => {
  const { inputElement, feedbackElement, form } = elements;
  inputElement.classList.add('is-invalid');
  feedbackElement.classList.replace('text-success', 'text-danger');
  feedbackElement.innerText = state.form.error;
  form.reset();
  inputElement.focus();
};

export default renderError;
