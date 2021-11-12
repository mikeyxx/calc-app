const calculator = document.querySelector('.calculator')
const display = calculator.querySelector('.calculator-display')
const keys = calculator.querySelector('.calculator-keys')

keys.addEventListener('click', event => {
    const key = event.target
    const displayValue = display.textContent
    const keyValue = key.textContent
    const type = key.dataset.type
    const previousKeyType = calculator.dataset.previousKeyType

    if(type === 'number') {
        if(displayValue === '0' || previousKeyType === 'operator' || previousKeyType === 'equal') {
            display.textContent = keyValue
        } else {
            display.textContent = displayValue + keyValue
        }


        const activeOperatorKey = document.querySelectorAll('[data-type="operator"]')
        activeOperatorKey.forEach(el => el.dataset.state = '')
    }

    if(type === 'operator') {
        const activeOperatorKey = document.querySelectorAll('[data-type="operator"]')
        activeOperatorKey.forEach(el => el.dataset.state = '')

        key.dataset.state = 'selected'

        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.action
    }
    
    if(type === 'percent') {
        if(displayValue !== 0) {
            display.textContent = displayValue / 100
        }
    }

    if(type === 'equal') {
        const firstNumber = calculator.dataset.firstNumber
        const operator = calculator.dataset.operator
        const secondNumber = displayValue
        display.textContent = calculate(firstNumber, operator, secondNumber)
    }

    if(type === 'clear') {
        if(displayValue !== 0 && displayValue.length > 1) {
            display.textContent = displayValue.slice(0, -1)
        } else {
            display.textContent = '0'
            delete calculator.dataset.firstNumber
            delete calculator.dataset.operator
        }
    }

    if(type === 'all-clear') {
        display.textContent = '0'
        delete calculator.dataset.firstNumber
        delete calculator.dataset.operator
    }

    calculator.dataset.previousKeyType = type   
})


let result = ''

function calculate(firstNumber, operator, secondNumber) {
    if(operator === 'divide') {
        result = parseFloat(firstNumber) / parseFloat(secondNumber)
    } else if(operator === 'times') {
        result = parseFloat(firstNumber) * parseFloat(secondNumber)
    } else if(operator === 'plus') {
        result = parseFloat(firstNumber) + parseFloat(secondNumber)
    } else if(operator === 'minus') {
        result = parseFloat(firstNumber) - parseFloat(secondNumber)
    }
    return result
}
