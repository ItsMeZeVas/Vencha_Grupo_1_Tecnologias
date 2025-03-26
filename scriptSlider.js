document.addEventListener('DOMContentLoaded', function () {
    new Splide('#Slider', {
        type   : 'loop',
        perPage: 1,
        autoplay: true,
        interval: 3000,
        arrows: true,
        pagination: true,
    }).mount();
});
