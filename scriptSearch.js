document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.querySelector('.searchButton');
    const searchInput = document.querySelector('.searchInput');

    searchBtn.addEventListener('click', () => {
        searchInput.classList.toggle('active');
        searchBtn.classList.toggle('move-left');
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        }
    });
});
