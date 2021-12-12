class ModalBoxComponent extends HTMLElement{
    constructor(){
        super();
    }

    build(){
        const shadow = this.attachShadow({mode:'open'});
        shadow.appendChild();

        const dscContent = this.createDescriptionContent();
        const movieName = this.createMovieName();
        const score = this.createScore();
        const overview = this.createOverview();
        const btnMais = this.createBtn();
        const modalWindow = this.createModalWindow();
        const poster = this.createPoster();        
        const modalBack = this.createModalBack();

        dscContent.appendChild(movieName);
        dscContent.appendChild(score);
        dscContent.appendChild(overview);
        dscContent.appendChild(btnMais);
        modalWindow.appendChild(poster);
        modalWindow.appendChild(dscContent);
        modalBack.appendChild(modalWindow);
        shadow.appendChild(modalBack);
        
    }

    createModalBack(){
        const div = document.createElement('div');
        div.className = 'backPopup';
        return div;
    }

    createModalWindow(){
        const div = document.createElement('div');
        div.classNae = 'modalPopup';
        return div;
    }

    createPoster(){
        const poster = document.createElement('img');
        poster.src = this.dataset.photo;
        return poster
    }

   createDescriptionContent(){
        const div = document.createElement('div');
        div.className = 'content';
        return div;
    }
    
    createMovieName() {
        const movieName = document.createElement('h3');
        const name = document.createTextNode(this.dataset.name);
        movieName.appendChild(name);
        return movieName;
    }
    
    createScore() {
        const star = document.createElement('span');
        star.innerHTML = '&#9733;';
        const scoreContent = document.createElement('div');
        const score = document.createTextNode(this.dataset.score);
        scoreContent.appendChild(star);
        scoreContent.appendChild(score);
        return scoreContent;
    }

    createOverview() {
        const overview = document.createElement('p');
        const overviewText = document.createTextNode(this.dataset.overview);
        overview.appendChild(overviewText);
        return overview;
    }

    createBtn() {
        const btnMore = document.createElement('a');
        const btnText = document.createTextNode('Ver mais');
        overview.appendChild(btnMore);
        btnMore.href = this.dataset.movieLink;
        return btnMore;
    }


}

customElements.define('modal-box', ModalBoxComponent);