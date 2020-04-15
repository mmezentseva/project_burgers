// модальное окно .сomments 

var btn = document.querySelectorAll('.comments__button');
var close = document.querySelectorAll('.close');

btn.forEach (function () {
    addEventListener("click", function(evt) {
    evt.preventDefault();
    });
})

btn.forEach (function (item) {
    item.addEventListener ('click', function () {
        var modalName = item.getAttribute('data-popup');
        document.getElementById(modalName).style.display = 'block';
    })
})

close.forEach (function(item) {
    item.addEventListener('click', function () {
        var closeName = item.closest('.modal');
        closeName.style.display = 'none';
    })
})

document.onclick = function(evt) {
    if (evt.target.classList.contains('modal')) {
      evt.target.style.display = 'none';
    }
}

// модальное окно .burger-menu

var menu = document.querySelector('.burgers-menu__window');
var ingr = document.querySelector('.burgers-menu__cover');

ingr.addEventListener("click", function (evt) {
    evt.preventDefault();
})

ingr.onclick = function () {
    menu.style.display = 'block';
}

menu.onmouseleave = function () {
    this.style.display = 'none';
}


// accordion

var title = document.getElementsByClassName ('acco__item');

for (var i = 0; i < title.length; i++) {   
    title[i].addEventListener('click', function (el) {
        el.preventDefault();
});
    title[i].addEventListener('click', function () {
        if (!(this.classList.contains('acco__item--active'))) {
            for (var i = 0; i < title.length; i++) {
                title[i].classList.remove('acco__item--active');
            }
            this.classList.add('acco__item--active');
        }
    })
}

// slider

var left = document.querySelector('#slider-left');
var right = document.querySelector('#slider-right');
var slideImage = document.querySelector('#slideImage');

right.addEventListener("click", function (evt) {
    evt.preventDefault();
});
left.addEventListener("click", function(evt) {
    evt.preventDefault();
});

var imagesUrls = ['./img/content/burger.png','./img/content/cheeseburger.png','./img/content/chikenburger.png',
'./img/content/sandwich.png','./img/content/spicy_burger.png'];

var currentImageIndex = 0;

slideImage.src = imagesUrls[currentImageIndex];

left.onclick = function () {
    if (currentImageIndex-1 == -1) {
        currentImageIndex = imagesUrls.length - 1;
    } else {
        currentImageIndex--;
    }
    slideImage.src = imagesUrls[currentImageIndex];
};

right.onclick = function() {
    if (currentImageIndex+1 == imagesUrls.length) {
        currentImageIndex = 0;
    } else {
        currentImageIndex++;
    }
    slideImage.src = imagesUrls[currentImageIndex];
}; 

// подключение карты

ymaps.ready(init);

var placemarks = [
    {
        latitude: 59.97,
        longitude: 30.31,
        hintContent: 'ул. Литераторов, д. 19',
        balloonContent: [
        'Самые вкусные бургеры у нас!',
        ]
    },
    {
        latitude: 59.94,
        longitude: 30.25,
        hintContent: 'Малый проспект В.О., д. 64',
        balloonContent: [
        'Самые вкусные бургеры у нас!',
        ]

    },
    {
        latitude: 59.93,
        longitude: 30.34,
        hintContent: 'наб. реки Фонтанки, д. 56',
        balloonContent: [
        'Самые вкусные бургеры у нас!',
        ]
    },
],

geoObjects = [];

function init() {
    var map = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    for (var i = 0; i < placemarks.length; i++) {
        geoObjects[i] = new ymaps.Placemark ([placemarks[i].latitude, placemarks[i].longitude], 
        {
            hintContent: placemarks[i].hintContent,
            balloonContent: placemarks[i].balloonContent.join('')
        },
        {
            iconLayout: 'default#image',
            iconImageHref: './img/logos/map-marker.svg',
            iconImageSize: [46,57],
            iconImageOffset: [-23, -57]
        });

    }

    var clusterer = new ymaps.Clusterer ({
        clusterIcons: [
            {
                href: './img/logos/burgerMap.png',
                size: [100, 100],
                offset: [-50, -50]
            }
        ],

        clusterIconContentLayout: null

    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
}

