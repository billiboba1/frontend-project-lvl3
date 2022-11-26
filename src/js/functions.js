export const addH2 = (document) => {
  const feeds = document.querySelector('.feeds');
  const posts = document.querySelector('.posts');
  if (feeds.classList.contains('hidden')) {
    feeds.classList.remove('hidden');
    feeds.innerHTML = `<h2 class="h4 mx-auto">Фиды</h2>`;
    const innerFeeds = document.createElement('div');
    innerFeeds.classList.add('innerFeeds');
    feeds.append(innerFeeds);
  }
  if (posts.classList.contains('hidden')) {
    posts.classList.remove('hidden');
    posts.innerHTML = `<h2 class="h4 mx-auto">Посты</h2>`;
    const innerPosts = document.createElement('div');
    innerPosts.classList.add('innerPosts');
    posts.append(innerPosts);
  }
  return document;
}