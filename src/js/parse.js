import axios from 'axios';

const makeUrl = (givenUrl) => {
  const firstPart = 'https://allorigins.hexlet.app/get?url=https%3A%2F%2F';
  const secondPart = '%2F';
  const thirdPart = '&disableCache=true';
  const url = new URL(givenUrl);
  return firstPart + url.host + secondPart + url.pathname + thirdPart;
};

export default (url) => {
  return axios.get(makeUrl(url))
    .then((result) => {
      const data = result.data.contents;
      const html = document.createElement('data');
      html.innerHTML = data;
      console.log(html);
      console.log(html.querySelector('rss'));
      if (html.querySelector('rss') === null) {
        throw new Error('not rss');
      }
      return parsing(html);
    })
    .catch((e) => {
      console.log(e);
    });
};

const parsing = (html) => {
  const title = html.querySelector('title');
  const description = html.querySelector('description');
  const titleContent = `<h3 class = "h6 m-0">${title.innerHTML}</h3>` +
    `<p class = "m-0 small text-black-50">${description.innerHTML}</p>`;
  const feeds = document.createElement('div');
  feeds.classList.add('my-2');
  feeds.innerHTML = titleContent;
  const items = html.querySelectorAll('item');
  console.log(items);
  const posts = document.createElement('div');
  items.forEach((item) => {
    const div = document.createElement('div');
    div.classList.add('row');
    const a = document.createElement('a');
    a.setAttribute('title', item.querySelector('title').innerHTML);
    if (item.querySelector('description').querySelector('p') !== null) {
      a.setAttribute('descriprion', item.querySelector('description').querySelector('p').innerHTML);
    } else {
      a.setAttribute('descriprion', item.querySelector('description').innerHTML);
    }
    a.setAttribute('href', item.querySelector('link').nextSibling.textContent);
    a.classList.add('my-2', 'fw-bold');
    a.textContent = item.querySelector('title').innerHTML;
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'preview');
    button.innerHTML = 'Предпросмотр';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#myModal');
    
    div.appendChild(a);
    div.appendChild(button);
    posts.appendChild(div);
  });
  return { feeds, posts };
};