export class NavMenuComponent extends HTMLElement {
    constructor() {
        super();
        this.listItems = [];
        this.build();
    }

    build() {
        const shadow = this.attachShadow({mode:'open'});
        const nav = this.createNav();
        const menu = this.createMenu();
        const openButton = this.createOpenMenuButton();
        const searchBar = this.createSearchBar();
        this.listItems = [
            openButton,
            this.createMenuItem('Home','index.html?categoria=movie/top_rated','home-icon'),
            searchBar,
            this.createMenuItem('Filmes','index.html?categoria=movie/top_rated','clapperboard-icon'),
            this.createMenuItem('Séries','index.html?categoria=tv/top_rated','series-icon'),
            this.createMenuItem('Em cartaz','index.html?categoria=movie/now_playing','in-theaters-icon'),
            this.createMenuItem('Categorias','#','categories-icon'),
            this.createLogo()
        ];
        
        openButton.children[0].addEventListener('click', this.openMenu.bind(this));
        searchBar.children[0].children[1].addEventListener('click', this.searchField.bind(this));
        searchBar.children[0].children[0].addEventListener('keypress',
        event => event.key === 'Enter' ? this.searchField.bind(this)(searchBar.children[0].children[0]) : null);
        this.listItems.forEach(item => {
            menu.appendChild(item);
        });
        nav.appendChild(menu);
        shadow.appendChild(this.createStyleLink('CSS/navMenu.css'));
        shadow.appendChild(this.createStyleLink('CSS/styles.css'));
        shadow.appendChild(nav);
    }

    createNav() {
        const nav = document.createElement('nav');
        nav.classList.add('navbar');
        return nav;
    }

    createMenu() {
        const ulMenu = document.createElement('ul');
        ulMenu.classList.add('navbar__menu');
        return ulMenu;
    }

    createOpenMenuButton() {
        const menuButton = this.createMenuItem('TMDB - Movies App','#menuExpandButton','right-arrow-icon');
        menuButton.children[0].classList.add('menu__expand-button');
        menuButton.children[0].title = 'abre menu';
        menuButton.children[0].href = '#menuExpandButton';
        menuButton.children[0].id = 'menuExpandButton';
        menuButton.children[0].children[0].ariaHidden = 'true';
        menuButton.children[0].children[0].classList.add('film-icon');
        return menuButton;
    }

    createMenuItem(title, link, icon = '') {
        const menuItem = document.createElement('li');
        const linkItem = document.createElement('a');
        const textItem = document.createElement('span');
        
        linkItem.classList.add('center' , 'menu__item' , icon);
        linkItem.href = link;
        textItem.classList.add('item__text', 'hidden');
        textItem.textContent = title;
        linkItem.appendChild(textItem);
        menuItem.appendChild(linkItem);
        return menuItem;
    }

    createSearchBar() {
        const menuItem = document.createElement('li');
        const input = document.createElement('input');
        const btnSearch = document.createElement('button');
        const container = document.createElement('div');

        container.classList.add('center','menu__item','reverse');
        input.title = 'pesquisa';
        input.classList.add('item__input','hidden');
        input.type = 'search';
        btnSearch.title = 'pesquisar';
        btnSearch.classList.add('item__button','magnifying-glass-icon');
        container.appendChild(input);
        container.appendChild(btnSearch);
        menuItem.appendChild(container);
        return menuItem;
    }

    createLogo() {
        const menuItem = document.createElement('li');
        const logo = document.createElement('img');
        const container = document.createElement('div');

        container.classList.add('menu__item', 'no-hover');
        logo.src = 'imgs/TMDB Logo.svg';
        logo.classList.add('TMDB-logo', 'hidden');
        logo.alt = 'TMDB logo';
        container.appendChild(logo);
        menuItem.appendChild(container);
        return menuItem;
    }

    createStyleLink(link) {
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', link);
        return style;
    }

    openMenu() {
        const menuBtn = this.listItems[0].children[0];
        const isHidden = menuBtn.children[0].classList.contains('hidden');

        menuBtn.classList.toggle('xmark-icon',isHidden);
        menuBtn.classList.toggle('right-arrow-icon',!isHidden);
        this.listItems.forEach((item) => {
            item.children[0].classList.toggle('center',!isHidden);
            item.children[0].classList.toggle('left-center',isHidden);
            item.children[0].children[0].classList.toggle('hidden',!isHidden);
        });
    }

    searchField(event) {
        const searchBar = event.target ? event.target.previousElementSibling : event;
        searchBar.value = searchBar.value.trim();  
        switch (true) {
            case searchBar.classList.contains('hidden'):
                this.openMenu();
                searchBar.focus();
                break;
            
            case searchBar.value == '':
                searchBar.focus();
                break;
    
            default:
                const formattedSearch = searchBar.value.replace(/\s+/g, '%20');
                console.log(formattedSearch);
                break;
        };
    }

    selected(item) {
        this.listItems[item].children[0].classList.add('menu__item--active');
    }

}

customElements.define('nav-menu',NavMenuComponent);