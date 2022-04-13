import { MovieComponent } from "./components/movie-component.js";
import { Api } from "./util/api.js";
import queryString from './util/queryString.js';

const categoria = queryString('categoria');
const ApiTMDB = new Api(`https://api.themoviedb.org/3/${categoria || `movie/top_rated`}?api_key=61b26b6b864d50fb2fe8548fdb4e3602&language=pt-br&region=us&page=`);
const movieSection = document.querySelector('section');

window.onload = () => {
  ApiTMDB.getList(categoria == 'movie/now_playing' ? 2 : 5).then(list => list.forEach(movie => {
    const movieCard = new MovieComponent(movie);
    movieSection.appendChild(movieCard);  
  }))
    .catch(error => {
      console.log(error);
    });
};