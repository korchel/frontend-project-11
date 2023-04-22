import { string, setLocale } from 'yup';

const validateForm = (i18nextInstance, url, feedLinks) => {
  setLocale({
    mixed: {
      required: i18nextInstance.t('error.validation.required'),
      notOneOf: i18nextInstance.t('error.validation.notOneOf'),
    },
    string: {
      url: i18nextInstance.t('error.validation.url'),
    },
  });
  const schema = string().url().required().notOneOf(feedLinks);
  return schema.validate(url);
};

export default validateForm;
