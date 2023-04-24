import onChange from 'on-change';
import i18n from 'i18next';

import formHandler from './controller.js';
import render from './view/render.js';
import texts from './ru.js';
import updatePosts from './updatePosts.js';

const app = () => {
  const i18nextInstance = i18n.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: texts,
    },
  });

  const initialState = {
    form: {
      processState: 'filling',
      error: null,
    },
    rss: {
      feeds: [],
      posts: [],
    },
    uiState: {
      visitedPostIds: new Set(),
    },
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    inputElement: document.querySelector('#url-input'),
    feedbackElement: document.querySelector('.feedback'),
    feedsColumn: document.querySelector('.feeds'),
    postsColumn: document.querySelector('.posts'),
    modal: {
      modalWindow: document.querySelector('.modal'),
      header: document.querySelector('.modal-title'),
      content: document.querySelector('.modal-body'),
      link: document.querySelector('.full-article'),
    },
  };

  const watchedState = onChange(initialState, render(initialState, elements, i18nextInstance));

  elements.form.addEventListener('submit', formHandler(watchedState, initialState, i18nextInstance));
  updatePosts(watchedState, initialState);
};

export default app;
