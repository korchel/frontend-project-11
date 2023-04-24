import { string, setLocale } from 'yup';

const validateForm = (i18nextInstance, url, usedRss) => {
  setLocale({
    mixed: {
      required: 'error.validation.required',
      notOneOf: 'error.validation.notOneOf',
    },
    string: {
      url: 'error.validation.url',
    },
  });
  const schema = string().url().required().notOneOf(usedRss);
  return schema.validate(url);
};

export default validateForm;
