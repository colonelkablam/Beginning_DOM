
let buttons = document.querySelectorAll("button.synth-key");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {

        alert("key clicked!");
    })
}
