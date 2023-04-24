const renderError = (state, elements, i18nextInstance) => {
  const { inputElement, feedbackElement, form } = elements;
  inputElement.classList.add('is-invalid');
  feedbackElement.classList.replace('text-success', 'text-danger');
  feedbackElement.innerText = i18nextInstance.t(state.form.error);
  form.reset();
  inputElement.focus();
};

export default renderError;
