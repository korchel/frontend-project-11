import onChange from 'on-change';
import i18n from 'i18next';
import axios from 'axios';
import render from './view/render.js';
import texts from './resources.js';
import parseRSS from './parseRSS.js';
import getFeedandPosts from './getFeedandPosts.js';
import validateForm from './validateForm.js';

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
      valid: true,
      feeds: [],
      posts: [],
      error: '',
    },
  };

  const form = document.querySelector('.rss-form');
  const watchedState = onChange(initialState, (path, value) => render(initialState, form));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    const feedLinks = watchedState.form.feeds.map((feed) => feed.link);
    console.log(feedLinks)
    validateForm(i18nextInstance, url, feedLinks)
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
          })
          .catch((e) => console.log(e));
      })
      .catch((err) => {
        const [error] = err.errors;
        watchedState.form.error = error;
        watchedState.form.valid = false;
      });
  });
};

export default app;
