let buttons = Array.from(document.querySelectorAll('button'));
let display = document.getElementById('display');
let deleteButton = document.querySelector('.home_button');
let memoryNumber = 0;
let calculationArray = [];

const changeButtonColor = function(button){
    if(button.id == 'orange'){
        button.style.background = '#a15c1a'
    }
    else{
        button.style.background = '#a6a8a9'
    }
    setTimeout(() => {button.style.removeProperty("background-color")}, 150);
}

const displayOnPressOrClick = function(button){
    if(display.textContent == '0'){
       display.textContent = display.textContent.replace('0', button.textContent); 
    }
    else{
        display.textContent = display.textContent + button.textContent;
        display.textContent = parseFloat(display.textContent.split(',').join('')).toLocaleString();
    }
}

const clearDisplay = function(){
    if(display.innerHTML.length == 1){
        display.innerHTML = 0;
    }
    else if(display.innerHTML != '0'){
        display.innerHTML = display.innerHTML.slice(0, -1);
    }
}

const resetCalculator = function(){
    let empty = '0';
    memoryNumber = 0;
    display.textContent = empty;
    calculationArray = [];
}

const displayDot = function(button){
    if (display.innerHTML.includes('.') == 0){
        display.innerHTML += button.innerHTML;
    }
}

const convertMemoryNumber = function(number){
    let convertedNumber;
    if(number.includes(',')){
        convertedNumber = number.replace(',', '');
    }
    else{
        convertedNumber = number;
    }
    return convertedNumber;
}
const calculation = function(button){

    switch(button){
        case '+':
            memoryNumber = display.textContent;
            display.textContent = '0';
            calculationArray.push(convertMemoryNumber(memoryNumber));
            calculationArray.push('+');
        break;
        case '-':
            memoryNumber = display.textContent;
            display.textContent = '0';
            calculationArray.push(convertMemoryNumber(memoryNumber));
            calculationArray.push('-');
        break;
        case '×':
            memoryNumber = display.textContent;
            display.textContent = '0';
            calculationArray.push(convertMemoryNumber(memoryNumber));
            calculationArray.push('*');
        break;
        case '÷':
            memoryNumber = display.textContent;
            display.textContent = '0';
            calculationArray.push(convertMemoryNumber(memoryNumber));
            calculationArray.push('/');
        break;     
        case '%':
            memoryNumber = display.textContent;
            display.textContent = Number(convertMemoryNumber(memoryNumber)) / 100;
            memoryNumber = display.textContent;
        break;
        case '+/-':
            memoryNumber = Number(display.innerText) * -1;
            display.innerText = memoryNumber;
        break;
        case '=':
            calculationArray.push(display.textContent);
            display.textContent = eval(calculationArray.join(' '));
            calculationArray.splice(0, calculationArray.length);
        break;
    }
}

const pressAndClickCheck = function(button){
    button.addEventListener('click', (e) => {
        changeButtonColor(e.target);
        if(isNaN(e.target.innerHTML)){
            if(e.target.innerHTML == 'C'){
                clearDisplay(e.target);
            }
            else if(e.target.innerHTML == '.'){
                displayDot(e.target);
            }
            else{
                calculation(e.target.innerHTML)
            }
        }
        else{
            displayOnPressOrClick(e.target);
        }
    })
    document.addEventListener('keypress', (e) => {
        if(e.key.toUpperCase() == button.innerHTML){
            changeButtonColor(button);
            if(isNaN(button.innerHTML)){
                if(button.innerHTML == 'C'){
                    clearDisplay();
                }
                else if(button.innerHTML == '.'){
                    displayDot(button);
                }
                else{
                    calculation(button.innerHTML);
                }
            }
            else{
                displayOnPressOrClick(button);
            }
        }
    })
}

deleteButton.addEventListener('click', () => {resetCalculator()})

buttons.map( button => {pressAndClickCheck(button)})