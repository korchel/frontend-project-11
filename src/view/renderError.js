const renderError = (state, elements) => {
  elements.inputElement.classList.add('is-invalid');
  elements.feedbackElement.classList.replace('text-success', 'text-danger');
  elements.feedbackElement.innerText = state.form.error;
  elements.form.reset();
  elements.inputElement.focus();
};

export default renderError;
