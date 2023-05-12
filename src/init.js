/* eslint-disable no-param-reassign */
import onChange from 'on-change';
import i18n from 'i18next';
import { string, setLocale } from 'yup';
import axios from 'axios';
import _ from 'lodash';

import render from './render.js';
import texts from './ru.js';
import parseRSS from './parseRSS.js';

const getUrl = (str) => {
  const url = new URL('https://allorigins.hexlet.app/get');
  url.searchParams.set('disableCache', 'true');
  url.searchParams.set('url', str);
  return url;
};

const handleError = (error) => {
  if (error.isParsingError) {
    return 'error.parsing';
  }
  if (error.isAxiosError) {
    return 'error.network';
  }
  if (error.errors) {
    const [validationError] = error.errors;
    return validationError;
  }
  return 'error.somethingWrong';
};

const updatePosts = (watchedState, state) => {
  const { feeds } = state.rss;

  const promises = feeds.map((feed) => {
    const url = new URL(getUrl(feed.rssUrl));
    return axios.get(url)
      .then((responce) => {
        const xmlString = responce.data.contents;
        const [, posts] = parseRSS(xmlString);
        const oldPosts = state.rss.posts.filter((post) => post.feedId === feed.id);
        const newPosts = _.differenceBy(posts, oldPosts, 'title');
        newPosts.forEach((post) => {
          post.feedId = feed.id;
          post.id = _.uniqueId();
        });
        return newPosts;
      }).catch(() => []);
  });

  Promise.allSettled(promises).then((data) => {
    data.forEach((newPosts) => {
      watchedState.rss.posts = [...newPosts.value, ...state.rss.posts];
    });
  }).finally(() => setTimeout(updatePosts, 5000, watchedState, state));
};

const validateForm = (url, usedRss) => {
  const schema = string().url().required().notOneOf(usedRss);
  return schema.validate(url);
};

const control = (watchedState, state) => (event) => {
  if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
    const visitedPostId = event.target.dataset.id;
    state.uiState.visitedPostIds.add(visitedPostId);
    watchedState.uiState.currentPostId = visitedPostId;
    return;
  }

  event.preventDefault();

  const formData = new FormData(event.target);
  watchedState.processState = 'loading';
  const rssURL = formData.get('url');
  const url = new URL(getUrl(rssURL));
  const usedRss = state.rss.feeds.map((feed) => feed.rssUrl);
  validateForm(rssURL, usedRss)
    .then(() => axios.get(url))
    .then((responce) => {
      const xmlString = responce.data.contents;
      const [newFeed, newPosts] = parseRSS(xmlString, rssURL);
      newFeed.id = _.uniqueId();
      newFeed.rssUrl = rssURL;
      newPosts.forEach((post) => {
        post.feedId = newFeed.id;
        post.id = _.uniqueId();
      });
      watchedState.rss.feeds = [newFeed, ...state.rss.feeds];
      watchedState.rss.posts = [...newPosts, ...state.rss.posts];
      watchedState.processState = 'loaded';
    })
    .catch((error) => {
      state.form.error = handleError(error);
      watchedState.processState = 'failed';
    });
};

const app = () => {
  const i18nextInstance = i18n.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: texts,
    },
  }).then(() => {
    const initialState = {
      processState: 'filling',
      form: {
        error: null,
      },
      rss: {
        feeds: [],
        posts: [],
      },
      uiState: {
        visitedPostIds: new Set(),
        currentPostId: null,
      },
    };

    setLocale({
      mixed: {
        required: 'error.validation.required',
        notOneOf: 'error.validation.notOneOf',
      },
      string: {
        url: 'error.validation.url',
      },
    });

    const elements = {
      form: document.querySelector('.rss-form'),
      inputElement: document.querySelector('#url-input'),
      feedbackElement: document.querySelector('.feedback'),
      feedsColumn: document.querySelector('.feeds'),
      postsColumn: document.querySelector('.posts'),
      submitButton: document.querySelector('[aria-label="add"]'),
      modal: {
        modalWindow: document.querySelector('.modal'),
        header: document.querySelector('.modal-title'),
        content: document.querySelector('.modal-body'),
        link: document.querySelector('.full-article'),
      },
    };

    // eslint-disable-next-line max-len
    const watchedState = onChange(initialState, render(initialState, elements, i18nextInstance));

    elements.form.addEventListener('submit', control(watchedState, initialState, elements));
    elements.postsColumn.addEventListener('click', control(watchedState, initialState, elements));

    updatePosts(watchedState, initialState);
  });
};

export default app;
