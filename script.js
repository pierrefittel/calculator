const touchpad = document.querySelectorAll("div.digits > div");
const screen = document.getElementById("screen");

//Display and back-end operation are stored into two different arrays
let screenInput = new Array();
let operationValue = new Array();

//Event listeners on touchpad
touchpad.forEach(digit => {
    digit.addEventListener("mousedown", updateScreenInput)
});

//Screen update related functions
function updateScreenInput(e) {
    if (e.target.className === "operator") { //Operator input
        operatorInput(e);
    } else if (e.target.className === "digit") { //Number digit input
        digitInput(e);
    } else if (e.target.id === "clear") { //Clear
        clear()
    } else if (e.target.id === "del") { //Delete
        del();
    } else if (e.target.id === "pos-neg") { //+/-
        posNeg();
    } else if (e.target.id === "operate") { //Operate
        screenInput = operate();
        updateScreen();
    } 
}

function operatorInput(e) {
    storeValue()
    screenInput = new Array();
    screenInput.push(e.target.innerText);
    updateScreen();
}

function digitInput(e) {
    let screenValue = document.getElementById("screen").innerText;
    if ((screenValue === "0" && e.target.innerText === "0") || isNaN(screenValue)) { // Resets screen for first digit after operator input and store operator value
        storeValue();
        screenInput.pop();
        screenInput.push(e.target.innerText);
        updateScreen();
    } else if (screenValue === "0" && parseInt(e.target.innerText) > 0) { //Checks for double 0 input
        screenInput.pop();
        screenInput.push(e.target.innerText);
        updateScreen();
    } else {
        screenInput.push(e.target.innerText);
        updateScreen();
    }
}

function clear() {
    screenInput = ["0"];
    operationValue = new Array();
    updateScreen();
}

function del() {
    screenInput.pop();
    updateScreen();
}

function posNeg() {
    let screenValue = document.getElementById("screen").innerText;
    if (isNaN(screenValue) === false && screenInput[0] != "-" && screenValue != "0") {
        screenInput.unshift("-");
    } else if (isNaN(screenValue) === false && screenInput[0] === "-") {
        screenInput.shift();
    }
    updateScreen();
}

function updateScreen() {
    let screenValue = document.getElementById("screen").innerText;
    if (screenValue.length > 10) { //Log error when over 10 digits
        screenInput = ["Error"];
        screen.innerText = screenInput.join('');
        screenInput = new Array();
        operationValue = new Array();
    } else {
        screen.innerText = screenInput.join('');
    }
}

//Back end operation related functions
function storeValue() {
    let screenValue = document.getElementById("screen").innerText;
    if (isNaN(operationValue[operationValue.length - 1]) && isNaN(screenValue)) {
        operationValue.pop();
        operationValue.push(screenValue);
    } else {
        operationValue.push(screenValue);
    }
}

function operate() {
    storeValue()
    let total = new Float32Array;
    for (let i = 0; i < operationValue.length; i += 2) {
        total = parseFloat(operationValue[i]);
        if (operationValue[i + 1] === "+") {
            total += parseFloat(operationValue[i + 2]);
        } else if (operationValue[i + 1] === "-") {
            total -= parseFloat(operationValue[i + 2]);
        } else if (operationValue[i + 1] === "×") {
            total *= parseFloat(operationValue[i + 2]);
        } else if (operationValue[i + 1] === "÷") {
            total /= parseFloat(operationValue[i + 2]);
        }
        operationValue.splice(i + 2, 1, total);
    }
    operationValue = new Array();
    let result = new Array();
    result.push(total.toPrecision(10));
    return result;
}