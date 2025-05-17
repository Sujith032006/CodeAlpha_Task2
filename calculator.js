const display = document.getElementById('display');
let current = '';
let operator = '';
let operand = '';
let resultShown = false;

function updateDisplay(value) {
    display.textContent = value || '0';
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const val = btn.getAttribute('data-value');
        if (btn.id === 'clear') {
            current = '';
            operator = '';
            operand = '';
            resultShown = false;
            updateDisplay('0');
        } else if (btn.id === 'equals') {
            if (operator && operand !== '' && current !== '') {
                let a = parseFloat(operand);
                let b = parseFloat(current);
                let res = '';
                switch (operator) {
                    case '+': res = a + b; break;
                    case '-': res = a - b; break;
                    case '*': res = a * b; break;
                    case '/': res = b !== 0 ? a / b : 'Error'; break;
                }
                updateDisplay(res);
                current = res.toString();
                operator = '';
                operand = '';
                resultShown = true;
            }
        } else if (btn.classList.contains('op')) {
            if (current !== '') {
                if (operator && operand !== '') {
                    // Chain operations
                    let a = parseFloat(operand);
                    let b = parseFloat(current);
                    let res = '';
                    switch (operator) {
                        case '+': res = a + b; break;
                        case '-': res = a - b; break;
                        case '*': res = a * b; break;
                        case '/': res = b !== 0 ? a / b : 'Error'; break;
                    }
                    operand = res.toString();
                    updateDisplay(res);
                } else {
                    operand = current;
                }
                operator = val;
                current = '';
                resultShown = false;
            }
        } else {
            if (resultShown) {
                current = '';
                resultShown = false;
            }
            // Prevent multiple decimals
            if (val === '.' && current.includes('.')) return;
            current += val;
            updateDisplay(current);
        }
    });
}); 