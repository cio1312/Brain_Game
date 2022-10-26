const cardarray = [
    {

        name: 'butterfly',
        Image: 'images/butterfly.jpg'

    },
    {

        name: 'milkshake',
        Image: 'images/milkshake.png'

    },
    {

        name: 'lemon',
        Image: 'images/lemon.jpg'

    },
    {

        name: 'penguin',
        Image: 'images/penguin.jpg'

    },
    {

        name: 'police',
        Image: 'images/police.jpg'

    },
    {

        name: 'tiger',
        Image: 'images/tiger.jpg'

    },
    {

        name: 'butterfly',
        Image: 'images/butterfly.jpg'

    },
    {

        name: 'milkshake',
        Image: 'images/milkshake.png'

    },
    {

        name: 'lemon',
        Image: 'images/lemon.jpg'

    },
    {

        name: 'penguin',
        Image: 'images/penguin.jpg'

    },
    {

        name: 'police',
        Image: 'images/police.jpg'

    },
    {

        name: 'tiger',
        Image: 'images/tiger.jpg'

    }
]
cardarray.sort(() => Math.random() - 0.5);// to shuffel an aray randomly

let cardsChosen = [];   // stores which cards are clicked
let cardsChosenIDs = [];  // stores IDs of which cards are clicked
const cardsWon = [];             // stores which cards were successfully won
let sameImgClickTrack = [];
//console.log(cardarray);

const gridDisplay = document.querySelector('#grid')// this  searches for full html page and gets wherever id=grid is mentioned
const resultDisplay = document.querySelector('#result'); // for score
// create image tag <img>
function createborad() {
    for (let i = 0; i < cardarray.length; i++) {
        const card = document.createElement('img'); // we are creating <img> tage
        card.setAttribute('src', 'images/cover.jpg');
        card.setAttribute('data-id', i);
        card.setAttribute('class', 'iamgesize');
        card.addEventListener('click', flipcard)
        gridDisplay.appendChild(card);
        //  above we have designed the <img> tag
        console.log(card);
    }
}


// to flip the card and to save what was clicked in array 
function flipcard() {
    const cardID = this.getAttribute('data-id') // "this" is basically which object has called it (the click event)
    const hidingcardname = cardarray[cardID].name;
    const uniqid = cardarray[cardID].uniqueId;
    cardsChosen.push(hidingcardname); // get the image name clicked and store in an array
    cardsChosenIDs.push(cardID);
    sameImgClickTrack.push(uniqid);
    console.log("id = " + sameImgClickTrack);
    this.setAttribute('src', cardarray[cardID].Image);// flip the image of what he clicked

    // // if same image clicekd 2 times
    // if(sameImgClickTrack[0] == sameImgClickTrack[1])
    // {
    //     flipcard() 
    // }

    //looking for a match in consicutive click
    if (cardsChosen.length === 2) // that is two clcks done.
    {
        setTimeout(checkMatch, 500)  // call his functionm after 500
    }

}

// check if match happened after click with the previous click
function checkMatch() {

    const cards = document.querySelectorAll('#grid img') // look into the id of grid  for all images. and get <images>


    const optionOneId = cardsChosenIDs[0];
    const optionTwoId = cardsChosenIDs[1];

    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/cover.jpg')
        cards[optionTwoId].setAttribute('src', 'images/cover.jpg')
        alert('You have clicked the same image!')
    }
    else if (cardsChosen[0] == cardsChosen[1]) {
        alert("You found a match")
        // if image is found then make both images white.
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')

        // also remove event listener to listen to clicks on the card.
        cards[optionOneId].removeEventListener('click', flipcard)
        cards[optionTwoId].removeEventListener('click', flipcard)
        cardsWon.push(cardsChosen)

    } else {
        cards[optionOneId].setAttribute('src', 'images/cover.jpg')
        cards[optionTwoId].setAttribute('src', 'images/cover.jpg')
        alert("Sorry! Try Again")
    }

    // after a success of a particular two image clicks , we clean the array for the next click
    cardsChosen = []
    cardsChosenIDs = []
    sameImgClickTrack = []
    resultDisplay.textContent = cardsWon.length;

    if (cardsWon.length == cardarray.length / 2) { // 6==6
        resultDisplay.innerHTML = 'Congratulations!, You found them all!!'

    }

}

createborad();