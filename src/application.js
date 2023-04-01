import { string, setLocale } from 'yup';
import onChange from 'on-change';
import i18n from 'i18next';
import render from './view/render.js';
import texts from './resources.js';

// https://rt.com/rss/news

// http://www.dp.ru/exportnews.xml

// http://www.fontanka.ru/fontanka.rss

// http://lenta.ru/l/r/EX/import.rss

const state = {
  form: {
    valid: true,
    feeds: [],
    error: '',
  },

};

const form = document.querySelector('.rss-form');
const watchedState = onChange(state, (path, value) => render(state, form));

const validateForm = (i18nextInstance, url) => {
  setLocale({
    string: {
      url: i18nextInstance.t('validation.errors.url'),
      notOneOf: i18nextInstance.t('validation.errors.notOneOf'),
    },
  });
  const schema = string().url().notOneOf(state.form.feeds);
  schema.validate(url)
    .then((result) => {
      state.form.feeds.push(result);
      state.form.error = '';
      watchedState.form.valid = true;
    })
    .catch((err) => {
      const [error] = err.errors;
      state.form.error = error;
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
    validateForm(i18nextInstance, url);
  });
};

export default app;
