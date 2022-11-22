import axios from 'axios';

const makeUrl = (givenUrl) => {
  const firstPart = 'https://allorigins.hexlet.app/get?url=https%3A%2F%2F';
  const secondPart = '%2F';
  const thirdPart = '&disableCache=true';
  const url = new URL (givenUrl);
  console.log(firstPart + url.host + secondPart + url.pathname + thirdPart);
  return firstPart + url.host + secondPart + url.pathname + thirdPart;
}
export default (url) => {
  axios.get(makeUrl(url))
    .then((result) => {
      const data = result.data.contents;
      console.log(data);
    })
    .catch((e) => {
      console.log(e);
    });
};