export const addH2 = (document) => {
    const feeds = document.querySelector('.feeds');
    const posts = document.querySelector('.posts');
    console.log(feeds, feeds.classList, feeds.classList.contains('hidden'));
    if (feeds.classList.contains('hidden')) {
        feeds.classList.remove('hidden');
        feeds.innerHTML = `<h2 class="h4 card-body">Фиды</h2>`;
    }
    if (posts.classList.contains('hidden')) {
        posts.classList.remove('hidden');
        posts.innerHTML = `<h2 class="h4 card-body">Посты</h2>`;
    }
    return document;
}