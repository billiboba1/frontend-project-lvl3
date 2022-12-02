import '../scss/style.scss';
import * as bootstrap from 'bootstrap';
import onChange from 'on-change';
import * as yup from 'yup';
import build from './build.js';
import parse from './parse.js';
import { addH2, deleteError, redBorder } from './functions';

export const state = {
  posts: '',
  oldPosts: [],
  modalWindow: {
    previewPost: {},
    view: 'hidden',
  },
};

build();

const form = document.querySelector('.rss-form');
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
                  addH2(document);
                  document.querySelector('.innerFeeds').prepend(data.feeds);
                  document.querySelector('.innerPosts').prepend(data.posts);
                  addPreview();
                })
                .catch((e) => {
                  console.log("error set'",e);
                  //ошибка сети
                });
            };
            const newParsing = () => {
              parse(value)
                .then((data) => {
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
            //setInterval(newParsing, 5000);
          } else {
            redBorder(document);
          }
        });
      break;
    case 'modalWindow.view':
      const modal = document.querySelector('.modal');
      if (value === 'show') {
        modal.classList.add('show');
        $('#myModal').modal('show');
      } else {
        modal.classList.remove('show');
        $('#myModal').modal('hide');
      }
      break;
    case 'modalWindow.previewPost':
      const title = document.querySelector('.modal-title');
      const description = document.querySelector('.modal-description');
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
  if (!state.oldPosts.includes(formData.get('text'))) {
    watchedState.posts = formData.get('text');
    watchedState.oldPosts.push(formData.get('text'));
  } else {
    //copy
  }
});
