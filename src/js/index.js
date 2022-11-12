import '../scss/styles.scss';
import * as bootstrap from 'bootstrap';

// npm i --save bootstrap @popperjs/core

const form = document.querySelector('form');
const needingUrl = form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    return formData;
});

