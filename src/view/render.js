import renderPosts from './renderPosts.js';
import renderFeeds from './renderFeeds.js';
import renderError from './renderError.js';
import renderSuccess from './renderSuccess.js';

const render = (state, elements, i18nextInstance) => (path, value) => {
  switch (path) {
    case 'form.processState':
      if (value === 'loaded') {
        renderSuccess(elements, i18nextInstance);
      }
      if (value === 'failed') {
        renderError(state, elements);
      }
      if (value === 'filling') {
        break;
      }
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
