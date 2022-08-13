function add(a, b) {
    return a+b;
} 
function subtract(a, b) {
    return a-b;
}
function multiply(a, b) {
    return a*b;
}
function divide(a, b) {
    if (b == 0) return 'ERROR, can\'t divide by 0';
    return a/b;
}
function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return add(a,b);
        case '−':
            return subtract(a,b);
        case '×':
            return multiply(a,b);
        case '÷':
            return divide(a,b);
        default:
            console.log('ERROR, invalid oprator');
    }
}

function isNumber(str) { //check if a string has no operators in it
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function evaluate(expression) {
    if (isNumber(expression)) { 
        return parseFloat(expression);
    }
    for (let i = expression.length-1; i>=0; i--) {
        let op = expression[i];
        if (op == '+' || op == '−') {
            let a = evaluate(expression.slice(0,i));
            let b = evaluate(expression.slice(i+1, expression.length));
            return operate(op, a, b);
        }
    }
    for (let i = expression.length-1; i>=0; i--) {
        let op = expression[i];
        if (op == '×' || op == '÷') {    
            let a = evaluate(expression.slice(0,i));
            let b = evaluate(expression.slice(i+1, expression.length));
            return operate(op, a, b);    
        }
    }
    return 'ERROR';
}

var displayContent = '';
function updateDisplay() {
    const display = document.querySelector('.display');
    display.textContent = displayContent;
}
function clearDisplay() {
    displayContent = '';
    const display = document.querySelector('.display');
    display.textContent = '0';
}

const buttons = document.querySelectorAll('.calculator button');
buttons.forEach(button => {
    if (button.textContent != '=' && button.textContent != 'AC') {
        button.addEventListener('click', e => {
            displayContent += `${button.textContent}`;
            updateDisplay();
        });
    }
    else if (button.textContent == 'AC') {
        button.addEventListener('click', e => {
            clearDisplay();
        });
    }
    else if (button.textContent == '=') {
        button.addEventListener('click', e => {
            const display = document.querySelector('.display');
            let result = evaluate(display.textContent);
            displayContent = result;
            updateDisplay();
        });
    }
});