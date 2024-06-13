// script.js

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let previousInput = '';
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = null;
                display.textContent = '0';
                return;
            }

            if (value === '=') {
                if (operator && previousInput !== '') {
                    currentInput = evaluate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                    previousInput = '';
                    operator = null;
                }
                return;
            }

            if (button.classList.contains('operator')) {
                if (currentInput === '' && previousInput !== '') {
                    operator = value;
                } else if (currentInput !== '') {
                    if (previousInput === '') {
                        previousInput = currentInput;
                        currentInput = '';
                        operator = value;
                    } else {
                        previousInput = evaluate(previousInput, currentInput, operator);
                        display.textContent = previousInput;
                        currentInput = '';
                        operator = value;
                    }
                }
                return;
            }

            currentInput += value;
            display.textContent = currentInput;
        });
    });

    function evaluate(num1, num2, operator) {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        switch (operator) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return (a / b).toString();
            default:
                return '0';
        }
    }
});
