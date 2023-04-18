import renderModal from './renderModal.js';

const renderPosts = (state, elements) => {
  elements.postsColumn.textContent = '';
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
    button.innerText = 'Просмотр';
    listItemElement.append(button);
    button.addEventListener('click', renderModal(state, elements, post));
  });
};

export default renderPosts;
