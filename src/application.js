import * as yup from 'yup';

const state = {
  valid: true,
  feeds: [],
  errors: [],
};

const schema = yup.string().url('Ссылка должна быть валидным URL').notOneOf(state.feeds, 'RSS уже существует');

const validate = (url) => {
  try {
    schema.validateSync(url);
    return null;
  } catch (error) {
    return error;
  }
};

const app = () => {
  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    const errors = validate(url);
    if (!errors) {
      state.feeds.push(url);
    }
  });
};

export default app;
