const renderFeeds = (state, elements, i18nextInstance) => {
  elements.feedsColumn.innerText = '';
  const cardElement = document.createElement('div');
  cardElement.classList.add('card', 'border-0');
  elements.feedsColumn.append(cardElement);

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

export default renderFeeds;
