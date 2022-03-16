import queryString from "./util/queryString.js";
import timeConverter from './util/timeConverter.js';

let IDmovie = queryString("id");
let name = queryString("name");

function detalhes(nome, id) {
    let country = '';
    let type = nome == undefined ? 'movie' : 'tv';

    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=61b26b6b864d50fb2fe8548fdb4e3602&language=pt-br`)
        .then(res => res.json())
        .then(info => {
            let titulo = document.querySelector('#title');
            let infoTitulo = document.querySelector('#infoTitle');
            let poster = document.querySelector('#poster');
            let sinopse = document.querySelector('#sinopse');
            let nota = document.querySelector('#nota');
            let lancamento = info.release_date || info.first_air_date;
            if (info.production_countries == undefined) { country = info.origin_country[0]; } else { country = info.production_countries[0].iso_3166_1; }
            titulo.innerHTML = `${info.title || info.name}<span>(${lancamento.substr(0, 4)})</span>`;
            infoTitulo.innerHTML = `${lancamento.substr(5, 2)}/${lancamento.substr(8, 2)}/${lancamento.substr(0, 4)} (${country}) &nbsp;●&nbsp; ${info.genres[0].name} &nbsp;●&nbsp; ${timeConverter(info.runtime || info.episode_run_time[0])}`;
            nota.innerHTML = `<span>&#9733;</span> ${info.vote_average}/10 &nbsp; &nbsp; &nbsp; <span>&#10084;</span> ${info.vote_count}`;
            sinopse.innerHTML = info.overview;
            poster.src = `https://image.tmdb.org/t/p/original${info.poster_path}`
        })
    fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=61b26b6b864d50fb2fe8548fdb4e3602&language=pt-br`)
        .then(res => res.json())
        .then(data => data.cast)
        .then(elenco => {
            for (let ator of elenco) {
                let carrosel = document.querySelector('#creditos');
                let card = document.createElement('div');
                let image = document.createElement('div');
                let nome = document.createElement('p');
                let cargo = document.createElement('p');
                image.className = 'atorImg';
                if (ator.profile_path === null || undefined) {
                    image.style.backgroundImage = `url(https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png)`;
                }
                else {
                    image.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${ator.profile_path})`;
                }
                card.appendChild(image);
                nome.className = 'atorNome';
                nome.appendChild(document.createTextNode(ator.name));
                card.appendChild(nome);
                cargo.className = 'atorCargo';
                cargo.appendChild(document.createTextNode(ator.character));
                card.appendChild(cargo);
                card.className = 'person';
                carrosel.appendChild(card);
            }
        })
        .catch(error => {
            console.log(error);
        })
}

detalhes(name, IDmovie);