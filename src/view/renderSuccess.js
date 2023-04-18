const renderSuccess = (elements) => {
  elements.inputElement.classList.remove('is-invalid');
  elements.feedbackElement.classList.replace('text-danger', 'text-success');
  elements.feedbackElement.innerText = 'RSS успешно загружен';
  elements.form.reset();
  elements.inputElement.focus();
};

export default renderSuccess;
