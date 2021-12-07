import { Api } from "./api.js";

const categoria = queryString('categoria');
const ApiTMDB = new Api(`https://api.themoviedb.org/3/${categoria || `movie/top_rated`}?api_key=61b26b6b864d50fb2fe8548fdb4e3602&language=pt-br&region=us&page=`);

window.onload = ApiTMDB.getList(categoria == 'movie/now_playing' ? 2 : 5).then(list => list.forEach(movie => {
console.log(movie);
  let body = document.querySelector('#modalBoxDiv');
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

}))
  .catch(error => {
    console.log(error);
  });

// script para a nav ficar fixa no topo e deixar o menu visivel
window.onscroll = function scroll() {
  let header = document.querySelector('header');
  let menu = document.querySelector('#menu');
  let arrow = document.querySelector('#arrow');
  let nav = document.querySelector('nav');
  let banner = document.querySelector('.banner');
  // fixa menu
  if (window.pageYOffset > banner.height) {
    nav.classList.add("sticky");
  }
  else {
    nav.classList.remove("sticky");
  }
  // menu visivel
  if (window.pageYOffset > header.offsetTop) {
    arrow.style.display = "none";
    menu.style.display = "flex";
  }
  else {
    menu.style.display = "none";
    arrow.style.display = "inline";
  }

}