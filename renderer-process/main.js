import { NewsArticle } from './components/news-article/news-article.js';
import { Carousel } from './components/carousel/carousel.js';
import { Day } from './components/day/day.js';

const header = document.querySelector('header.header-news > div.header-news__container'); 

const carousel = document.querySelector('app-carousel');


fetch('http://localhost:3000/news.json')
    .then(serverResponse => serverResponse.text())
    .then(responseText => {
        const data = JSON.parse(responseText);
        carousel.populateNewsCarousel(data.articles); 
    });


const mainContent = document.querySelector('section.main-content');

const currentDate = new Date();
const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

for (let i = 1; i <= maxDate; i++) {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    mainContent.appendChild(new Day(dayDate));
}

const openModalButton = document.querySelector('#open-modal');
openModalButton.addEventListener('click', () => {
    showDayModal().then((result) => console.log(result));
});
 
function showDayModal() {
    const promiseResult = new Promise((resolve, reject) => {
        const template = document.querySelector('#modal-template');
        const modal = template.content.cloneNode(true);

        const closeAction = () => {
            const child = document.querySelector('section.modal-container');
            document.body.removeChild(child);
            resolve(null);
        }

        modal.querySelector('#close-modal').addEventListener('click',  closeAction);
        modal.querySelector('#cancel-button').addEventListener('click', closeAction);
        modal.querySelector('#save-button').addEventListener('click', () => {
            const formRef = document.querySelector('#modal-form');
            const formData = new FormData(formRef);
            const isHoliday = formData.get('isHolidayControl') === 'on';
            // resolve('ahoj!!!');
            resolve({isHoliday : isHoliday});
        });

        document.body.appendChild(modal);
    });

    return promiseResult;
}

