import axios from 'axios';

import validateForm from './validateForm.js';
import parseRSS from './parseRSS.js';
import getFeedandPosts from './getFeedandPosts.js';

export default (watchedState, state, i18nextInstance) => (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const url = formData.get('url');
  const feedLinks = watchedState.rss.feeds.map((feed) => feed.link);
  validateForm(i18nextInstance, url, feedLinks)
    .then(() => {
      state.form.error = '';
      watchedState.form.valid = true;
      axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
        .then((responce) => {
          const xmlString = responce.data.contents;
          const parsedXML = parseRSS(xmlString);
          const [newFeed, newPosts] = getFeedandPosts(parsedXML);
          state.rss.feeds.push(newFeed);
          watchedState.rss.posts.push(...newPosts);
        })
        .catch((e) => console.log(e));
    })
    .catch((err) => {
      const [error] = err.errors;
      state.form.error = error;
      console.log(state)
      watchedState.form.valid = false;
    });
};
