let player1Roll = 0;
let player2Roll = 0;
let startText = "Let Battle Commence!";
let drawText = "Players draw!";
let player1Win = "Player 1 wins!";
let player2Win = "Player 2 wins!";
let player1DieImage = document.querySelector("#die-1");
let player2DieImage = document.querySelector("#die-2");
let winningText = document.querySelector("#winner-text");

function rollDice() {
    player1Roll = getRandomDieValue();
    player2Roll = getRandomDieValue();
    console.log(player1Roll, player2Roll);
    UpdateUI();

}

function getRandomDieValue() {
    return Math.floor(Math.random() * 6) + 1
}

function UpdateUI() {
    player1DieImage.src = `./Assets/dice-${player1Roll}.svg`;
    player2DieImage.src = `./Assets/dice-${player2Roll}-fill.svg`;

    if (player1Roll === 0 && player2Roll === 0) {
        winningText.innerHTML = startText;
    }
    else if (player1Roll === player2Roll) {
        winningText.innerHTML = drawText;
    } else if (player1Roll > player2Roll) {
        winningText.innerHTML = player1Win;
    } else {
        winningText.innerHTML = player2Win;
    }
}