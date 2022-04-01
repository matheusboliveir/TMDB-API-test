import { ModalBoxComponent } from './modal-box-component.js';
export class MovieComponent extends HTMLElement {
    constructor(movie){
      super();
      this.movie = movie;
      this.build();
    }
    build() {
      const shadow = this.attachShadow({mode: 'closed'});
      const cardMovie = this.createCard();
      cardMovie.appendChild(this.createTitle());
      cardMovie.appendChild(this.createPoster());
      cardMovie.addEventListener('click', this.openModal.bind(this));
      shadow.appendChild(cardMovie);
      shadow.appendChild(this.style());
    }

    createCard() {
      const card = document.createElement('div');
      card.classList.add('movie');
      return card;
    }

    createPoster() {
      const poster = document.createElement('img');
      poster.src = this.movie.poster_path ?
      `https://image.tmdb.org/t/p/original${this.movie.poster_path}`
      : `https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg`;
      this.movie.poster_path = poster.src;
      poster.classList.add("movie__poster");
      poster.title = this.movie.original_name || this.movie.original_title;
      return poster;
    }

    createTitle() {
      const title = document.createElement('h3');
      title.textContent = this.movie.title || this.movie.name;
      title.classList.add('movie__title');
      return title;
    }

    openModal() {
      this.parentElement.appendChild(new ModalBoxComponent(this.movie));
    }

    style() {
      const style = document.createElement('style');
      style.textContent = `
      .movie__poster{
        flex-grow: 2;
        order: 2;
        width: 100%;
        object-fit: cover;
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
    }
    .movie:hover{
      opacity: 0.5;
      cursor: pointer;
    }
    .movie
    {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 15px;
        text-align: center;
        height: auto;
        background-color: #01b4e4;
    }
    .movie__title{
      order: 1;
      line-height: 1.5;
      display: block;
      flex-grow: 1;
      order: 1;
      line-height:60px;
      height: 60px;
      width: 98%;
      margin: 0 1%;
      color: #0d253f;
      font-size: 12pt;
    }
      `;
      return style;
    }

}

customElements.define('movie-card', MovieComponent);