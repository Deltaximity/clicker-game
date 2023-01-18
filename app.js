"use strict";

let oGameData = {
    playerBalance: 0,
    idleIncome: 0,
    clickPower: 10,
    multiplier: 1,
    autoClick: 0,
    autoClickPower: 0,
    bonusChance: 0,
    incomeOverTime() {
        let income = Math.round(this.idleIncome * this.multiplier);
        this.playerBalance += income;
        animateIncome(income);
    }
};

let coin = document.querySelector('#clickme');
let darkMode = document.querySelector('#darkmode');
let darkIsActive = false;
let root = document.querySelector(':root');

let plusRef = document.querySelector('.plus');
let balRef = document.querySelector('#bal');
let idleRef = document.querySelector('#idle');
let upgradeBtn = document.querySelectorAll('.btn-upgrade');
let upgradeRef = document.querySelectorAll('.price');

let valueCP = document.querySelector('#value1');
let valueM = document.querySelector('#value2');
let valueII = document.querySelector('#value3');
let valueAC = document.querySelector('#value4');
let valueACP = document.querySelector('#value5');
let valueBC = document.querySelector('#value6');

let btnCP = document.querySelector('#click-power');
let btnM = document.querySelector('#multiplier');
let btnII = document.querySelector('#idle-income');
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
        balRef.textContent = oGameData.playerBalance;
    }, 1000);
});

// clickme
coin.addEventListener('mousedown', () => {
    let income = oGameData.clickPower * oGameData.multiplier;
    oGameData.playerBalance += income;
    balRef.textContent = oGameData.playerBalance;
    animateIncome(income);
});

// click power
btnCP.addEventListener('click', () => {
    let order = 0, multiplier = 1.1;
    if (getCost(order) <= oGameData.playerBalance) {
        oGameData.playerBalance -= getCost(order);
        oGameData.clickPower++;
        updateCost(order, multiplier);
        updateValues();
    }
});

// multiplier 
btnM.addEventListener('click', () => {
    let order = 1, multiplier = 1.2;
    if (getCost(order) <= oGameData.playerBalance) {
        oGameData.playerBalance -= getCost(order);
        oGameData.multiplier++;
        updateCost(order, multiplier)
        updateValues();
    }
});

// idle income
btnII.addEventListener('click', () => {
    let order = 2, multiplier = 1.5;
    if (getCost(order) <= oGameData.playerBalance) {
        oGameData.playerBalance -= getCost(order);
        oGameData.idleIncome += 10;
        updateCost(order, multiplier);
        updateValues();
    }
});

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
    idleRef.textContent = Math.round(oGameData.idleIncome * oGameData.multiplier);
    balRef.textContent = oGameData.playerBalance;
    valueCP.textContent = oGameData.clickPower;
    valueM.textContent = oGameData.multiplier + "x";
    valueII.textContent = oGameData.idleIncome + " / sec";
    valueAC.textContent = "+" + oGameData.autoClick;
    valueACP.textContent = oGameData.autoClickPower;
}

function getCost(count) {
    let upgradeCost = upgradeRef[count].getAttribute('data-price');
    return upgradeCost;
}

function updateCost(count, multiplier) {
    let newPrice = getCost(count) * multiplier;
    upgradeRef[count].setAttribute('data-price', Math.round(newPrice));
    upgradeRef[count].textContent = Math.round(newPrice);
    console.log(newPrice);
}