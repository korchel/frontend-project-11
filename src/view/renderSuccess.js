const renderSuccess = (elements, i18nextInstance) => {
  elements.inputElement.classList.remove('is-invalid');
  elements.feedbackElement.classList.replace('text-danger', 'text-success');
  elements.feedbackElement.innerText = i18nextInstance.t('success');
  elements.form.reset();
  elements.inputElement.focus();
};

export default renderSuccess;
