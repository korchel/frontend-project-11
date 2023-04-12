import onChange from 'on-change';
import i18n from 'i18next';

import formHandler from './controller.js';
import render from './view/render.js';
import texts from './resources.js';
// https://rt.com/rss/news

// http://www.dp.ru/exportnews.xml

// http://www.fontanka.ru/fontanka.rss

// http://lenta.ru/l/r/EX/import.rss

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
      processError: null,
      valid: true,
      error: '',
    },
    rss: {
      feeds: [],
      posts: [],
    },
    uiState: {
      visitedPosts: [],
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

  const watchedState = onChange(initialState, render(initialState, elements));

  elements.form.addEventListener('submit', formHandler(watchedState, initialState, i18nextInstance));
};

export default app;
