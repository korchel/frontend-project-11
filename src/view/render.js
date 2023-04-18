import renderModal from './renderModal.js';
import renderPosts from './renderPosts.js';
import renderFeeds from './renderFeeds.js';
import renderErrors from './renderErrors.js';
import renderSuccess from './renderSuccess.js';

const render = (state, elements) => (path, value, prevValue) => {
  switch (path) {
    case 'form.processState':
      if (state.form.processState === 'loaded') {
        renderSuccess(elements);
      }
      if (state.form.processState === 'failed') {
        renderErrors(state, elements);
      }
      break;
    case 'rss.posts':
      renderPosts(state, elements);
      break;
    case 'rss.feeds':
      renderFeeds(state, elements);
      break;
    default:
      throw new Error('Unknown path');
  }
  renderErrors(state, elements);
};

export default render;
