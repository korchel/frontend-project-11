const renderSuccess = (elements, i18nextInstance) => {
  const { inputElement, feedbackElement, form } = elements;
  inputElement.classList.remove('is-invalid');
  feedbackElement.classList.replace('text-danger', 'text-success');
  feedbackElement.innerText = i18nextInstance.t('success');
  form.reset();
  inputElement.focus();
};

export default renderSuccess;
