// COACH switcher
var coachArray = [
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

var coachPhoto = document.querySelector('.team__photo');
var coachName = document.querySelector('.team__name');
var coachInfo = document.querySelector('.team__description');
var coachCards = document.querySelectorAll('.team__card');
var coachCardCaptions = document.querySelectorAll('.team__card-caption');

var coachCnt = 5;
var curCoach = 0;
var indexArray = [ 1, 2, 3, 4 ];

function setCoach(index) {
    coachPhoto.style.backgroundImage = 'url(../img/' + coachArray[index].photo + ')';
    coachName.innerHTML = coachArray[index].name;
    coachInfo.innerHTML = coachArray[index].info;
    curCoach = index;
}
function setCoachMini(coachIndex, cardIndex) {
    coachCards[cardIndex].style.backgroundImage = 'url(../img/' + coachArray[coachIndex].photo + ')';
    coachCardCaptions[cardIndex].innerHTML = coachArray[coachIndex].name;
    indexArray[cardIndex] = coachIndex;
}

setCoach(curCoach);
for (var i = 0; i < coachCards.length; i++) {
    setCoachMini(indexArray[i], i);
}

for (var i = 0; i < coachCards.length; i++) {
    coachCards[i].addEventListener('click', function(){
        var curCard = -1;
        for (var i = 0; i < coachCards.length; i++) {
            if (coachCards[i] == this) {
                curCard = i;
                break;
            }
        }
        var prevCoach = curCoach;
        setCoach(indexArray[curCard]);
        setCoachMini(prevCoach, curCard)
    });
}
// ***