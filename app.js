"use strict";

let oGameData = {
    playerBalance: 0,
    idleIncome: 0,
    clickPower: 1,
    multiplier: 1,
    incomeOverTime() {
        this.idleIncome = this.idleIncome * this.clickPower * this.multiplier;
        this.playerBalance += this.idleIncome;
        return this.idleIncome;
    }
};

let coin = document.querySelector('#clickme');
let darkMode = document.querySelector('#darkmode');
let darkIsActive = false;
let root = document.querySelector(':root');

let plusRef = document.querySelector('.plus');
let balRef = document.querySelector('#bal');
let idleRef = document.querySelector('#idle');

let valueCP = document.querySelector('#value1');
let valueM = document.querySelector('#value2');
let valueAC = document.querySelector('#value3');

let btnCP = document.querySelector('#click-power');
let btnM = document.querySelector('#multiplier');
let btnAC = document.querySelector('#autoclick');

idleRef.textContent = oGameData.idleIncome;

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
        balRef.textContent = oGameData.playerBalance;
    }, 1000);
});

coin.addEventListener('mousedown', () => {
    let income = oGameData.clickPower * oGameData.multiplier;
    oGameData.playerBalance += income;
    balRef.textContent = oGameData.playerBalance;
});

btnCP.addEventListener('click', () => {
    oGameData.clickPower++;
    console.log(oGameData.clickPower);
});

// add to balance and play "+1" animation
function addToBalance() {
    // balRef.textContent = oGameData.playerBalance;
}