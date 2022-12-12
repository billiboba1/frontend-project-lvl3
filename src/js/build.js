import i18next from 'i18next';
import * as yup from 'yup';

export default () => {
  i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: {
        translation: {
          downloaded: 'RSS успешно загружен',
          copy: 'RSS уже существует',
          invalidRss: 'Ресурс не содержит валидный RSS',
          invalidUrl: 'Ссылка должна быть валидным URL',
          notEmpty: 'Не должно быть пустым',
          error: 'Ошибка сети',
          view: 'Просмотр',
        },
      },
    },
  });
  
  yup.setLocale({
    mixed: {
      url: 'it should be a valid URL',
    }
  });
};
