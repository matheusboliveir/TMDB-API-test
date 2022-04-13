const menuBtn = document.querySelector('#menuExpandButton');
const menuItems = document.querySelectorAll('.menu__item');
const searchBar = document.querySelector('#search');
const searchButton = document.querySelector('#searchButton');

function openMenu() {
    if (menuItems[0].firstElementChild.classList.contains('hidden')) {
        menuItems.forEach((item) => {
            menuBtn.classList.add('xmark-icon');
            menuBtn.classList.remove('right-arrow-icon');
            item.classList.remove('center');
            item.classList.add('left-center');
            item.firstElementChild.classList.remove('hidden');
        });
    } else {
        menuItems.forEach((item) => {
            menuBtn.classList.remove('xmark-icon');
            menuBtn.classList.add('right-arrow-icon');
            item.classList.add('center');
            item.classList.remove('left-center');   
            item.firstElementChild.classList.add('hidden');
        });
    };
};      

function searchField() {
        searchBar.value = searchBar.value.trim();  
        switch (true) {
            case searchBar.classList.contains('hidden'):
                openMenu();
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
};
 
menuBtn.addEventListener('click',openMenu);

menuBtn.addEventListener('keypress', event => event.key === 'Enter' ? openMenu : null);

searchButton.addEventListener('click',searchField);

searchBar.addEventListener('keypress',event => event.key === 'Enter' ? searchField : null);