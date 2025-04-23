const PUNT_MIDA = 10;
const MAX_RAND = 29;
const TOTS_PPUNTS = 900;
const C_AMPLE = 300;
const C_ALTURA = 300;
const RETARD = 140;

var canvas, ctx;
var h, poma, b;
var pps;
var poma_x, poma_y;
var inGame = true;

var esquerre_Direccio = false;
var dretaDireccio = true;
var amunt_direccio = false;
var AvallDireccio = false;

const x = new Array(TOTS_PPUNTS);
const y = new Array(TOTS_PPUNTS);

const KEYBOARD_KEYS = {
    ESQUERRE_KEY: 37,
    DRETA_KEY: 39,
    AMUNT_KEY: 38,
    AVALL_KEY: 40
};

window.onload = initGame;

function initGame() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    h = new Image();
    h.src = 'head.png';

    b = new Image();
    b.src = 'dot.png';

    poma = new Image();
    poma.src = 'apple.png';

    pps = 3;

    for (let z = 0; z < pps; z++) {
        x[z] = 50 - z * PUNT_MIDA;
        y[z] = 50;
    }

    locateApple();
    setTimeout(gameCycle, RETARD);
}

function locateApple() {
    let r = Math.floor(Math.random() * MAX_RAND);
    poma_x = r * PUNT_MIDA;
    r = Math.floor(Math.random() * MAX_RAND);
    poma_y = r * PUNT_MIDA;
}

function checkApple() {
    if (x[0] === poma_x && y[0] === poma_y) {
        pps++;
        locateApple();
    }
}

function endGameAndShowGameOverMessage() {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'normal bold 18px serif';
    const score = pps - 3;
    ctx.fillText(`${score} ${score === 1 ? 'punt' : 'punts'} - Game over`, C_AMPLE / 2, C_ALTURA / 2);
}

function startDelayTimeout(functionName) {
    setTimeout(functionName, RETARD);
}

function gameCycle() {
    if (!inGame) return;

    checkApple();

    // 
    for (let z = pps; z > 0; z--) {
        if (x[0] === x[z] && y[0] === y[z]) {
            inGame = false;
        }
    }

    if (x[0] >= C_AMPLE || x[0] < 0 || y[0] >= C_ALTURA || y[0] < 0) {
        inGame = false;
    }

    // Move snake
    for (let z = pps; z > 0; z--) {
        x[z] = x[z - 1];
        y[z] = y[z - 1];
    }

    if (esquerre_Direccio) x[0] -= PUNT_MIDA;
    if (dretaDireccio) x[0] += PUNT_MIDA;
    if (amunt_direccio) y[0] -= PUNT_MIDA;
    if (AvallDireccio) y[0] += PUNT_MIDA;

    // Draw
    ctx.clearRect(0, 0, C_AMPLE, C_ALTURA);

    if (inGame) {
        ctx.drawImage(poma, poma_x, poma_y);
        for (let z = 0; z < pps; z++) {
            ctx.drawImage(z === 0 ? h : b, x[z], y[z]);
        }
    } else {
        endGameAndShowGameOverMessage();
    }

    startDelayTimeout(gameCycle);
}

// Keyboard controls
document.onkeydown = function (e) {
    const key = e.keyCode;

    if (key === KEYBOARD_KEYS.ESQUERRE_KEY && !dretaDireccio) {
        esquerre_Direccio = true;
        dretaDireccio = false;
        amunt_direccio = false;
        AvallDireccio = false;
    } else if (key === KEYBOARD_KEYS.DRETA_KEY && !esquerre_Direccio) {
        dretaDireccio = true;
        esquerre_Direccio = false;
        amunt_direccio = false;
        AvallDireccio = false;
    } else if (key === KEYBOARD_KEYS.AMUNT_KEY && !AvallDireccio) {
        amunt_direccio = true;
        AvallDireccio = false;
        esquerre_Direccio = false;
        dretaDireccio = false;
    } else if (key === KEYBOARD_KEYS.AVALL_KEY && !amunt_direccio) {
        AvallDireccio = true;
        amunt_direccio = false;
        esquerre_Direccio = false;
        dretaDireccio = false;
    }
};
