/* eslint-disable no-param-reassign */
import axios from 'axios';

import validateForm from './validateForm.js';
import parseRSS from './parseRSS.js';
import getFeedandPosts from './getFeedandPosts.js';

export default (watchedState, state, i18nextInstance) => (event) => {
  event.preventDefault();
  watchedState.form.processState = 'fillng';
  const formData = new FormData(event.target);
  const url = formData.get('url');
  const feedLinks = watchedState.rss.feeds.map((feed) => feed.rssUrl);
  validateForm(i18nextInstance, url, feedLinks)
    .then(() => {
      state.form.error = '';
      axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
        .then((responce) => {
          watchedState.form.processState = 'loaded';
          const xmlString = responce.data.contents;
          try {
            const parsedXML = parseRSS(xmlString);
            const [newFeed, newPosts] = getFeedandPosts(parsedXML, url);
            watchedState.rss.feeds.push(newFeed);
            watchedState.rss.posts.push(...newPosts);
          } catch (e) {
            state.form.error = i18nextInstance.t('error.parsing');
            watchedState.form.processState = 'failed';
          }
        })
        .catch(() => {
          state.form.error = i18nextInstance.t('error.network');
          watchedState.form.processState = 'failed';
        });
    })
    .catch((err) => {
      const [error] = err.errors;
      state.form.error = error;
      watchedState.form.processState = 'failed';
    });
};
