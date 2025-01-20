const name = sessionStorage.getItem('username');
const massage = document.getElementById('welcome');
massage.textContent = name || 'chua nhap ten';

const money2 = parseInt(sessionStorage.getItem('money')) || 0;
let income = document.getElementById('income');
income.textContent = money2 > 0 ? money2 : 'Chưa nhập số tiền';

const inputField = document.getElementById('number-input');


let history = ["-","-","-","-","-","-","-","-","-"];
console.log(history.length, 'length')

function bet(amount) {
    const currentValue = parseFloat(inputField.value) || 0;
    inputField.value = currentValue + amount;
}

function clearinput() {
    inputField.value = 0;
}

function xiuapply() {
    const x = parseFloat(inputField.value);
    const xiudisplay = document.getElementById('xiu_amount');
    const taidisplay = document.getElementById('taiapply1');
    const taiamount = document.getElementById('tai_amount');

    if (x > 5) {
        xiudisplay.textContent = x;
        taidisplay.disabled = true;
        taiamount.disabled = true;
        updateIncome(-x);
        disableButtons();
    } else {
        alert("nhap so tien >5");
    }
}

function taiapply() {
    const x = parseFloat(inputField.value);
    const taidisplay = document.getElementById('tai_amount');
    const xiudisplay = document.getElementById('xiuapply1');
    const xiuamount = document.getElementById('xiu_amount');

    if (x > 5) {
        taidisplay.textContent = x;
        xiudisplay.disabled = true;
        xiuamount.disabled = true;
        updateIncome(-x);
        disableButtons();
    } else {
        alert("nhap so tien >5");
    }
}

function updateIncome(change) {
    let currentIncome = parseFloat(income.textContent) || 0;
    currentIncome += change;

    if (currentIncome < 0) {
        alert("Hết tiền, nạp thêm tiền!");
        currentIncome = parseFloat(income.textContent);
        document.getElementById('xiu_amount').textContent = 0;
        document.getElementById('tai_amount').textContent = 0;
    }

    income.textContent = currentIncome;
}

function rollDices() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dice3 = Math.floor(Math.random() * 6) + 1;

    document.getElementById('dice1').textContent = dice1;
    document.getElementById('dice2').textContent = dice2;
    document.getElementById('dice3').textContent = dice3;

    const total = dice1 + dice2 + dice3;
    console.log('history before', history);
    if (total > 10) {
        history.push('tai');
        displayHistory();
        console.log('tai winnn!!!');
    } else if (total <= 10) {
        history.push('xiu');
        displayHistory();
        console.log('xiu  winnn!!!');
    }
    logic(total);
}

function displayHistory() {
    console.log('history after', history);
    if (history.length >= 10) {
        history.shift();
    }
    for (let i = 0; i < 10; i++) {
        document.getElementById("history_"+ i).textContent = history[i];
    }

}

function logic(total) {
    const xiudisplay = parseFloat(document.getElementById('xiu_amount').textContent) || 0;
    const taidisplay = parseFloat(document.getElementById('tai_amount').textContent) || 0;

    let purchase = parseFloat(income.textContent) || 0;

    if (total <= 10 && xiudisplay > 0) {
        purchase += xiudisplay * 2;
    } else if (total > 10 && taidisplay > 0) {
        purchase += taidisplay * 2;
    }

    income.textContent = purchase;
    document.getElementById('xiu_amount').textContent = 0;
    document.getElementById('tai_amount').textContent = 0;

    resetButtons();
}

function resetButtons() {
    document.getElementById('xiuapply1').disabled = false;
    document.getElementById('taiapply1').disabled = false;
    document.getElementById('tai_amount').disabled = false;
    document.getElementById('xiu_amount').disabled = false;
}

function timer() {
    const time = document.getElementById('timer');
    let countdown = 15;

    const interval = setInterval(() => {
        if (countdown === 0) {
            rollDices();
            countdown = 16;
        } else if (countdown < 5) {
            disableButtons();
        }

        time.textContent = countdown;
        countdown--;
    }, 1000);
}

function disableButtons() {
    document.getElementById('xiuapply1').disabled = true;
    document.getElementById('taiapply1').disabled = true;
    document.getElementById('tai_amount').disabled = true;
    document.getElementById('xiu_amount').disabled = true;
}

rollDices();
timer();