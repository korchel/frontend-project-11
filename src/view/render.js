
const renderErrors = (state, elements) => {
  if (!state.form.valid) {
    elements.inputElement.classList.add('is-invalid');
    elements.feedbackElement.classList.replace('text-success', 'text-danger');
    elements.feedbackElement.innerText = state.form.error;
  } else {
    elements.inputElement.classList.remove('is-invalid');
    elements.feedbackElement.classList.replace('text-danger', 'text-success');
    elements.feedbackElement.innerText = 'RSS успешно загружен';
  }
  elements.form.reset();
  elements.inputElement.focus();
};

const renderPosts = (state, elements) => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card', 'border-0');
  elements.postsColumn.append(cardElement);

  const cardBodyElement = document.createElement('div');
  cardBodyElement.classList.add('card-body');
  cardElement.append(cardBodyElement);

  const listHeaderElement = document.createElement('h2');
  listHeaderElement.classList.add('card-title', 'h4');
  listHeaderElement.innerText = 'Посты';
  cardBodyElement.append(listHeaderElement);

  const postsListElement = document.createElement('ul');
  postsListElement.classList.add('list-group', 'border-0', 'rounded-0');
  cardElement.append(postsListElement);

  state.rss.posts.forEach((post) => {
    const listItemElement = document.createElement('li');
    listItemElement.classList.add('list-group-item', 'd-flex', 'ustify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    postsListElement.appendChild(listItemElement);

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', post.link);
    linkElement.setAttribute('target', '_blank');
    linkElement.setAttribute('rel', 'noopener noreferrer');
    linkElement.innerText = post.title;
    listItemElement.append(linkElement);

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('type', 'button');
    button.setAttribute('data-id', '2');
    button.dataset.bsToggle = 'modal';
    button.dataset.bsTarget = toString(post.id);
    button.innerText = 'Просмотр';
    listItemElement.append(button);
    button.addEventListener('click', renderModal(elements, post))
  });
};

const renderModal = (elements, post) => (e) => {
  console.log(post.id)
  elements.modal.modalWindow.setAttribute('id', `${post.id}`);
  elements.modal.header.innerText = post.title;
  elements.modal.content.innerText = post.description;
  elements.modal.link.setAttribute('href', post.link);
}

const renderFeeds = (state, elements) => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card', 'border-0');
  elements.feedsColumn.append(cardElement);

  const cardBodyElement = document.createElement('div');
  cardBodyElement.classList.add('card-body');
  cardElement.append(cardBodyElement);

  const listHeaderElement = document.createElement('h2');
  listHeaderElement.classList.add('card-title', 'h4');
  listHeaderElement.innerText = 'Фиды';
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

const render = (state, elements) => (path, value, prevValue) => {
  switch (path) {
    case 'rss.posts':
      renderFeeds(state, elements);
      renderPosts(state, elements);
      break;
    default:
      break;
  }
  renderErrors(state, elements);
  
};

export default render;
