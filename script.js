function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

function operate(a, b, op) {
    switch (op) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
        default: return "Error";
    }
}

function getA(string) { return Number(string); }
function getB(string, operator) { return Number(string.slice(string.indexOf(operator) + 1)); }
function resetVariables(string) {
    a = getA(string);
    b = null; 
    op = null;
}

let a;
let b;
let op;

const display = document.querySelector("#display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");

for (const digit of digits) {
    digit.addEventListener("click", () => {
        display.textContent += digit.innerText;
        
        if (!op) a = getA(display.textContent);
        else b = getB(display.textContent, op);
    });
};

for (const operator of operators) {
    operator.addEventListener("click", () => {
        if (operator.innerText === "=") {
            display.textContent = operate(a, b, op);
            resetVariables(display.textContent);
            return;
        }
        else if (b) {
            display.textContent = operate(a, b, op);
            console.log(display.textContent);
            resetVariables(display.textContent);
        };
        op = operator.innerText;
        display.textContent = a + op;
    });
};

clear.addEventListener("click", () => display.textContent = "");