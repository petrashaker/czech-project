import {NewsArticle} from '../news-article/news-article.js';

export class Carousel {
  constructor() {
    this.carouselItemStart = 0;
    this.carouselItemsCount = 2;

    this.header = document.querySelector(
        'header.header-news > div.header-news__container',
    );

    this.buttonLeft = document.querySelector('#carousel-button-left');
    this.buttonRight = document.querySelector('#carousel-button-right');

    this.buttonLeft.addEventListener('click', () => {
      this.carouselItemStart--;
      this.populateNewsCarousel();
    });

    this.buttonRight.addEventListener('click', () => {
      this.carouselItemStart++;
      this.populateNewsCarousel();
    });

  }

  populateNewsCarousel(news) {
    if (undefined !== news) {
      this.articles = news;
    }
    this.header.innerText = ''; //pokud bychom nedali, zprávy při posouvání by se dvojily, tímto se vyčistí div a znovu se tam vytáhnou další zprávy a tak pořád dokola
    for (let i = this.carouselItemStart; i <
    (this.carouselItemStart + this.carouselItemsCount); i++) { //startAt přidáno pro posouvání carouselu
      const newsValue = this.articles[i];
      const newsArticle = new NewsArticle();
      const newsDiv = newsArticle.createDivForNews(newsValue);
      this.header.appendChild(newsDiv); //append = připojit na konec, tzn. nahoře se header vyčistí (prázdný string) a zase se přidá další zpráva
    }
    this.checkButtonsVisibility();
  }

  checkButtonsVisibility() {
    this.buttonLeft.hidden = this.carouselItemStart === 0;
    this.buttonRight.hidden = this.carouselItemStart >=
        (this.articles.length - this.carouselItemsCount);
  }

}


