/* eslint-disable no-unused-vars */
const renderModal = (state, elements, id) => {
  const { header, content, modalWindow } = elements.modal;
  const [postToSeeInModal] = state.rss.posts.filter((post) => post.id === id);

  const visitedPostElement = document.querySelector(`[data-id='${id}']`);
  visitedPostElement.classList.remove('fw-bold');
  visitedPostElement.classList.add('fw-normal', 'link-secondary');

  modalWindow.setAttribute('id', 'modal');
  header.innerText = postToSeeInModal.title;
  content.innerText = postToSeeInModal.description;
  elements.modal.link.setAttribute('href', postToSeeInModal.link);
};

const renderError = (state, elements, i18nextInstance) => {
  const {
    inputElement, feedbackElement, form, submitButton,
  } = elements;

  submitButton.disabled = false;
  inputElement.disabled = false;

  inputElement.classList.add('is-invalid');
  feedbackElement.classList.remove('text-success', 'text-info');
  feedbackElement.classList.add('text-danger');
  feedbackElement.innerText = i18nextInstance.t(state.form.error);

  inputElement.focus();
};

const renderSuccess = (elements, i18nextInstance) => {
  const {
    inputElement, feedbackElement, form, submitButton,
  } = elements;

  submitButton.disabled = false;
  inputElement.disabled = false;

  inputElement.classList.remove('is-invalid');
  feedbackElement.classList.remove('text-danger', 'text-info');
  feedbackElement.classList.add('text-success');
  feedbackElement.innerText = i18nextInstance.t('success');

  form.reset();
  inputElement.focus();
};

const renderLoading = (elements, i18nextInstance) => {
  const { feedbackElement, inputElement, submitButton } = elements;

  submitButton.disabled = true;
  inputElement.disabled = true;

  inputElement.classList.remove('is-invalid');
  feedbackElement.classList.remove('text-danger', 'text-success');
  feedbackElement.classList.add('text-info');
  feedbackElement.innerText = i18nextInstance.t('loading');
};

const renderPosts = (state, elements, i18nextInstance) => {
  const { postsColumn } = elements;

  postsColumn.textContent = '';
  const cardElement = document.createElement('div');
  cardElement.classList.add('card', 'border-0');
  postsColumn.append(cardElement);

  const cardBodyElement = document.createElement('div');
  cardBodyElement.classList.add('card-body');
  cardElement.append(cardBodyElement);

  const listHeaderElement = document.createElement('h2');
  listHeaderElement.classList.add('card-title', 'h4');
  listHeaderElement.innerText = i18nextInstance.t('columns.posts');
  cardBodyElement.append(listHeaderElement);

  const postsListElement = document.createElement('ul');
  postsListElement.classList.add('list-group', 'border-0', 'rounded-0');
  cardElement.append(postsListElement);

  state.rss.posts.forEach((post) => {
    const listItemElement = document.createElement('li');
    listItemElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    postsListElement.appendChild(listItemElement);

    const linkElement = document.createElement('a');
    linkElement.classList.add('fw-bold');
    if (state.uiState.visitedPostIds.has(post.id)) {
      linkElement.classList.remove('fw-bold');
      linkElement.classList.add('fw-normal', 'link-secondary');
    }
    linkElement.setAttribute('data-id', `${post.id}`);
    linkElement.setAttribute('href', post.link);
    linkElement.setAttribute('target', '_blank');
    linkElement.setAttribute('rel', 'noopener noreferrer');
    linkElement.innerText = post.title;
    listItemElement.append(linkElement);

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.setAttribute('data-id', `${post.id}`);
    button.dataset.bsToggle = 'modal';
    button.dataset.bsTarget = '#modal';
    button.innerText = i18nextInstance.t('previewButton');
    listItemElement.append(button);
  });
};

const renderFeeds = (state, elements, i18nextInstance) => {
  const { feedsColumn } = elements;

  feedsColumn.innerText = '';
  const cardElement = document.createElement('div');
  cardElement.classList.add('card', 'border-0');
  feedsColumn.append(cardElement);

  const cardBodyElement = document.createElement('div');
  cardBodyElement.classList.add('card-body');
  cardElement.append(cardBodyElement);

  const listHeaderElement = document.createElement('h2');
  listHeaderElement.classList.add('card-title', 'h4');
  listHeaderElement.innerText = i18nextInstance.t('columns.feeds');
  cardBodyElement.append(listHeaderElement);

  const feedsListElement = document.createElement('ul');
  feedsListElement.classList.add('list-group', 'border-0', 'rounded-0');
  cardElement.append(feedsListElement);

  state.rss.feeds.forEach((feed) => {
    const listItemElement = document.createElement('li');
    listItemElement.classList.add('list-group-item', 'border-0', 'border-end-0');
    feedsListElement.appendChild(listItemElement);

    const titleElement = document.createElement('h3');
    titleElement.classList.add('h6', 'm-0');
    titleElement.innerText = feed.title;
    listItemElement.append(titleElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.classList.add('m-0', 'small', 'text-black-50');
    descriptionElement.innerText = feed.description;
    listItemElement.append(descriptionElement);
  });
};

const render = (state, elements, i18nextInstance) => (path, value) => {
  const { submitButton, inputElement } = elements;

  switch (path) {
    case 'processState':
      if (value === 'loaded') {
        renderSuccess(elements, i18nextInstance);
      }
      if (value === 'failed') {
        renderError(state, elements, i18nextInstance);
      }
      if (value === 'filling') {
        break;
      }
      if (value === 'loading') {
        renderLoading(elements, i18nextInstance);
      }
      break;
    case 'uiState.currentPostId':
      renderModal(state, elements, value);
      break;
    case 'rss.posts':
      renderPosts(state, elements, i18nextInstance);
      break;
    case 'rss.feeds':
      renderFeeds(state, elements, i18nextInstance);
      break;
    default:
      throw new Error('Unknown path');
  }
};

export default render;
