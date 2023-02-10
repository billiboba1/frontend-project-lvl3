export const addH2 = (document) => {
  const feeds = document.querySelector('.feeds');
  const posts = document.querySelector('.posts');
  if (feeds.classList.contains('hidden')) {
    feeds.classList.remove('hidden');
    feeds.classList.add('border', 'border-primary', 'border-1', 'rounded', 'rounded-3');
    feeds.innerHTML = `<h2 class="h4 py-1 text-center">Фиды</h2>`;
    const innerFeeds = document.createElement('div');
    innerFeeds.classList.add('innerFeeds');
    feeds.append(innerFeeds);
  }
  if (posts.classList.contains('hidden')) {
    posts.classList.remove('hidden');
    posts.classList.add('border', 'border-primary', 'border-1', 'rounded', 'rounded-3');
    posts.innerHTML = `<h2 class="h4 py-1 text-center">Посты</h2>`;
    const innerPosts = document.createElement('div');
    innerPosts.classList.add('innerPosts');
    posts.append(innerPosts);
  }
  return document;
};

export const redBorder = (document, toDo = 'make') => {
  const input = document.querySelector('input');
  if (toDo === 'make') {
    input.classList.add('border', 'border-danger');
    return 'added';
  }
  input.classList.remove('border', 'border-danger');
  return 'removed';
};

export const clearInput = (document) => {
  const input = document.querySelector('input');
  console.log(input.value);
  input.value = '';
  console.log(input.value);
  return 'clear';
}