import { string, setLocale } from 'yup';

const validateForm = (i18nextInstance, url, feedLinks) => {
  setLocale({
    string: {
      url: i18nextInstance.t('validation.errors.url'),
      required: i18nextInstance.t('validation.errors.required'),
      notOneOf: i18nextInstance.t('validation.errors.notOneOf'),
    },
  });
  const schema = string().required().url().notOneOf(feedLinks);
  return schema.validate(url);
};

export default validateForm;
