// **********************************************
// Part 1: Number Facts

const NUMBERS_URL = 'http://numbersapi.com/';

// 1

async function getNumbFact(n){
    let res = await axios.get(`${NUMBERS_URL}${n}?json`);
    console.log(res.data.text);
};

getNumbFact(7);


// 2
div = document.getElementById('container')

async function getMultiple(start, end) {
    try {
        let res = await axios.get(`${NUMBERS_URL}${start}..${end}?json`)
        for (i in res.data) {
            div.append(res.data[i])
        }
    }
    catch (e) {
        console.log('error', e)
    }
}

getMultiple(7,11)


// 3

async function getMultForOne(n) {
    try {
        let facts = await Promise.all([
            axios.get(`${NUMBERS_URL}${n}?json`),
            axios.get(`${NUMBERS_URL}${n}?json`),
            axios.get(`${NUMBERS_URL}${n}?json`),
            axios.get(`${NUMBERS_URL}${n}?json`)
        ]);
    
        facts.forEach(fact => {
            div.append(fact.data.text)
        })
    }
    catch (e) {
        console.log('err', e)
    }
    
}

getMultForOne(7);



// **********************************************
// Part 2: Deck of Cards

// 1

async function getCard() {
    try {
        let card = await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1');
        console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`)
    }
    catch (e) {
        console.log('err', e)
    }
}

getCard()

// 2

let firstcard;

async function getTwo() {
    let res = await axios.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
    let deckId = res.data.deck_id;
    firstcard = `${res.data.cards[0].value} of ${res.data.cards[0].suit}`;
    let res2 = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    let secondCard = `${res2.data.cards[0].value} of ${res2.data.cards[0].suit}`;
    console.log(firstcard, secondCard)
}

getTwo()


// 3





let deckId = '';
window.addEventListener('DOMContentLoaded', async function(){
    let res = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    deckId = res.data.deck_id;
})

let btn = document.querySelector('#draw-card-btn')
let cardsDiv = document.querySelector('#cards')

btn.addEventListener('click', async function() {
    let resp = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    cardsDiv.append(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`);
})
