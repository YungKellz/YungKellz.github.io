var gameField = document.getElementById('game_field'),
    settings_easy = document.getElementById('easy'),
    settings_normal = document.getElementById('normal'),
    settings_hard = document.getElementById('hard'),
    widthField = gameField.offsetWidth,
    summaryTime = 0,
    summaryMistakes = 0,
    squareline = 4,
    squareNumber = 4 * 4,
    level = 0,
    d = 10;
/*help functions*/
function rgb(r, g, b){
  return "rgb("+r+","+g+","+b+")";
}
function rndInt(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

/*Pregame states*/
button_desc.addEventListener("click", openDesc);

settings_easy.addEventListener("click", settings);
settings_normal.addEventListener("click", settings);
settings_hard.addEventListener("click", settings);

button_stop.addEventListener("click", endGame);

button_start.addEventListener("click", Play);


function openDesc(){
    button_desc.removeEventListener("click", openDesc);
    button_desc.addEventListener("click", closeDesc);
    button_desc.src="../../img/icons/question_close.svg";
    button_desc.style.top = 17 + descriptionOfGame.offsetHeight/2 + "px";
    nameOfGame.style.height = descriptionOfGame.offsetHeight + 33 + "px";
    descriptionOfGame.style.opacity = "1";
}

function closeDesc(){
    button_desc.removeEventListener("click", closeDesc);
    button_desc.addEventListener("click", openDesc);
    button_desc.src="../../img/icons/question.svg";
    button_desc.style.top = "5px";
    setTimeout(() => {
        nameOfGame.style.height = "33px";
    }, 300);
    descriptionOfGame.style.opacity = "0";
}
/*Play*/
function Play() {
    summaryMistakes = 0;
    summaryTime = 0;
    level = 0;

    button_start.style.opacity="0";
    button_start.style.visibility="hidden";
    button_start.removeEventListener("click", Play);

    setTimeout(() => {
        timer.style.visibility="visible";
        timer.style.opacity="1";
        button_start.addEventListener("click", Play);
    }, 400);
    white_cover.style.opacity="0";
    white_cover.style.visibility="hidden";

    checkLevel();
    playTimer(15);
    fillField(squareNumber);
}

/*afterPlay*/

function settings(){
    if (this.className === "settings") {
        var a = document.getElementsByClassName('active');
        console.log("изменилась сложность на " + a[0].id);
        a[0].classList.remove("active");
        this.classList.add("active");
    }
    if (this.id === "easy") d = 15;
    else if (this.id === "normal") d = 10;
    else d = 6;
}

function squareClick(){
    this.style.transform = "scale(0.9)";
    if (this.className === "square aim"){
        level++;
        checkLevel();
        clearField();
        fillField(squareNumber);
        seconds +=  2;
        plustwo.style.opacity = "1";
        setTimeout(function(){
            plustwo.style.opacity = "0";
        }, 500);
    } else {
        this.removeEventListener("click", squareClick);
        this.style.cursor = "default";
        summaryMistakes++;
        seconds -=  2;
        minustwo.style.opacity = "1";
        setTimeout(function(){
            minustwo.style.opacity = "0";
        }, 500);
    }
}
function checkLevel(){
    if (level < 6) {squareNumber = 4 * 4; squareline = 4;}
    else if (level < 11) {squareNumber = 5 * 5; squareline = 5;}
    else if (level < 16) {squareNumber = 6 * 6; squareline = 6;}
    else if (level < 21) {squareNumber = 7 * 7; squareline = 7;}
    else if (level < 31) {squareNumber = 8 * 8; squareline = 8;}
    else if (level < 41) {squareNumber = 9 * 9; squareline = 9;}
    else if (level < 51) {squareNumber = 10 * 10; squareline = 10;}
    else if (level < 61) {squareNumber = 11 * 11; squareline = 11;}
    else if (level < 71) {squareNumber = 12 * 12; squareline = 12;}
}

function clearField(){
    let squares = document.getElementsByClassName("square")
    for (let i = squares.length - 1; i >= 0; i--) {
        squares[i].parentNode.removeChild(squares[i]);        
    }
}

function fillField(squareNumber){
    for (let i = 0; i < squareNumber; i++) {
        addSquare();
    }
    let squares = document.getElementsByClassName("square"),
        r = rndInt(15,240),
        g = rndInt(15,240),
        b = rndInt(15,240),
        levelColor = rgb(r,g,b);
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = levelColor;
    }
    /*aim square*/
    let f = rndInt(1,2),
        j = rndInt(0,squares.length-1);
    squares[j].className = "square aim"
    if (f===1) {
        squares[j].style.backgroundColor = rgb(r + d, g + d, b + d)
    }else
    squares[j].style.backgroundColor = rgb(r - d, g - d, b - d)
}
function addSquare(){
    let square = document.createElement("div");
    square.className = "square";
    square.style.width = widthField / squareline - 2 +"px";
    square.style.height = widthField / squareline - 2 +"px";
    square.addEventListener("click", squareClick);
    gameField.appendChild(square);
}

function playTimer(a){
    seconds = a;     
    var idInt = setInterval(function() {
        
        if (Math.floor(seconds) > 10){
            time.style.color = "black";
        }
        if (Math.floor(seconds) <= 10) {
            time.style.color = "orange";
        }
        if (Math.floor(seconds) <= 5) {
            time.style.color = "red";
        }
        if (Math.floor(seconds) <= 0) {
            clearInterval(idInt);
            endGame();
        } else {
            time.innerHTML = Math.floor(seconds);
            summaryTime += 0.01;
            seconds -= 0.01;
        }
    }, 10);
}
/* end game */
function endGame(){
    if (Math.floor(summaryTime / 60) > 0) {
        if (Math.floor(summaryTime % 60) < 10) {
            sumTime.innerHTML = Math.floor(summaryTime / 60) + ':0' + Math.floor(summaryTime % 60);
        } else{
            sumTime.innerHTML = Math.floor(summaryTime / 60) + ':' + Math.floor(summaryTime % 60);
        }
    } else {
        sumTime.innerHTML = Math.floor(summaryTime);
    }
    sumLevels.innerHTML = level;
    sumMistakes.innerHTML = summaryMistakes;
    sumTab.style.opacity = "1";

    
    seconds = -1;
    time.style.color = "black";
    button_start.style.visibility="visible";

    white_cover.style.opacity="1";
    white_cover.style.visibility="visible";
    button_stop.removeEventListener("click", endGame);
    timer.style.opacity="0";
    timer.style.visibility="hidden";
    
    
    setTimeout(() => {
        button_start.style.opacity="1";
        button_start.style.visibility="visible";
        button_stop.addEventListener("click", endGame);
        clearField();
    }, 500);
}

