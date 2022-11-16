import ru from '../../locales/ru.js';
import i18next from 'i18next';
import * as yup from 'yup';

export default build = () => {
  i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    }
  });

  yup.setLocale({
    mixed: {
      url: 'it should be a valid URL',
    }
  })
};