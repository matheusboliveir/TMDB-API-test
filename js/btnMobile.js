document.querySelector('.toggle').addEventListener('click',() => {
    const menuItems = document.querySelectorAll('.menu__item');
    if (menuItems[0].classList.contains('active')) {
        menuItems.forEach((item) => item.classList.remove('active'));
    } else {
        menuItems.forEach((item) => item.classList.add('active'));
    }
});