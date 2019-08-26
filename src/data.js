const number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', 'Joker'];
const suit = ['H', 'D', 'S', 'C'];



function generateRandomCard() {
    const randomNumber = number[Math.floor(Math.random() * number.length)];
    const randomSuit = suit[Math.floor(Math.random() * suit.length)];

    const card = randomNumber + randomSuit;
    
    return card.includes('Joker') ? 'Joker' : card
}


module.exports = generateRandomCard;