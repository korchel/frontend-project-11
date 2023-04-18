const renderModal = (state, elements, post) => (e) => {
  const visitedPostId = post.id;
  state.uiState.visitedPostIds.add(visitedPostId);
  const visitedPostElement = document.querySelector(`[data-id='${visitedPostId}']`);
  visitedPostElement.classList.remove('fw-bold');
  visitedPostElement.classList.add('fw-normal', 'link-secondary');
  elements.modal.modalWindow.setAttribute('id', 'modal');
  const { header } = elements.modal;
  header.innerText = post.title;
  const { content } = elements.modal;
  content.innerText = post.description;
  elements.modal.link.setAttribute('href', post.link);
};

export default renderModal;
