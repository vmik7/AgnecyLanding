// Переключатель лидеров
let coachArray = [
    {
        photo: 'lead1.jpg',
        name: 'Mark Waugh',
        info: 'Mark is Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed dooing eiusmod tempor incididut labore Ui / Ux , print template.',
    },
    {
        photo: 'lead2.jpg',
        name: 'David Webb',
        info: 'David is Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed dooing eiusmod tempor incididut labore Ui / Ux , print template.',
    },
    {
        photo: 'lead3.jpg',
        name: 'Robert Yates',
        info: 'Robert is Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed dooing eiusmod tempor incididut labore Ui / Ux , print template.',
    },
    {
        photo: 'lead4.jpg',
        name: 'Peggy Kelley',
        info: 'Peggy is Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed dooing eiusmod tempor incididut labore Ui / Ux , print template.',
    },
    {
        photo: 'lead5.jpg',
        name: 'Margaret Schwartz',
        info: 'Margaret is Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed dooing eiusmod tempor incididut labore Ui / Ux , print template.',
    },
];

const coachPhoto = document.querySelector('.team__photo');
const coachName = document.querySelector('.team__name');
const coachInfo = document.querySelector('.team__description');
const coachCards = document.querySelectorAll('.team__card');
const coachCardCaptions = document.querySelectorAll('.team__card-caption');

let coachCnt = 5;
let curCoach = 0;
let indexArray = [ 1, 2, 3, 4 ];

function setCoach(index) {
    coachPhoto.style.backgroundImage = 'url(img/' + coachArray[index].photo + ')';
    coachName.innerHTML = coachArray[index].name;
    coachInfo.innerHTML = coachArray[index].info;
    curCoach = index;
}
function setCoachMini(coachIndex, cardIndex) {
    coachCards[cardIndex].style.backgroundImage = 'url(img/' + coachArray[coachIndex].photo + ')';
    coachCardCaptions[cardIndex].innerHTML = coachArray[coachIndex].name;
    indexArray[cardIndex] = coachIndex;
}

setCoach(curCoach);
for (let i = 0; i < coachCards.length; i++) {
    setCoachMini(indexArray[i], i);
}

for (let i = 0; i < coachCards.length; i++) {
    coachCards[i].addEventListener('click', function(){
        let curCard = -1;
        for (let i = 0; i < coachCards.length; i++) {
            if (coachCards[i] == this) {
                curCard = i;
                break;
            }
        }
        let prevCoach = curCoach;
        setCoach(indexArray[curCard]);
        setCoachMini(prevCoach, curCard)
    });
}






// Слайдер для Products
let productsBgColors = [ '#f5f0dd', '#8392a3', '#b2b3b8', '#a9a29e', '#7d5a3a' ];
let productsData = [
    {
        title: 'Print template',
        products: [
            {}, {}, {}
        ]
    },
    {
        title: 'Web template',
        products: [
            {}, {}
        ]
    },
    {
        title: 'User interface',
        products: [
            {}, {}
        ]
    },
    {
        title: 'Mock-up',
        products: [
            {}
        ]
    },
];

const productNavList = document.querySelector('.products__list');
const productsWrapper = document.querySelector('.products__wrapper');
const productsTrack = document.querySelector('.products__track');
const productsNavItemClass = 'products__nav-item';
const productsPageClass = 'products__page';
const productsItemClass = 'products__item';

productNavList.innerHTML = `<li class="${productsNavItemClass}">All</li>`;

let productsPagesHTML = [ '' ];
productsData.forEach(function(page, index) {
    productNavList.innerHTML += `<li class="${productsNavItemClass}">${page.title}</li>`;
    let curPageHTML = '';
    page.products.forEach(function(item) {
        let str = `<div class="${productsItemClass}" style="background: ${productsBgColors[index]};"></div>`
        productsPagesHTML[0] += str;
        curPageHTML += str;
    });
    productsPagesHTML.push(curPageHTML);
});

productsTrack.innerHTML = '';
productsPagesHTML.forEach(function(item) {
    productsTrack.innerHTML += `<div class="${productsPageClass}">${item}</div>`;
});

let pxRegExpr = /[-0-9.]+(?=px)/;
let productsActivePage = 0;
let itemsOnRow = 4;
let productsPagesCount = productsPagesHTML.length;
let proguctsMargin = 20;
let productsPageWidth = productsWrapper.offsetWidth;
let productsPageMarginRight = +getComputedStyle(document.querySelector('.' + productsPageClass)).marginRight.match(pxRegExpr)[0];
let produtsWidth = (productsPageWidth - 3 * proguctsMargin) / 4;
let productsThreshold = (productsPageWidth + productsPageMarginRight) * .35;

const productsItems = document.querySelectorAll('.' + productsItemClass);
const productsLastItems = document.querySelectorAll('.' + productsItemClass + `:nth-child(${itemsOnRow}n+${itemsOnRow})`);
const productsNavItems = document.querySelectorAll('.' + productsNavItemClass);

for (item of productsItems) {
    item.style.width = produtsWidth + 'px';
    item.style.height = produtsWidth + 'px';
    item.style.marginRight = proguctsMargin + 'px';
    item.style.marginBottom = proguctsMargin + 'px';
}
for (item of productsLastItems) {
    item.style.marginRight = '0';
}

function setProductsPage(number = productsActivePage) {
    productsActivePage = number;
    for (item of productsNavItems) {
        item.classList.remove('active');
    }
    productsNavItems[productsActivePage].classList.add('active');
    productsTrack.style.transition = 'all 0.3s ease';
    productsTrack.style.transform = `translate3d(${
        -(productsPageWidth + productsPageMarginRight) * productsActivePage
    }px, 0px, 0px)`;
}
setProductsPage(0);

for (item of productsNavItems) {
    item.addEventListener('click', function() {
        let pageIndex = 0;
        for (let i = 0; i < productsNavItems.length; i++) {
            if (productsNavItems[i] == this) {
                pageIndex = i;
                break;
            }
        }
        setProductsPage(pageIndex);
    });
}

let initPos = 0, curPos = 0;
function getEvent() {
    return (event.type.search('touch') !== -1 ? event.touches[0] : event);
}
function swipeStart() {
    let event = getEvent();

    initPos = curPos = event.clientX;
    productsTrack.style.transition = '';

    document.addEventListener('touchmove', swipeAction);
    document.addEventListener('mousemove', swipeAction);
    document.addEventListener('touchend', swipeEnd);
    document.addEventListener('mouseup', swipeEnd);
}
function swipeAction() {
    let event = getEvent();
    let curValue = +productsTrack.style.transform.match(pxRegExpr)[0];
    let deltaPos = event.clientX - curPos;
    curPos = event.clientX
    productsTrack.style.transform = `translate3d(${
        curValue + deltaPos
    }px, 0px, 0px)`;
}
function swipeEnd() {
    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    if (curPos != initPos) {
        if (curPos < initPos) {
            // Left swipe <--
            if (initPos - curPos > productsThreshold) {
                productsActivePage++;
                productsActivePage = Math.min(productsActivePage, productsPagesCount - 1);
            }
        }
        else {
            // Right swipe -->
            if (curPos - initPos > productsThreshold) {
                productsActivePage--;
                productsActivePage = Math.max(productsActivePage, 0);
            }
        }
    }

    setProductsPage();
}

productsTrack.addEventListener('touchstart', swipeStart);
productsTrack.addEventListener('mousedown', swipeStart);



// Плавная прокрутка до якоря
let anchors = document.querySelectorAll('.header .nav__item');
for (let item of anchors) {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const id = this.firstElementChild.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}