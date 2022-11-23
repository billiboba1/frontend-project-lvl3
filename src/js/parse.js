import axios from 'axios';

const makeUrl = (givenUrl) => {
  const firstPart = 'https://allorigins.hexlet.app/get?url=https%3A%2F%2F';
  const secondPart = '%2F';
  const thirdPart = '&disableCache=true';
  const url = new URL(givenUrl);
  console.log(firstPart + url.host + secondPart + url.pathname + thirdPart);
  return firstPart + url.host + secondPart + url.pathname + thirdPart;
};

export default (url) => {
  return axios.get(makeUrl(url))
    .then((result) => {
      const data = result.data.contents;
      const html = document.createElement('data');
      html.innerHTML = data;
      const title = html.querySelector('title');
      const description = html.querySelector('description');
      const feeds = `<h3 class = "h6 m-0">${title.innerHTML}</h3>
      <p class = "m-0 small text-black-50">${description.innerHTML}</p>`;
      const posts = ``;
      returnData.classList.add('row');
      console.log(returnData);
      return { 
        feed: feeds,
        post: posts,
      };
    })
    .catch((e) => {
      console.log(e);
    });
};