import '../scss/style.scss';
import * as bootstrap from 'bootstrap';
import onChange from 'on-change';
import * as yup from 'yup';
import build from './build.js';
import parse from './parse.js';
import { addH2, clearInput, redBorder } from './functions';
import i18next from 'i18next';

export const state = {
  posts: '',
  oldPosts: [],
  modalWindow: {
    previewPost: {},
    view: 'hidden',
  },
  information: '',
};

const myState = {
  information: '',
}

build();

const form = document.querySelector('.rss-form');
const information = document.querySelector('.information');
const watchedState = onChange(state, (path, value) => {
  console.log(path, '\nvalue:', value);
  switch (path) {
    case 'posts':
      validation(value)
        .then((result) => {
          if (result) {
            const parsing = () => {
              parse(value)
                .then((data) => {
                  console.log('data:', data);
                  if (data === 'notRss') {
                    myState.information = 'invalidRss';
                    throw new Error('invalidRss');
                  } else if (data === 'networkError') {
                    myState.information = 'networkError';
                    throw new Error('networkError');
                  }
                  addH2(document);
                  information.innerHTML = i18next.t('downloaded');
                  information.classList.remove('text-danger');
                  information.classList.add('text-success');
                  document.querySelector('.innerFeeds').prepend(data.feeds);
                  document.querySelector('.innerPosts').prepend(data.posts);
                  clearInput(document);
                  addPreview();
                })
                .catch((e) => {
                  if (myState.information === 'invalidRss') {
                    information.innerHTML = i18next.t('invalidRss');
                  } else {
                    information.innerHTML = i18next.t('networkError');
                  }
                  information.classList.remove('text-success');
                  information.classList.add('text-danger');
                  clearInput(document);
                  //ошибка сети
                });
            };
            const newParsing = () => {
              parse(value)
                .then((data) => {
                  if (data === 'notRss') {
                    throw new Error('not rss');
                  } else if (data === 'networkError') {
                    throw new Error('networkError');
                  }
                  if (document.querySelector('.feeds').classList.contains('hidden')) {
                    addH2(document);
                    document.querySelector('.innerFeeds').prepend(data.feeds);
                  }
                  const innerPosts = document.querySelector('.innerPosts');
                  const posts = data.posts.querySelectorAll('div');
                  posts.forEach((newElement) => {
                    innerPosts.querySelectorAll('a').forEach((oldItem) => {
                      if (oldItem.getAttribute('title') === newElement.firstChild.getAttribute('title')) {
                        throw new Error('all old');
                      }
                    });
                    innerPosts.prepend(newElement);
                  });
                  addPreview();
                })
                .catch((e) => {
                  console.log(e);
                });
            };
            redBorder(document, 'remove');
            parsing();
            setInterval(newParsing, 5000);
          } else {
            information.innerHTML = i18next.t('invalidUrl');
            information.classList.remove('text-success');
            information.classList.add('text-danger');
            clearInput(document);
            redBorder(document);
          }
        });
      break;
    case 'modalWindow.view':
      const modal = document.querySelector('.modal');
      if (value === 'show') {
        modal.classList.add('show');
      } else {
        modal.classList.remove('show');
      }
      break;
    case 'modalWindow.previewPost':
      const title = document.querySelector('.modal-title');
      const description = document.querySelector('.modal-description');
      const linkElement = document.querySelector('.full-article');
      console.log(value, value.title);
      linkElement.setAttribute('href', value.link)
      title.innerHTML = value.title;
      description.innerHTML = value.descriprion;
      break;
    case 'information':
      information.innerHTML = i18next.t(value);
      information.classList.remove('text-success');
      information.classList.add('text-danger');
      redBorder(document);
    default:
      break;
  }
});

const validation = (string) => {
  const scheme = yup.string().url();
  return scheme.isValid(string);
};

const addPreview = () => {
  const buttons = document.querySelectorAll('.preview');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const a = button.closest('div').querySelector('a');
      a.classList.remove('fw-bold');
      a.classList.add('fw-normal');
      console.log(a.getAttribute('href'));
      watchedState.modalWindow.previewPost = {
        link: a.getAttribute('href'),
        title: a.getAttribute('title'),
        descriprion: a.getAttribute('descriprion'),
      };
      watchedState.modalWindow.view = 'show';
    });
  });
};

const close = document.querySelector('.modal-footer').querySelector('button');
close.addEventListener('click', () => {
  watchedState.modalWindow.view = 'hidden';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  if (formData.get('text') === '') {
    watchedState.information = 'notEmpty'
  } else if (!state.oldPosts.includes(formData.get('text'))) {
    watchedState.posts = formData.get('text');
    watchedState.oldPosts.push(formData.get('text'));
  } else {
    watchedState.information = 'copy';
  }
});
