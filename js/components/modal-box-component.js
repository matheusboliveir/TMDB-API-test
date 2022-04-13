export class ModalBoxComponent extends HTMLElement {

    constructor(movie) {
        super();
        this.movie = movie;
        this.build();
    };

    build() {
        const shadow = this.attachShadow({ mode: 'open' });
        const modal = this.createDiv('modal');
        const modalContainer = this.createDiv('modal__container');
        const modalContent = this.createDiv('modal__content');
        const modalCloseButton = this.createModalButton('modal__button--close', '×');
        modalCloseButton.addEventListener('click', this.closeModal.bind(this));
        const modalMoreButton = this.createModalButton('modal__button--more', 'Ver mais', `movie.html?id=${this.movie.id}&name=${this.movie.name}`);

        modalContent.appendChild(this.createModalTitle());
        modalContent.appendChild(this.createModalRate());
        modalContent.appendChild(this.createModalDescription());
        modalContent.appendChild(modalMoreButton);

        modalContainer.appendChild(this.createModalPoster());
        modalContainer.appendChild(modalContent);

        modal.appendChild(modalCloseButton);
        modal.appendChild(modalContainer);

        shadow.appendChild(modal);
        shadow.appendChild(this.style());
    };

    createDiv(className = '') {
        const div = document.createElement('div');
        div.classList.add(className);
        return div;
    };

    createModalPoster() {
        const modalPoster = document.createElement('img');
        modalPoster.classList.add('modal__poster');
        modalPoster.src = this.movie.poster_path;
        return modalPoster;
    };

    createModalTitle() {
        const modalTitle = document.createElement('h3');
        modalTitle.classList.add('modal__title');
        modalTitle.textContent = this.movie.name || this.movie.title;
        return modalTitle;
    }

    createModalDescription() {
        const modalDescription = document.createElement('p');
        modalDescription.classList.add('modal__description');
        modalDescription.textContent = this.movie.overview;
        return modalDescription;
    }

    createModalRate() {
        const modalRate = document.createElement('span');
        modalRate.classList.add('modal__rate');
        modalRate.textContent = this.movie.vote_average + '/10';
        return modalRate;
    }

    createModalButton(className, text, link = false) {
        const modalButton = document.createElement('a');
        modalButton.textContent = text;
        modalButton.classList.add(className);
        if (link) {
            modalButton.href = link;
        }
        return modalButton;
    }

    style() {
        const style = document.createElement("style");
        style.textContent = `
    * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    .modal {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .modal__container {
        background-color: #0d253f;
        margin: auto;
        border-radius: 2px;
        width: 60%;
        text-align: center;
    }
    
    .modal__poster {
        float: left;
        width: 50%;
        border-top-left-radius: 1px;
        border-bottom-left-radius: 1px;
    }
    
    .modal__title {
        padding: 15px 0px;
        font-size: 18pt;
        margin: 0;
        color: #01b4e4;
    }
    
    .modal__rate {
        display: block;
        background:#01b4e4;
        text-align: center;
        line-height: 40px;
        color: #0d253f;
        font-size: 16pt;
        font-weight: bolder;
    }
    .modal__rate::before {
        content: "★";
        margin-right: 8px;
        color: #83e49d;
    }
    .modal__description {
        padding: 0px 20px;
        text-align: left;
        color: #01b4e4;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
    }
    
    .modal__content{
        color: #01b4e4;
        float: right;
        width: 50%;
    }
    .modal__button--more {
        color: #01b4e4;
        font-size: 12pt;
        line-height: 50px;
        background: transparent;
        padding: 0px 40px;
        border: solid 1px #01b4e4;
        border-radius: 5px;
        text-decoration: none;
        cursor: pointer;
    }
    .modal__button--more:hover {
        background: #01172e;
        color: #01b4e4;
    }
    .modal__button--more:active {
        background: #01b4e4;
        color: #01172e;
    }
    .modal__button--close {
        position: absolute;
        text-align: right;
        z-index: -1;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.4);
        top: 0;
        right: 0;
        overflow: hidden;
        color: #01b4e4;
        font-size: 28pt;
        font-weight: bold;
        cursor: pointer;
        box-sizing: border-box;
        padding: 0 16px; 
    }
    
        `;
        return style;
    };

    closeModal() {
        this.parentElement.removeChild(this);
    };
};

customElements.define('modal-box', ModalBoxComponent);