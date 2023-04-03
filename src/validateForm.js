import { string, setLocale } from 'yup';

const validateForm = (i18nextInstance, url, feedLinks) => {
  setLocale({
    string: {
      url: i18nextInstance.t('validation.errors.url'),
      notOneOf: i18nextInstance.t('validation.errors.notOneOf'),
    },
  });
  const schema = string().url().notOneOf(feedLinks);
  return schema.validate(url);
};

export default validateForm;
