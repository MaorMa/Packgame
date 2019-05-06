//food1 - 1
//food2 - 12
//food3 - 13
//food4 - 14 - med
//pac - 2
//ghost - 3
//wall - 4
//treat - 9
var board;
var boardSpecial;
var boardTreat;
var keyCodes = {
    'key':'a',
    'code':'KeyA'
};
var lastX;
var inGame;

var num_of_monsters_settings;
var num_Of_Balls_settings;
var time_settings;
var score;
var pac_color;
var time_elapsed;
var interval1;
var intervalMon1;
var intervalMon2;
var intervalMon3;
var intervalTime;
var intervalMedicine;
var context;
var pacman;
var monster1;
var monster2;
var monster3;
var treat;
var monsterNum;
var ballNum;
var lives;
var time;
var currUser;
var audioGame, audioDead, audioWin;
var food_remaining;
var fivePointsColor;
var fifteenPointsColor;
var twentyFivePointsColor;

var up, down, left, right;


$(document).ready(function () {
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");
    pacman = new Object();
    monster1 = new Object();
    monster2 = new Object();
    monster3 = new Object();
    ballNum = new Object();
    monsterNum = new Object();
    time = new Object();
    treat = new Object();
    audioGame = new Audio('img/audio.mp3');
    audioDead = new Audio('img/dead.mp3');
    audioWin = new Audio('img/win.mp3');
});

function initialize() {
    currUser = $("#username").val();
    changeScreen('canvasDiv');
    createKeys();
    up = keyCodes[keyUp.value]; //get up key
    down = keyCodes[keyDown.value]; //get down key
    left = keyCodes[keyLeft.value]; //get left key
    right = keyCodes[keyRight.value] ; //get right key
    monsterNum = numOfMonsters.value; //get number of monsters
    time = timeGame.value; //get game time
    ballNum = numOfBalls.value; //get num of balls
    fivePointsColor = fivePointsBall.value;
    fifteenPointsColor = fifteenPointsBall.value;
    twentyFivePointsColor = twentyFivePointsBall.value;
    lives = 3;
    Start();
    return false;
}

function Start() {
    inGame = true;
    audioDead.pause();
    audioDead.currentTime = 0;
    audioWin.pause();
    audioWin.currentTime = 0;
    audioGame.play();
    score = 0;
    lastX = 4;
    pac_color = "yellow";
    board = new Array();
    boardSpecial = new Array();
    boardTreat = new Array();
    var food_remain = ballNum;
    time_elapsed = 0;
    for (var i = 0; i < 10; i++) {//print board
        board[i] = new Array();
        boardSpecial[i] = new Array();
        boardTreat[i] = new Array();
        //put obstacles
        for (var j = 0; j < 10; j++) {
            board[i][j] = 0;
            boardSpecial[i][j] = 0;
            boardTreat[i][j] = 0;
        }
    }
    putWalls();
    putMonsters();
    putTreat();
    //all food
    var sml_food = Math.floor(food_remain * 0.6);
    var med_food = Math.floor(food_remain * 0.3);
    var big_food = Math.floor(food_remain * 0.1);
    food_remaining = sml_food + med_food + big_food;
    
        while(sml_food>0){
            var emptyCell = findRandomEmptyCell(board);
            board[emptyCell[0]][emptyCell[1]] = 1;
            sml_food--;
            food_remain--;
        }
        while(med_food>0){
            var emptyCell = findRandomEmptyCell(board);
            board[emptyCell[0]][emptyCell[1]] = 12;
            med_food--;
            food_remain--;
        }
        while(big_food>0){
            var emptyCell = findRandomEmptyCell(board);
            board[emptyCell[0]][emptyCell[1]] = 13;
            big_food--;
            food_remain--;
        }

    var emptyCell = findRandomEmptyCell(board);//pacman
    board[emptyCell[0]][emptyCell[1]] = 2;
    pacman.i = emptyCell[0];
    pacman.j = emptyCell[1];

    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);
    interval1 = setInterval(UpdatePosition, 100);
    updateTime();
    intervalTime = setInterval(updateTime,1000);
    intervalMedicine = setInterval(drawMed,time*1000*0.4);
    intervalTreat = setInterval(movetreat, 150);
    intervalMon1 = setInterval(moveMonster1, 350);
    if(monsterNum>=2) {
        intervalMon2 = setInterval(moveMonster2, 400);
        if (monsterNum == 3)
            intervalMon3 = setInterval(moveMonster3, 450);
    }
}

function startOver(){
    for (var i = 0; i < 10; i++) {//print board
        for (var j = 0; j < 10; j++) {
            boardSpecial[i][j] = 0;
            boardTreat[i][j] = 0;
        }
    }
    putMonsters();
    var emptyCell = findRandomEmptyCell(board);//pacman
    board[pacman.i][pacman.j] = 0;
    board[emptyCell[0]][emptyCell[1]] = 2;
    pacman.i = emptyCell[0];
    pacman.j = emptyCell[1];

    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);
    interval1 = setInterval(UpdatePosition, 100);
    intervalMedicine = setInterval(drawMed,time*1000*0.4);
    intervalTime = setInterval(updateTime,1000);
    intervalMon1 = setInterval(moveMonster1, 350);
    if(monsterNum>=2) {
        intervalMon2 = setInterval(moveMonster2, 400);
        if (monsterNum == 3)
            intervalMon3 = setInterval(moveMonster3, 450);
    }
}

function drawMed(){
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 14;
}

//Keys for key mapping
function createKeys(){
    keyCodes['a'] = 'KeyA';
    keyCodes['b'] = 'KeyB';
    keyCodes['c'] = 'KeyC';
    keyCodes['d'] = 'KeyD';
    keyCodes['e'] = 'KeyE';
    keyCodes['f'] = 'KeyF';
    keyCodes['g'] = 'KeyG';
    keyCodes['h'] = 'KeyH';
    keyCodes['i'] = 'KeyI';
    keyCodes['j'] = 'KeyJ';
    keyCodes['k'] = 'KeyK';
    keyCodes['l'] = 'KeyL';
    keyCodes['m'] = 'KeyM';
    keyCodes['n'] = 'KeyN';
    keyCodes['o'] = 'KeyO';
    keyCodes['p'] = 'KeyP';
    keyCodes['q'] = 'KeyQ';
    keyCodes['r'] = 'KeyR';
    keyCodes['s'] = 'KeyS';
    keyCodes['t'] = 'KeyT';
    keyCodes['u'] = 'KeyU';
    keyCodes['v'] = 'KeyV';
    keyCodes['w'] = 'KeyW';
    keyCodes['x'] = 'KeyX';
    keyCodes['y'] = 'KeyY';
    keyCodes['z'] = 'KeyZ';
    keyCodes['ArrowUp'] = 'ArrowUp';
    keyCodes['ArrowDown'] = 'ArrowDown';
    keyCodes['ArrowLeft'] = 'ArrowLeft';
    keyCodes['ArrowRight'] = 'ArrowRight';
    
}

//put constant walls 
function putWalls() {
    board[2][1] = 4;
    board[2][2] = 4;
    board[2][5] = 4;
    board[6][4] = 4;
    board[6][5] = 4;
    board[8][2] = 4;
    board[9][2] = 4;
    board[2][8] = 4;
    //board[2][9] = 4;
    board[8][8] = 4;
}

//place treat in the corner of the board
function putTreat() {
    treat.i=0;
    treat.j=9;
    boardTreat[0][9] = 9;
}

//place monsters in the corners of the board
function putMonsters() {
    monster1.i = 0;
    monster1.j = 0;
    boardSpecial[0][0] = 3;
    if (monsterNum >= 2) {//2 or more
        monster2.i = 9;
        monster2.j = 0;
        boardSpecial[9][0] = 3;
        if (monsterNum == 3) {//3
            monster3.i = 9;
            monster3.j = 9;
            boardSpecial[9][9] = 3;
        }
    }
}

//Start the game again from the start
function startAgain(){
    clearIntervals();
    initialize();
}

//clear all the intervals at once
function clearIntervals(){
    window.clearInterval(interval1);
    window.clearInterval(intervalMon1);
    window.clearInterval(intervalMon2);
    window.clearInterval(intervalMon3);
    window.clearInterval(intervalTime);
    window.clearInterval(intervalTreat);
    window.clearInterval(intervalMedicine);
}

function restart() {
    score = Math.max(score-10,0);
    lives = lives - 1;
    if (lives == 0) {
        audioGame.pause();
        audioGame.currentTime = 0;
        audioDead.play();
        life_show.value = lives;
        clearIntervals();
        window.alert("Game Lost!");
    } else {
        clearIntervals();
        startOver();
    }
}

function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * 10));
    var j = Math.floor((Math.random() * 10));
    while (board[i][j] != 0){//} || boardSpecial[i][j] != 0) {
        i = Math.floor((Math.random() * 10));
        j = Math.floor((Math.random() * 10));
    }
    return [i, j];
}

//return random color
function initRandomColor() {
  var suffix = '0123456789ABCDEF';
  var tag = '#';
  for (var i = 0; i < 6; i++) {
    tag += suffix[Math.floor(Math.random() * 16)];
  }
  return tag;
}

function randomize() {
    numOfMonsters.value = Math.floor(Math.random()*3+1); //random num of monsters
    timeGame.value = Math.floor(Math.random()*100 +60); //random time game
    numOfBalls.value = Math.floor(Math.random()*40+50); // random num of balls
    fivePointsBall.value = initRandomColor();
    fifteenPointsBall.value = initRandomColor();
	twentyFivePointsBall.value = initRandomColor();
    num_Of_Balls_settings = numOfBalls.value;
    time_settings = timeGame.value;
    num_of_monsters_settings = numOfMonsters.value;
}

/**
 * @return {number}
 */
function GetKeyPressed() {
    if (keysDown[up]) {
        return 1;
    }
    if (keysDown[down]) {
        return 2;
    }
    if (keysDown[left]) {
        return 3;
    }
    if (keysDown[right]) {
        return 4;
    }
}

function updateTime(){
    time_show.value = time - time_elapsed;
    if(time - time_elapsed <= 0){
        audioGame.pause();
        audioGame.currentTime = 0;
        audioWin.play();
        clearIntervals()
        if(score<=150)
            window.alert("You can do better!");
        else
            window.alert("You are a WINNER!");
    }

    time_elapsed++;
}

function Draw(x) {
    if(x != undefined)
        lastX = x;
    score_show.value = score;
    life_show.value = lives;
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] == 2) {//pac
                if(lastX == 1){//up
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x - 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                } else if(lastX == 2){//down
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x - 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                } else if(lastX == 3){//left
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                } else if(lastX == 4){//right
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                }
            } else if (board[i][j] == 1) {//food1
                context.beginPath();
                context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = fivePointsColor //color
                context.fill();
            } else if(board[i][j] == 12){//food12
                context.beginPath();
                context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
                context.fillStyle = fifteenPointsColor; //color
                context.fill();
            } else if(board[i][j] == 13){//food13
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = twentyFivePointsColor; //color
                context.fill();
            } else if(board[i][j] == 14){//med
                drawFigure(context,center,'img/medkit.png');
            } else if (board[i][j] == 4) {//wall
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "gray"; //color
                context.fill();
            }   
            if (boardSpecial[i][j] == 3) {//monster
                if (monster1.i == i && monster1.j == j) {
                    drawFigure(context,center,'img/ghost1.png');
                } else if (monster2.i == i && monster2.j == j) {
                    drawFigure(context,center,'img/ghost2.png');
                } else if (monster3.i == i && monster3.j == j) {
                    drawFigure(context,center,'img/ghost3.png');
                }
            }
            if(boardTreat[i][j] == 9)
                drawFigure(context,center,'img/treat.png');
        }
    }
}

function UpdatePosition() {
    var x = GetKeyPressed();
    movePacman(x);
    Draw(x);
}

function drawFigure(context,center,path){
    context.beginPath();
    var img = new Image();
    img.src = path;
    context.drawImage(img,center.x-30, center.y-30,50,50);
}

function moveMonster1() {
    var x = monster1.j - pacman.j;
    var y = monster1.i - pacman.i;
    if(Math.abs(x)==1 && Math.abs(y)==0 || Math.abs(x)==0 && Math.abs(y)==1 )
        restart();
    if (x == 0 && y !== 0 && !wallInTheWayY(monster1, y))
        moveY(monster1, y);
    else if (y == 0 && x !== 0 && !wallInTheWayX(monster1, x))
        moveX(monster1, x);
    else {
        var rnd = Math.random();
        if (rnd < 0.5) {
            if (!wallInTheWayX(monster1, x))
                moveX(monster1, x);
            else
                moveY(monster1, y);
        }
        if (rnd >= 0.5) {
            if (!wallInTheWayY(monster1, y))
                moveY(monster1, y);
            else
                moveX(monster1, x);
        }
    }
}

function moveMonster2() {
    var x = monster2.j - pacman.j;
    var y = monster2.i - pacman.i;
    if(Math.abs(x)==1 && Math.abs(y)==0 || Math.abs(x)==0 && Math.abs(y)==1 )
        restart();
    if (x == 0 && y !== 0 && !wallInTheWayY(monster2, y))
        moveY(monster2, y);
    else if (y == 0 && x !== 0 && !wallInTheWayX(monster2, x))
        moveX(monster2, x);
    else {
        var rnd = Math.random();
        if (rnd < 0.5) {
            if (!wallInTheWayX(monster2, x))
                moveX(monster2, x);
            else
                moveY(monster2, y);
        }
        if (rnd >= 0.5) {
            if (!wallInTheWayY(monster2, y))
                moveY(monster2, y);
            else
                moveX(monster2, x);
        }
    }
}

function moveMonster3() {
    var x = monster3.j - pacman.j;
    var y = monster3.i - pacman.i;
    if(Math.abs(x)==1 && Math.abs(y)==0 || Math.abs(x)==0 && Math.abs(y)==1 )
        restart();
    if (x == 0 && y !== 0 && !wallInTheWayY(monster3, y))
        moveY(monster3, y);
    else if (y == 0 && x !== 0 && !wallInTheWayX(monster3, x))
        moveX(monster3, x);
    else {
        var rnd = Math.random();
        if (rnd < 0.5) {
            if (!wallInTheWayX(monster3, x))
                moveX(monster3, x);
            else
                moveY(monster3, y);
        }
        if (rnd >= 0.5) {
            if (!wallInTheWayY(monster3, y))
                moveY(monster3, y);
            else
                moveX(monster3, x);
        }
    }
}

function movetreat() {
    var moves = getTreatPossibleMoves();
    var tmp = Math.floor(Math.random() * moves.length);
    moveTreatTo(moves[tmp]);
}

function getTreatPossibleMoves(){
    var moves = [];
    var i = 0;
    if(treat.i-1 >= 0 && board[treat.i-1][treat.j] != 4){
        moves[i] = {i:treat.i-1,j:treat.j}
        i++;
    }
    if(treat.i+1 <= 9 && board[treat.i+1][treat.j] != 4){
        moves[i] = {i:treat.i+1,j:treat.j};
        i++;
    }
    if(treat.j+1 <=9 && board[treat.i][treat.j+1] != 4){
        moves[i] = {i:treat.i,j:treat.j+1};
        i++;
    }
    if(treat.j-1 >=0 && board[treat.i][treat.j-1] != 4){
        moves[i] = {i:treat.i,j:treat.j-1};
        i++;
    }
    return moves;
}

function moveTreatTo(tmp){
    boardTreat[treat.i][treat.j] = 0;
    treat.i = tmp.i;
    treat.j = tmp.j;
    boardTreat[treat.i][treat.j] = 9;
}

function wallInTheWayY(monster, y) {
    if (y > 0){
        if(monster.i-1 < 0)
            return true;
        else
            return board[monster.i - 1][monster.j] == 4;
    }
    else if (y < 0){
        if(monster.i+1 > 9)
            return true;
        else
            return board[monster.i + 1][monster.j] == 4;
    }
}

function wallInTheWayX(monster, x) {
    if (x > 0){
        if(monster.j - 1 < 0)
            return true;
        else
            return board[monster.i][monster.j - 1] == 4;
    }
    else if (x < 0){
        if(monster.j + 1 > 9)
            return true;
        else
            return board[monster.i][monster.j + 1] == 4;
    }
}

function moveX(monster, x) {
    boardSpecial[monster.i][monster.j] = 0;
    if (x > 0 && monster.j-1 >= 0 && boardSpecial[monster.i][monster.j-1] == 0){
        monster.j--;
        boardSpecial[monster.i][monster.j] = 3;
        return;
    }
    if (x < 0 && monster.j+1 <= 9 && boardSpecial[monster.i][monster.j+1] == 0){
        monster.j++;
        boardSpecial[monster.i][monster.j] = 3;
        return;
    }
    if(x == 0) {
        var rnd = Math.random();
        if(rnd<0.5 && monster.i-1 >= 0 && boardSpecial[monster.i][monster.j-1] == 0)
            monster.j--;
        else if(rnd>=0.5 && monster.j+1 <= 9 && boardSpecial[monster.i][monster.j+1] == 0)
            monster.j++;
    }
    boardSpecial[monster.i][monster.j] = 3;
}

function moveY(monster, y) {
    boardSpecial[monster.i][monster.j] = 0;
    if (y > 0 && monster.i-1 >= 0 && boardSpecial[monster.i-1][monster.j] == 0){
        monster.i--;
        boardSpecial[monster.i][monster.j] = 3;
        return;
    }
    if (y < 0 && monster.i+1 <= 9 && boardSpecial[monster.i+1][monster.j] == 0){
        monster.i++;
        boardSpecial[monster.i][monster.j] = 3;
        return;
    }
    if(y == 0) {
        var rnd = Math.random();
        if(rnd<0.5 && monster.i-1 >= 0 && boardSpecial[monster.i-1][monster.j] == 0)
            monster.i--;
        else if(rnd>=0.5 && monster.i+1 <= 9  && boardSpecial[monster.i+1][monster.j] == 0)
            monster.i++;
    }
    boardSpecial[monster.i][monster.j] = 3;
}

function movePacman(x) {
    board[pacman.i][pacman.j] = 0;
    //var x = GetKeyPressed();
    if (x == 1) {
        if (pacman.j > 0 && board[pacman.i][pacman.j - 1] !== 4) {
            if (boardSpecial[pacman.i][pacman.j - 1] == 3) {//ghost
                restart();
            } else {
                pacman.j--;
            }
        }
    }
    if (x == 2) {
        if (pacman.j < 9 && board[pacman.i][pacman.j + 1] !== 4) {
            if (boardSpecial[pacman.i][pacman.j + 1] == 3) {//ghost
                restart();
            } else {
                pacman.j++;
            }
        }
    }
    if (x == 3) {
        if (pacman.i > 0 && board[pacman.i - 1][pacman.j] !== 4) {
            if (boardSpecial[pacman.i - 1][pacman.j] == 4) {//ghost
                restart();
            } else {
                pacman.i--;
            }
        }
    }
    if (x == 4) {
        if (pacman.i < 9 && board[pacman.i + 1][pacman.j] !== 4) {
            if (boardSpecial[pacman.i + 1][pacman.j] == 3) {//ghost
                restart();
            } else {
                pacman.i++;
            }
        }
    }
    if (board[pacman.i][pacman.j] == 1) {
        score+=5;
        food_remaining--;
    } else if(board[pacman.i][pacman.j] == 12){
        score+=15;
        food_remaining--;
    } else if(board[pacman.i][pacman.j] == 13){
        score+=25;
        food_remaining--;
    } 
    if(food_remaining == 0){
        audioGame.pause();
        audioGame.currentTime = 0;
        audioWin.play();
        clearIntervals()
        if(score<=150)
            window.alert("You can do better!");
        else
            window.alert("You are a WINNER!");
    }
    if(board[pacman.i][pacman.j] == 14){
        lives+=1;
    }
    if(boardTreat[pacman.i][pacman.j] == 9){
        boardTreat[pacman.i][pacman.j] = 0;
        score+=50;
        window.clearInterval(intervalTreat);
    }
    board[pacman.i][pacman.j] = 2;
}

function changeScreen(screen) {
    if(inGame != undefined && inGame != false){
        inGame = false;
        clearIntervals();
        audioGame.pause();
        audioGame.currentTime=0;
        audioDead.pause();
        audioDead.currentTime=0;
        audioWin.pause();
        audioWin.currentTime=0;
        if(screen!='canvasDiv')
        alert("You will be logged out");
    }
    wholeScreen = document.getElementsByClassName('part');
    wantedScreen = document.getElementById(screen);

    for (var i = 0; i < wholeScreen.length; i++) {
        noneAll(wholeScreen.item(i));
    }
    wantedScreen.style.display = 'block';
}

function noneAll(item) {
    item.style.display = 'none';
}