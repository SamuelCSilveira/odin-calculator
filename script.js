// Functions for basic operations
function add(a, b) { return parseFloat((a + b).toFixed(10)); }
function subtract(a, b) { return parseFloat((a - b).toFixed(10)); }
function multiply(a, b) { return parseFloat((a * b).toFixed(10)); }
function divide(a, b) { return b === 0 ? 
    "Error: cannot divide by zero" : parseFloat((a / b).toFixed(10)); }

// Operate function, preventing to show too many decimals
function operate(a, b, op) {
    isResult = true;
    switch (op) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
        default: return "Error";
    }
}

// Functions for getting A and B values and strings
function getA(string) { return Number(getAString(string)); }
function getAString(string) { return string }
function getB(string, operator) { return Number(getBString(string, operator)); }
function getBString(string, operator) { return string.slice(string.indexOf(operator) + 1)}

// Function for resetting variables after each operation
function resetVariables(string) {
    if (string === "clear") a = null;
    else a = getA(string);
    b = null; 
    op = null;
}

let a;
let b;
let op;
let isResult = false;

const display = document.querySelector("#display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");

for (const digit of digits) {
    digit.addEventListener("click", () => {
        if (isResult) {
            display.textContent = "";
            isResult = false;
        }
        if (digit.innerText === ".") {
            if ((getAString(display.textContent).includes(".") && !op) || 
                getBString(display.textContent, op).includes(".")) return;
                
            if (display.textContent === "" || 
                display.textContent === a + op) display.textContent += "0";
        }
        if (display.textContent.slice(0, 5) === "Error") display.textContent = "";
        
        display.textContent += digit.innerText;
        
        if (!op) a = getA(display.textContent);
        else b = getB(display.textContent, op);
    });
};

for (const operator of operators) {
    operator.addEventListener("click", () => {
        if (display.textContent === "Error") display.textContent = "";

        if (operator.innerText === "=") {
            display.textContent = operate(a, b, op);
            resetVariables(display.textContent);
            return;
        }
        else if (b) {
            display.textContent = operate(a, b, op);
            resetVariables(display.textContent);
        };
        op = operator.innerText;
        display.textContent = a + op;
        isResult = false;
    });
};

clear.addEventListener("click", () => {
    display.textContent = "";
    resetVariables("clear");
});