import '../scss/style.scss';
import * as bootstrap from 'bootstrap';
import onChange from 'on-change';
import * as yup from 'yup';
import build from './build.js';
import parse from './parse.js';
import { addH2, deleteError } from './functions';

export const state = {
  posts: '',
  modalWindow: {
    previewPost: {},
    view: 'hidden',
  },
};

build();

const form = document.querySelector('.rss-form');
const watchedState = onChange(state, (path, previousValue, value) => {
  switch (path) {
    case 'posts':
      validation(value)
        .then((result) => {
          if (result) {
            const parsing = () => {
              parse(value)
                .then((data) => {
                  addH2(document);
                  document.querySelector('.innerFeeds').prepend(data.feeds);
                  document.querySelector('.innerPosts').prepend(data.posts);
                })
                .catch((e) => {
                  console.log(e);
                  //ошибка сети
                });
            };
            const deleteAndParse = () => {
              parse(value)
                .then((data) => {
                  const innerPosts = document.querySelector('.innerPosts');
                  const posts = data.posts.querySelectorAll('div');
                  posts.forEach((newElement) => {
                    innerPosts.querySelectorAll('a').forEach((oldItem) => {
                      if (oldItem.getAttribute('title') === newElement.firstChild.getAttribute('title')) {
                        return false;
                      }
                    });
                    innerPosts.prepend(newElement);
                  });
                  addPreview();
                })
                .catch((e) => {
                  console.log(e);
                  //ошибка сети
                });
            };
            const input = document.querySelector('input');
            input.classList.remove('border', 'border-danger');
            parsing();
            setInterval(deleteAndParse, 15000);
          } else {
            const input = document.querySelector('input');
            input.classList.add('border', 'border-danger');
          }
        });
      break;
    case 'modalWindow.view':
      const modal = document.querySelector('modal');
      if (value === 'show') {
        modal.classList.add('show');
      } else {
        modal.classList.remove('show');
      }
      break;
    case 'modalWindow.previewPost':
      const title = document.querySelector('modal-title');
      const description = document.querySelector('modal-description');
      title.innerHTML = value.title;
      description.innerHTML = value.descriprion;
      break;
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
      watchedState.previewPost = { title: a.title, descriprion: a.descriprion };
      watchedState.modalWindow = 'show';
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
  if (!state.posts.includes(formData.get('text'))) {
    watchedState.posts = formData.get('text');
  }
  else {
    watchedState.posts = 'copy';
  }
});
