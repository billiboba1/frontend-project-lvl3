import '../scss/style.scss';
import * as bootstrap from 'bootstrap';
import onChange from 'on-change';
import * as yup from 'yup';
import build from './build.js';
import parse from './parse.js';

const state = {
  posts: '',
  error: '',
  innerPosts: [],
};

build();

const form = document.querySelector('.rss-form');
const watchedState = onChange(state, (previousValue, value) => {
  validation(value)
    .then((result) => {
      if (result) {
        const input = document.querySelector('input');
        input.classList.remove('border', 'border-danger');
        parse(value)
          .then((data) => {
            document.body.append(data);
          });
        console.log(document.body.innerHTML);
      } else {
        const input = document.querySelector('input');
        input.classList.add('border', 'border-danger');
      }
    });
});
const validation = (string) => {
  const scheme = yup.string().url();
  return scheme.isValid(string);
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  if (!state.posts.includes(formData.get('text'))) {
    watchedState.posts = formData.get('text');
  }
  else {
    watchedState.posts.unshift('copy');
  }
});
