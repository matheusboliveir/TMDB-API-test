class MovieComponent extends HTMLElement {
    constructor(){
        super();
    }
    build() {
        const shadow = this.attachShadow({mode: 'open'});
        let section = document.querySelector('section');
        let h3 = document.createElement('h3');
        let titulo = document.createElement('div');
        titulo.className = 'titulo';
        let film = document.createElement('div');
        film.className = 'movies';
        film.onclick = () => {
          body.innerHTML = `<div id="backPopUp">
          <span id="close">&times;</span>
          <div id="modalPopup">
              <img src="${poster.src}">
              <div id="conteudo">
                  <h3>${movie.name || movie.title}</h3>
                  <div id="avaliacao"><span>&#9733;</span>&nbsp;&nbsp;${movie.vote_average}/10</div>
                  <p>${movie.overview}</p>
                  <a href="movie.html?id=${movie.id}&name=${movie.name}">Ver mais</a>
              </div>
          </div>
      </div>`
          // botão de fechar popup modal
          document.querySelector('#close').addEventListener('click', () => {
            document.querySelector('#modalBoxDiv').innerHTML = '';
          });
        };
        let poster = document.createElement('img');
        if (movie.poster_path === null || undefined) {
          poster.src = `https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg`;
        }
        else {
          poster.src = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
        }
        h3.appendChild(document.createTextNode(movie.title || movie.name));
        poster.className = 'posterMovies';
        poster.title = movie.original_name || movie.original_title;
        titulo.appendChild(h3);
        film.appendChild(titulo);
        film.appendChild(poster);
        section.appendChild(film);
      
    }
}