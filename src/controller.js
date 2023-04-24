/* eslint-disable no-param-reassign */
import axios from 'axios';

import validateForm from './validateForm.js';
import parseRSS from './parseRSS.js';
import getFeedandPosts from './getFeedandPosts.js';

export default (watchedState, state, i18nextInstance) => (event) => {
  event.preventDefault();
  watchedState.form.processState = 'fillng'; // это допустимо?
  const formData = new FormData(event.target);
  const url = formData.get('url');
  const usedRss = state.rss.feeds.map((feed) => feed.rssUrl);
  validateForm(i18nextInstance, url, usedRss)
    .then(() => {
      state.form.error = '';
      axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
        .then((responce) => {
          watchedState.form.processState = 'loaded';
          const xmlString = responce.data.contents;
          try {
            const parsedXML = parseRSS(xmlString);
            const [newFeed, newPosts] = getFeedandPosts(parsedXML, url);
            watchedState.rss.feeds = [...state.rss.feeds, newFeed];
            watchedState.rss.posts = [...state.rss.posts, ...newPosts];
          } catch (e) {
            state.form.error = 'error.parsing';
            watchedState.form.processState = 'failed';
          }
        })
        .catch(() => {
          state.form.error = 'error.network';
          watchedState.form.processState = 'failed';
        });
    })
    .catch((err) => {
      const [error] = err.errors;
      state.form.error = error;
      watchedState.form.processState = 'failed';
    });
};
