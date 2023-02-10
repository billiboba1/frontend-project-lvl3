import axios from 'axios';

const proxyUrl = (givenUrl) => {
  return `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(givenUrl)}`;
};

export default (url) => {
  return axios.get(proxyUrl(url))
    .then((result) => {
      console.log('axios.get success');
      const data = result.data.contents;
      const html = document.createElement('data');
      html.innerHTML = data;
      console.log(html);
      if (html.querySelector('rss') === null) {
        throw new Error('not rss');
      }
      console.log('parsing 1');
      return parsing(html);
    })
    .catch((e) => {
      throw e;
    });
};

const parsing = (html) => {
  console.log('parsing 2');
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
    div.classList.add('row', 'my-2');
    const a = document.createElement('a');
    a.setAttribute('title', item.querySelector('title').innerHTML);
    if (item.querySelector('description').querySelector('p') !== null) {
      a.setAttribute('descriprion', item.querySelector('description').querySelector('p').innerHTML);
    } else {
      a.setAttribute('descriprion', item.querySelector('description').innerHTML);
    }
    a.setAttribute('href', item.querySelector('link').nextSibling.textContent);
    a.classList.add('fw-bold');
    a.textContent = item.querySelector('title').innerHTML;
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'preview');
    button.innerHTML = 'Предпросмотр';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#myModal');
    div.appendChild(a);
    div.appendChild(button);
    posts.appendChild(div);
  });
  return { feeds, posts };
};