import { string } from 'yup';
import onChange from 'on-change';
import render from './view/render.js';

const state = {
  form: {
    valid: true,
    feeds: [],
    error: '',
  },

};

const schema = string().url('Ссылка должна быть валидным URL').notOneOf(state.form.feeds, 'RSS уже существует');

const app = () => {
  const form = document.querySelector('.rss-form');

  const watchedState = onChange(state, (path, value) => render(state, form));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
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
    console.log(state);
  });
};

export default app;
