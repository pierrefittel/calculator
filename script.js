const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const screen = document.getElementById("screen");

//Display and back-end operation are stored into two different arrays
let screenDisplay = [];
let operationValue = [];

//Event listeners for digits & operators
digits.forEach(digit => {
    digit.addEventListener("mousedown", updateScreenValue)
    digit.addEventListener("mousedown", storeValue)
});

operators.forEach(operator => {
    operator.addEventListener("mousedown", updateScreenValue)
    operator.addEventListener("mousedown", storeValue)
});

//Screen update related functions
function updateScreenValue(e) {
    if (isNaN(screenDisplay[0]) || e.target.className === "operator") {
        screenDisplay = [];
        screenDisplay.push(e.target.innerText);
        updateScreen();
    } else if (e.target.className === "digit") {
        screenDisplay.push(e.target.innerText);
        updateScreen();
    }
}

function updateScreen(e) {
    screen.innerText = screenDisplay.join('');
}

//Back end operation related functions
function storeValue(e) {
    operationValue.push(e.target.value);
}

function operate() {
    console.log(operationValue);
}