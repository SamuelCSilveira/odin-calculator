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
        default: return a;
    }
}

// Functions for getting A and B values, strings and checks
function getA(string, operator) { 
    return Number(getAString(string, operator));
}

function getAString(string, operator) { 
    return operator ? string.slice(0, string.indexOf(operator)) : string;
}

function isADecimal(string, operator){
   return getAString(string, operator).includes(".");
}

function isAFirstDigit (string, operator) {
    return getAString(string, operator).length < 2;
}

function isAZero (string, operator) {
    return getAString(string, operator) === "0";
}

function getB(string, operator) { 
    return Number(getBString(string, operator));
}

function getBString(string, operator) { 
    return string.slice(string.indexOf(operator) + 1);
}

function isBDecimal(string, operator){
   return getBString(string, operator).includes(".");
}

function isBFirstDigit (string, operator) {
    return getBString(string, operator).length < 2;
}

function isBZero (string, operator) {
    return getBString(string, operator) === "0";
}

// Function for resetting variables after each operation
function resetVariables(string) {
    if (string === "clear") a = null;
    else a = getA(string);
    b = null; 
    op = null;
}

// Function for error message check
function isErrorMessage(string) {
    return string.slice(0, 5) === "Error";
}

let a;
let b;
let op;
let isResult = false;

const display = document.querySelector("#display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const allClear = document.querySelector(".all-clear");
const clear = document.querySelector(".clear");


for (const digit of digits) {
    digit.addEventListener("click", () => {
        if (isErrorMessage(display.textContent)) display.textContent = "";

        if (isResult) {
            display.textContent = "";
            isResult = false;
        }

        if (digit.innerText === ".") {
            if ((isADecimal(display.textContent, op) && !op) || 
            isBDecimal(display.textContent, op)) return;
            
            if (display.textContent === "" || 
                display.textContent === a + op) display.textContent += "0";
        }

        if (isAFirstDigit(display.textContent, op) &&
            isAZero(display.textContent, op) && !op) {
            if (digit.innerText === "0") return;
            if (digit.innerText === ".") display.textContent = "0.";
            else display.textContent = digit.innerText;
        } else if (isBFirstDigit(display.textContent, op) &&
            isBZero(display.textContent, op)) {
            if (digit.innerText === "0") return;
            if (digit.innerText === ".") display.textContent = a + op + "0.";
            else display.textContent = a + op + digit.innerText;
        } else {
            display.textContent += digit.innerText;
        }
        
        if (!op) a = getA(display.textContent, op);
        else b = getB(display.textContent, op);
    });
        
    document.addEventListener("keydown", (e) => {
        if (e.key === digit.innerText) digit.click();
    });
};

for (const operator of operators) {
    operator.addEventListener("click", () => {
        if (isErrorMessage(display.textContent)) display.textContent = "";

        if (display.textContent === "") {
                display.textContent += "0";
                a = getA(display.textContent, op);
        }
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

    document.addEventListener("keydown", (e) => {
        if (e.key === operator.innerText) operator.click();
        if (operator.innerText === "=" && e.key === "Enter") operator.click();
    });
};

allClear.addEventListener("click", () => {
    display.textContent = "";
    resetVariables("clear");
});

clear.addEventListener("click", () => {
    if (op && b) {
        display.textContent = getAString(display.textContent, op) + op;
        b = null;
    }
    else if (op) {   
        display.textContent = getAString(display.textContent, op);
        op = null;
    }
    else {
        display.textContent = "";
        a = null;
    }
});

document.addEventListener("keydown", (e) => {
        // console.log(e.key)
        if (e.key === "Escape" || e.key === "c") allClear.click();
        if (e.key === "Backspace") clear.click();
        
        
    });