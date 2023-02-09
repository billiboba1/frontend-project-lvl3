import '../scss/style.scss';
import * as bootstrap from 'bootstrap';
import onChange from 'on-change';
import * as yup from 'yup';
import build from './build.js';
import parse from './parse.js';
import { addH2, redBorder } from './functions';
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
                  console.log(data);
                  addH2(document);
                  information.innerHTML = i18next.t('downloaded');
                  information.classList.remove('text-danger');
                  information.classList.add('text-success');
                  document.querySelector('.innerFeeds').prepend(data.feeds);
                  document.querySelector('.innerPosts').prepend(data.posts);
                  addPreview();
                })
                .catch((e) => {
                  console.log(e);
                  information.innerHTML = i18next.t('invalidRss');
                  information.classList.remove('text-success');
                  information.classList.add('text-danger');
                  console.log("error invalid rss", e);
                  //ошибка сети
                });
            };
            const newParsing = () => {
              parse(value)
                .then((data) => {
                  console.log(data);
                  const innerPosts = document.querySelector('.innerPosts');
                  console.log(data.feeds);
                  console.log(document.querySelector('.innerFeeds'), data.feeds.innerHTML);
                  if (document.querySelector('.innerFeeds').length === 0) {
                    document.querySelector('innerFeeds').prepend(data.feeds);
                  }
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
      watchedState.modalWindow.previewPost = {
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
