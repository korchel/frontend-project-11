import { string, setLocale } from 'yup';
import onChange from 'on-change';
import i18n from 'i18next';
import axios from 'axios';
import render from './view/render.js';
import texts from './resources.js';
import parseRSS from './parseRSS.js';
import getFeedandPosts from './getFeedandPosts.js';

// https://rt.com/rss/news

// http://www.dp.ru/exportnews.xml

// http://www.fontanka.ru/fontanka.rss

// http://lenta.ru/l/r/EX/import.rss

const initialState = {
  form: {
    valid: true,
    feeds: [],
    posts: [],
    error: '',
  },
};

const form = document.querySelector('.rss-form');
const watchedState = onChange(initialState, (path, value) => render(initialState, form));

const validateForm = (i18nextInstance, url) => {
  setLocale({
    string: {
      url: i18nextInstance.t('validation.errors.url'),
      notOneOf: i18nextInstance.t('validation.errors.notOneOf'),
    },
  });
  const schema = string().url().notOneOf(initialState.form.feeds);
  schema.validate(url)
    .then(() => {
      watchedState.form.error = '';
      watchedState.form.valid = true;
      axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
        .then((responce) => {
          const xmlString = responce.data.contents;
          const parsedXML = parseRSS(xmlString);
          const [newFeed, newPosts] = getFeedandPosts(parsedXML);
          watchedState.form.feeds.push(newFeed);
          watchedState.form.posts.push(...newPosts);
          console.log(initialState);
        })
        .catch((e) => console.log(e));
    })
    .catch((err) => {
      const [error] = err.errors;
      watchedState.form.error = error;
      watchedState.form.valid = false;
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
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    validateForm(i18nextInstance, url, watchedState);
  });
};

export default app;
