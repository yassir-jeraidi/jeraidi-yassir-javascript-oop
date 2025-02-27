const buttons = document.querySelectorAll('button');
const display = document.querySelector('.div1');

let currentInput = '';
let currentOperation = null;
let previousInput = '';
let calculationHistory = [];
let lastResult = null;
let isDecimalAdded = false;
let isOperatorAdded = false;
let angleMode = 'deg';
let isInverseMode = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            handleNumberInput(value);
        } else if (button.classList.contains('operator')) {
            handleOperatorInput(value);
        } else if (button.classList.contains('equal')) {
            calculateResult();
        } else {
            switch (value) {
                case 'CE':
                    clearEntry();
                    break;
                case '.':
                    addDecimal();
                    break;
                case '%':
                    calculatePercentage();
                    break;
                case '(':
                case ')':
                    handleParenthesis(value);
                    break;
                case 'sin':
                    calculateTrig('sin');
                    break;
                case 'cos':
                    calculateTrig('cos');
                    break;
                case 'tan':
                    calculateTrig('tan');
                    break;
                case 'Inv':
                    toggleInverse();
                    break;
                case 'ln':
                case 'In':
                    calculateLog('ln');
                    break;
                case 'Log':
                    calculateLog('log');
                    break;
                case '√':
                    calculateSquareRoot();
                    break;
                case 'x^':
                    handleExponent();
                    break;
                case 'x²':
                case 'x2':
                    calculateSquare();
                    break;
                case 'π':
                    insertPi();
                    break;
                case 'e':
                    insertE();
                    break;
                case 'EXP':
                    handleExponentialNotation();
                    break;
                default:
                    console.log('Button pressed:', value);
            }
        }
        updateDisplay();
    });
});

function handleNumberInput(number) {
    if (lastResult !== null && !isOperatorAdded) {
        currentInput = '';
        lastResult = null;
    }

    if (currentInput === '0' && number !== '0') {
        currentInput = number;
    } else if (currentInput === '0' && number === '0') {
        return;
    } else {
        currentInput += number;
    }

    isOperatorAdded = false;
}

function handleOperatorInput(operator) {
    const jsOperator = operator === 'x' ? '*' : operator;

    if (currentInput && previousInput && currentOperation) {
        calculateResult();
    }

    if (currentInput) {
        previousInput = currentInput;
        currentInput = '';
    } else if (!previousInput && lastResult !== null) {
        previousInput = lastResult.toString();
    }

    currentOperation = jsOperator;
    isOperatorAdded = true;
    isDecimalAdded = false;
}

function calculateResult() {
    if (!previousInput && !currentInput) return;

    let result;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput || (lastResult !== null ? lastResult : '0'));

    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                display.textContent = 'Error: Division by zero';
                resetCalculator();
                return;
            }
            result = prev / current;
            break;
        case '^':
            result = Math.pow(prev, current);
            break;
        default:
            result = currentInput ? current : prev;
    }

    lastResult = result;
    previousInput = '';
    currentInput = result.toString();
    currentOperation = null;
    isDecimalAdded = currentInput.includes('.');
    isOperatorAdded = false;

    addToHistory(result);
}

function clearEntry() {
    currentInput = '';
    lastResult = null;

    if (!currentInput && !previousInput) {
        previousInput = '';
        currentOperation = null;
        calculationHistory = [];
        isInverseMode = false;
    }

    display.textContent = '0';
    isDecimalAdded = false;
    isOperatorAdded = false;
}

function deleteLastCharacter() {
    if (currentInput) {
        currentInput = currentInput.slice(0, -1);
    }
}

function resetCalculator() {
    currentInput = '';
    previousInput = '';
    currentOperation = null;
    lastResult = null;
    isDecimalAdded = false;
    isOperatorAdded = false;
    calculationHistory = [];
    isInverseMode = false;
}

function addDecimal() {
    if (!isDecimalAdded) {
        if (currentInput === '' || lastResult !== null && !isOperatorAdded) {
            currentInput = '0.';
        } else {
            currentInput += '.';
        }
        isDecimalAdded = true;
    }
}

function calculatePercentage() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
    } else if (lastResult !== null) {
        currentInput = (lastResult / 100).toString();
    }
    isDecimalAdded = currentInput.includes('.');
}

function handleParenthesis(paren) {
    if (lastResult !== null && !isOperatorAdded && paren === '(') {
        currentInput = '';
        lastResult = null;
    }
    currentInput += paren;
    isOperatorAdded = false;
}

function calculateTrig(func) {
    let value;

    if (currentInput) {
        value = parseFloat(currentInput);
    } else if (lastResult !== null) {
        value = lastResult;
    } else {
        return;
    }

    if (angleMode === 'deg' && !isInverseMode) {
        value = value * (Math.PI / 180);
    }

    try {
        if (isInverseMode) {
            switch(func) {
                case 'sin':
                    value = Math.asin(value);
                    if (angleMode === 'deg') {
                        value = value * (180 / Math.PI);
                    }
                    break;
                case 'cos':
                    value = Math.acos(value);
                    if (angleMode === 'deg') {
                        value = value * (180 / Math.PI);
                    }
                    break;
                case 'tan':
                    value = Math.atan(value);
                    if (angleMode === 'deg') {
                        value = value * (180 / Math.PI);
                    }
                    break;
            }
        } else {
            switch(func) {
                case 'sin':
                    value = Math.sin(value);
                    break;
                case 'cos':
                    value = Math.cos(value);
                    break;
                case 'tan':
                    value = Math.tan(value);
                    break;
            }
        }

        currentInput = value.toString();
        lastResult = value;
        isDecimalAdded = currentInput.includes('.');
    } catch (error) {
        display.textContent = 'Error: Invalid input';
        resetCalculator();
    }
}

function toggleInverse() {
    if (currentInput) {
        const value = parseFloat(currentInput);
        if (value === 0) {
            display.textContent = 'Error: Division by zero';
            resetCalculator();
            return;
        }
        currentInput = (1 / value).toString();
        lastResult = parseFloat(currentInput);
        isDecimalAdded = currentInput.includes('.');
    } else if (lastResult !== null) {
        if (lastResult === 0) {
            display.textContent = 'Error: Division by zero';
            resetCalculator();
            return;
        }
        currentInput = (1 / lastResult).toString();
        lastResult = parseFloat(currentInput);
        isDecimalAdded = currentInput.includes('.');
    } else {
        isInverseMode = !isInverseMode;

        console.log('Inverse mode: ' + (isInverseMode ? 'ON' : 'OFF'));
    }
}

function calculateLog(type) {
    let value;

    if (currentInput) {
        value = parseFloat(currentInput);
    } else if (lastResult !== null) {
        value = lastResult;
    } else {
        return;
    }

    try {
        if (isInverseMode) {
            if (type === 'ln') {
                currentInput = Math.exp(value).toString();
            } else if (type === 'log') {
                currentInput = Math.pow(10, value).toString();
            }
        } else {
            if (value <= 0) {
                throw new Error('Invalid input for logarithm');
            }

            if (type === 'ln') {
                currentInput = Math.log(value).toString();
            } else if (type === 'log') {
                currentInput = Math.log10(value).toString();
            }
        }

        lastResult = parseFloat(currentInput);
        isDecimalAdded = currentInput.includes('.');

    } catch (error) {
        display.textContent = 'Error: ' + error.message;
        resetCalculator();
    }
}

function calculateSquareRoot() {
    let value;

    if (currentInput) {
        value = parseFloat(currentInput);
    } else if (lastResult !== null) {
        value = lastResult;
    } else {
        return;
    }

    try {
        if (isInverseMode) {
            currentInput = (value * value).toString();
        } else {
            if (value < 0) {
                throw new Error('Cannot calculate square root of negative number');
            }
            currentInput = Math.sqrt(value).toString();
        }

        lastResult = parseFloat(currentInput);
        isDecimalAdded = currentInput.includes('.');

    } catch (error) {
        display.textContent = 'Error: ' + error.message;
        resetCalculator();
    }
}

function handleExponent() {
    if (currentInput) {
        previousInput = currentInput;
        currentOperation = '^';
        currentInput = '';
    } else if (lastResult !== null) {
        previousInput = lastResult.toString();
        currentOperation = '^';
        currentInput = '';
    }
    isOperatorAdded = true;
    isDecimalAdded = false;
}

function calculateSquare() {
    let value;

    if (currentInput) {
        value = parseFloat(currentInput);
    } else if (lastResult !== null) {
        value = lastResult;
    } else {
        return;
    }

    try {
        if (isInverseMode) {
            if (value < 0) {
                throw new Error('Cannot calculate square root of negative number');
            }
            currentInput = Math.sqrt(value).toString();
        } else {
            currentInput = (value * value).toString();
        }

        lastResult = parseFloat(currentInput);
        isDecimalAdded = currentInput.includes('.');

    } catch (error) {
        display.textContent = 'Error: ' + error.message;
        resetCalculator();
    }
}

function insertPi() {
    if (lastResult !== null && !isOperatorAdded) {
        currentInput = '';
        lastResult = null;
    }
    currentInput = Math.PI.toString();
    isDecimalAdded = true;
}

function insertE() {
    if (lastResult !== null && !isOperatorAdded) {
        currentInput = '';
        lastResult = null;
    }
    currentInput = Math.E.toString();
    isDecimalAdded = true;
}

function handleExponentialNotation() {
    if (currentInput) {
        currentInput += 'e';
        isOperatorAdded = false;
    }
}

function addToHistory(result) {
    const calculation = {
        expression: `${previousInput} ${currentOperation || ''} ${currentInput}`,
        result: result
    };
    calculationHistory.push(calculation);

    if (calculationHistory.length > 10) {
        calculationHistory.shift();
    }
}

function updateDisplay() {
    let displayText;

    if (currentInput !== '') {
        displayText = currentInput;
    } else if (previousInput !== '' && currentOperation) {
        displayText = previousInput;
    } else if (lastResult !== null) {
        displayText = lastResult.toString();
    } else {
        displayText = '0';
    }

    if (displayText.length > 12) {
        const num = parseFloat(displayText);
        if (Math.abs(num) > 1e12 || (Math.abs(num) < 1e-7 && num !== 0)) {
            displayText = num.toExponential(6);
        } else {
            displayText = num.toPrecision(12);
        }
    }

    display.textContent = displayText;
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        handleNumberInput(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperatorInput(key === '*' ? 'x' : key);
    } else if (key === '=' || key === 'Enter') {
        calculateResult();
    } else if (key === '.' || key === ',') {
        addDecimal();
    } else if (key === 'Escape' || key === 'Delete') {
        clearEntry();
    } else if (key === '%') {
        calculatePercentage();
    } else if (key === '(' || key === ')') {
        handleParenthesis(key);
    } else if (key === 'i') {
        toggleInverse();
    }else if (key === 'Backspace'){
        deleteLastCharacter()
    }

    updateDisplay();
});