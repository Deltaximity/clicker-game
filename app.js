"use strict";

let oGameData = {
    playerBalance: 0,
    idleIncome: 0,
    clickPower: 1,
    multiplier: 1.0,
    autoClick: 0,
    autoClickPower: 0,
    bonusChance: 0,
    incomeOverTime() {
        let income = Math.round((this.idleIncome * this.multiplier) * 10) / 10;
        this.playerBalance += income;
    }
};

let coin = document.querySelector('#clickme');
let darkMode = document.querySelector('#darkmode');
let darkIsActive = false;
let root = document.querySelector(':root');

let plusRef = document.querySelector('.plus');
let balRef = document.querySelector('#bal');
let idleRef = document.querySelector('#idle');
let upgradeRef = document.querySelectorAll('.price');

let valueCP = document.querySelector('#value1');
let valueM = document.querySelector('#value2');
let valueII = document.querySelector('#value3');
let valueAC = document.querySelector('#value4');
let valueACP = document.querySelector('#value5');
let valueBC = document.querySelector('#value6');

let btnCP = document.querySelector('#click-power');
let btnM = document.querySelector('#multiplier');
let btnII = document.querySelector('idle-income');
let btnAC = document.querySelector('#autoclick');

updateValues();

darkMode.addEventListener('click', () => {
    if (!darkIsActive) {
        darkIsActive = true;
        root.style.setProperty('--bg-color', '#1a1a1a');
        root.style.setProperty('--bg-accent', '#333');
        root.style.setProperty('--primary', '#5f5');
        root.style.setProperty('--secondary', '#5d5');
        root.style.setProperty('--txt-color', '#fff');
    } else {
        darkIsActive = false;
        root.style.setProperty('--bg-color', '#fff');
        root.style.setProperty('--bg-accent', '#eee');
        root.style.setProperty('--primary', '#5f5');
        root.style.setProperty('--secondary', '#5d5');
        root.style.setProperty('--txt-color', '#000');
    }
});

window.addEventListener('load', () => {
    setInterval(() => {
        oGameData.incomeOverTime();
        balRef.textContent = Math.round(oGameData.playerBalance * 10) / 10;
    }, 1000);
});

// clickme
coin.addEventListener('mousedown', () => {
    let income = Math.round((oGameData.clickPower * oGameData.multiplier) * 10) / 10;
    oGameData.playerBalance += Math.round(income * 10) / 10;
    balRef.textContent = Math.round(oGameData.playerBalance * 10) / 10;
    animateIncome(income);
});

// click power
btnCP.addEventListener('click', (e) => {
    oGameData.clickPower++;
    updateValues();
});

// multiplier 
btnM.addEventListener('click', () => {
    oGameData.multiplier += 0.1;
    updateValues();
});

// idle income
// btnII.addEventListener('click', () => {
//     oGameData.idleIncome++;
//     updateValues();
// })

function animateIncome(income) {
    let plusDiv = document.createElement('div');
    let plusNode = document.createTextNode("+" + income);
    plusDiv.appendChild(plusNode);
    coin.appendChild(plusDiv);
    plusDiv.classList.add('plus');
    setTimeout(() => {
        plusDiv.remove();
    }, 1000);
}

function updateValues() {
    idleRef.textContent = oGameData.idleIncome;
    valueCP.textContent = oGameData.clickPower;
    valueM.textContent = Math.round(oGameData.multiplier * 10) / 10 + "x";
    valueII.textContent = oGameData.idleIncome + " / sec";
    valueAC.textContent = "+" + oGameData.autoClick;
    valueACP.textContent = oGameData.autoClickPower;
}