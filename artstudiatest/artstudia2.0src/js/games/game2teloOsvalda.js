game_field.style.maxHeight = document.documentElement.clientHeight*0.6 + "px";
game_field.style.maxWidth  = document.documentElement.clientHeight*0.6 + "px";
var game_field_width = 500;
if (game_field_width > document.documentElement.clientHeight*0.6) game_field_width = document.documentElement.clientHeight*0.6;


var 
    numOfTry = 0,
    flagForCloseDescAnimation = false,
    gameFieldLine = 0,
    gameFieldNum = 0,
    seconds = 0,
    gameOn = false,
    cell_width = 0,
    gameSquares;

//////////////////////*help functions*/
function rgb(r, g, b){
  return "rgb("+r+","+g+","+b+")";
};
function rndInt(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
};
function LetsColor(a,color){
    const l = Math.round(Math.sqrt(a.length));
    let w = l;
    var pointsForS = new Array(w);
    for (let i = pointsForS.length - 1; i > -1; i--) {
        pointsForS[i] = 1 - i / (w - 1);
    }
    //console.log(pointsForS);

    var pointsForL = new Array(w*2 - 1);
    for (let i = pointsForL.length - 1; i > -1; i--) {
        pointsForL[i] = i / (w*2 - 2);
    }
    //console.log(pointsForL);
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < w; j++) {
            let S  = pointsForS[j + i]*100,
                L  = pointsForL[j + Math.round((w*2 - 1)/2) - 1]*100;

            a[i*l + j].style.backgroundColor = "hsl(" + color +", " + S + "%, " + L + "%)";
            //a[i*l + j].innerHTML = "(" + i + ", " + j + ")<br>насыщ/S = " + S + "<br>светл/L = " + L;
        };
        w--;
    }
    //console.log(w);
    //console.log(pointsForS);
    pointsForS.reverse();
    w = l;
    for (let i = 0; i < l; i++) {
        for (let j = l-1 ; j >= w-1; j--) {
            let S  = pointsForS[j + i - l + 1]*100,
                L  = pointsForL[j + Math.round((w*2 - 1)/2) - 1]*100;
            a[i*l + j].style.background = "hsl(" + (color + 180) +", " + S + "%, " + L + "%)";
            //a[i*l + j].innerHTML = "(" + i + ", " + j + ")<br>S = " + S + "<br>Act = " + (j + i - l + 1) + "<br>L = " + L;
        };
        w--;
    }
};
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};
(function(jQuery){
    jQuery.fn.shuffle = function(){
        var allElems = this.get();

        var getRandom = function(max){
            return Math.floor(Math.random() * max);
        }

        var shuffled = jQuery.map(allElems, function(){
            var random = getRandom(allElems.length),
            randEl = jQuery(allElems[random]).clone(true)[0];
            allElems.splice(random, 1);
            return randEl;
        });

        this.each(function(i){
            jQuery(this).replaceWith(jQuery(shuffled[i]));
        });

        return jQuery(shuffled);
    };
})(jQuery);

function sameWH(object, value){
    if (typeof value === 'number') {
        object.style.width  = value + "px";
        object.style.height = value + "px";
    } else
    object.style.width  = value;
    object.style.height = value;
};
/////////////////////*Pregame states*/
/**Меню подсказки и вопрос о знании правил */
function DescAndQuest(){
    button_desc.addEventListener("click", openDesc);

    Array.prototype.slice.call( document.getElementsByClassName('btn settings') ).forEach(element => {
        element.addEventListener('click', settings);
    });
    questionAboutDesc_yes.addEventListener('click', function() {
        questionAboutDescFun(true);
    });
    questionAboutDesc_no.addEventListener('click', function() {
        questionAboutDescFun(false);
    });

    function questionAboutDescFun(a){
        questionAboutDesc.style.opacity = "0";
        setTimeout(() => {
            questionAboutDesc.style.display = "none";

            settings_field.style.opacity = "1";
            settings_field.style.visibility = "visible";
            normal.click();

            button_desc.style.opacity = "0.5";
            button_desc.style.visibility = "visible";
            if (!a) {
                openDesc();
                setTimeout(() => {
                    if(!flagForCloseDescAnimation){
                        button_desc.style.transform = "rotate(360deg)";
                    }
                }, 5500);
            }
        }, 400);
    }

    function openDesc(){
        button_desc.removeEventListener("click", openDesc);
        button_desc.addEventListener("click", closeDesc);
        button_desc.src="../../img/icons/question_close.svg";
        button_desc.style.top = 17 + descriptionOfGame.offsetHeight/2 + "px";
        setTimeout(() => {
            descriptionOfGame.style.opacity = "1";
        }, 300);
        nameOfGame.style.height = descriptionOfGame.offsetHeight + 33 + "px";
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
        flagForCloseDescAnimation = true;
    }
};
DescAndQuest();

/*Секундомер*/
function playTimer(){
    seconds = 0;     
    var idInt = setInterval(function() {
        if (gameOn) {
            clearInterval(idInt);
        } else {
            time.innerHTML = Math.floor(seconds);
            seconds += 0.01;
        }
    }, 10);
};

/*Настрока сложности*/
function settings(){
    if (this.className !== "settings active") {
        var a = document.getElementsByClassName('active');
        console.log("изменилась сложность на " + this.id);
        a[0].classList.remove("active");
        this.classList.add("active");
    }
    if (this.id === "easy") {
        numOfTry = 4; 
        gameFieldLine = 5; 
        gameFieldNum = gameFieldLine*gameFieldLine;
        fieldSizeTxt.innerHTML = gameFieldLine + "x" + gameFieldLine;
        numOfTryTxt.innerHTML = numOfTry;
    } else 
    if (this.id === "normal") {
        numOfTry = 3; 
        gameFieldLine = 8; 
        gameFieldNum = gameFieldLine*gameFieldLine;
        fieldSizeTxt.innerHTML = gameFieldLine + "x" + gameFieldLine;
        numOfTryTxt.innerHTML = numOfTry;
    }
    else {
        numOfTry = 2; 
        gameFieldLine = 12; 
        gameFieldNum = gameFieldLine*gameFieldLine;
        fieldSizeTxt.innerHTML = gameFieldLine + "x" + gameFieldLine;
        numOfTryTxt.innerHTML = numOfTry;
    }
    console.log("Размер поля " + gameFieldLine);
};

// button_stop.addEventListener("click", endGame);

/////////////////////////////////////////////////////////////////**PLAY */
button_start.addEventListener("click", Play);
function Play(){
    /**Запустили секундомер */
    playTimer();
    /**Спрятали настройки и показали игровое поле */
    settings_field.style.opacity = 0;
    setTimeout(() => { 
        settings_field.style.display = "none";
        play_field.style.display = "block";
        play_field.style.opacity = "0";
        setTimeout(() => {
            play_field.style.opacity = "1";
        }, 5);
    }, 500);
    /**Создаем cells и squares*/
    createCells(gameFieldNum);
    createSquares(gameFieldNum);
    /**Обнуляем статистику */
    numOfTry = numOfTry + 1;
    checkRights();
    currentScore.innerHTML = "0";
    maxScore.innerHTML     = gameFieldNum - 4;
    tryCount.innerHTML     = numOfTry;

};




function createCells(gameFieldNum){
    //console.log(game_field_width,gameFieldLine,(game_field_width / gameFieldLine))
    cell_width = game_field_width / gameFieldLine;
    for (let i = 0; i < gameFieldNum; i++) {
        let cell = document.createElement("div");
        cell.className    = "cell";
        cell.alt          = i + 1;
        cell.style.width  = game_field_width / gameFieldLine +"px";
        cell.style.height = game_field_width / gameFieldLine +"px";
        game_field.appendChild(cell);
    }
};

function createSquares(gameFieldNum){
    for (let i = 0; i < gameFieldNum; i++) {
        let square = document.createElement("div");
        square.className    = "square";
        square.draggable    = "true";
        square.alt          = i + 1;
        sameWH(square, cell_width*0.8);
        
        pull_field.appendChild(square);
    }
    const gameCells   = document.querySelectorAll('.cell');
    const gameSquares = document.querySelectorAll('.square');

    LetsColor(gameSquares,rndInt(0,360));

    sameWH(gameSquares[0], cell_width);
    sameWH(gameSquares[gameFieldLine - 1], cell_width);
    sameWH(gameSquares[gameFieldNum - gameFieldLine], cell_width);
    sameWH(gameSquares[gameFieldNum - 1], cell_width);

    gameCells[0].appendChild(gameSquares[0]);
    gameCells[gameFieldLine - 1].appendChild(gameSquares[gameFieldLine - 1]);
    gameCells[gameFieldNum - gameFieldLine].appendChild(gameSquares[gameFieldNum - gameFieldLine ]);
    gameCells[gameFieldNum - 1].appendChild(gameSquares[gameFieldNum - 1]);
    
    // jQuery(document).ready(function(){
    //     jQuery('.square').shuffle();
    // });
    dragAndDrop();
};

setTimeout(() => {
    questionAboutDesc_yes.click();
    setTimeout(() => {
        button_start.click();
    }, 500);
}, 500);

///////////////////////////////////////         DRAG AND DROP
/**для квадратов */
const dragStart = function () {
    DragItm = this;
    sameWH(DragItm, cell_width * 0.8);
    setTimeout(() => {
        this.style.display = "none";
    }, 0);
};
const dragEnd = function () {
    if (DragItm.parentElement.id !== 'pull_field') sameWH(DragItm, cell_width);
    else sameWH(DragItm, cell_width*0.8);
    this.style.display = "inline-block"; 
    DragItm = null;
};

/**для ячеек */
const dragOver = function (evt) {
    evt.preventDefault();
};
const dragEnter = function () {
    if(this.id !== "pull_field")
    this.style.border = "3px solid rgba(228, 228, 228,1)";
};
const dragLeave = function () {
    if(this.id !== "pull_field")
    this.style.border = "1px solid rgba(228, 228, 228,0.3)";
};
const dragDrop = function () {

    if(this.id !== "pull_field"){
        if (this.children.length == 0) {
            this.style.border = "1px solid rgba(228, 228, 228,0.3)";
            sameWH(DragItm, cell_width);
            this.prepend(DragItm);
        } else {
            if (DragItm.parentElement.id == "pull_field") {
                //sameWH(this.children[0],cell_width*0.8)
            }
            sameWH(DragItm, cell_width);
            DragItm.parentElement.prepend(this.children[0]);
            this.prepend(DragItm);
        }           
    }else{
        this.prepend(DragItm);
    }
    this.style.border = "1px solid rgba(228, 228, 228,0.3)";
    console.log('drop');
};
/**ГЛАВНОЕ */

function dragAndDrop() {
    const squares = document.querySelectorAll('.square');
    const cells   = document.querySelectorAll('.cell');
    let   DragItm = null;

    /*Задаем листенеры для квадратов*/
    squares.forEach((square) => {
        square.addEventListener('dragstart', dragStart);
        square.addEventListener('dragend', dragEnd);
    });
    
    /*Задаем листенеры для ячеек*/
    cells.forEach((cell) => {
        cell.addEventListener('dragover',dragOver);
        cell.addEventListener('dragenter',dragEnter);
        cell.addEventListener('dragleave',dragLeave);
        cell.addEventListener('drop',dragDrop);
    });
};
////////////////////////////////////////////////////         ПРОВЕРКА
button_check.addEventListener('click', checkRights);
function checkRights() {
    var tryGood=0, tryBad=0;
    console.log('asd');
    //game_field.style.backgroundColor = "red";
    numOfTry--;
    
    if (numOfTry == 0) {
        button_check.removeEventListener ('click', checkRights);
        button_check.style.borderColor = "rgb(220, 220, 220)"
        button_check.style.color = "rgb(220, 220, 220)";
        tryCountTxt.innerHTML = 'проверок не осталось';
    } else {
        if (numOfTry == 1) {
            tryCountTxt.innerHTML = 'осталась <b>последняя</b> проверка';
        } else {tryCount.innerHTML = numOfTry;}
    }
    game_field.style.boxShadow = "0px 0px 26px rgba(0, 0, 0, 0.3)";
    setTimeout(() => {game_field.style.boxShadow = "0px 0px 12px rgba(0, 0, 0, 0.05)"}, 400);

    const suspectSquares = document.querySelectorAll('#game_field .cell .square');
    console.log(suspectSquares);
    for (let i = 0; i < suspectSquares.length; i++) {

        console.log(suspectSquares[i].alt,suspectSquares[i].parentElement.alt)
        if (suspectSquares[i].parentElement.alt == suspectSquares[i].alt) {
            console.log('yes');
            tryGood = tryGood + 1;
            let img = document.createElement("img");
                img.src    = "../../img/icons/lock.svg";
            suspectSquares[i].parentElement.removeEventListener('dragover',dragOver);
            suspectSquares[i].parentElement.appendChild(img);


            suspectSquares[i].parentElement.style.backgroundColor = suspectSquares[i].style.backgroundColor;
            suspectSquares[i].remove();



            //cell.removeEventListener('dragover',dragOver);
        } else {
            tryBad = tryBad + 1;
            suspectSquares[i].style.transition = "0.9s";
            setTimeout(() => {
                sameWH(suspectSquares[i], cell_width*0.1);
                suspectSquares[i].style.opacity = 0;
                setTimeout(() => {

                    pull_field.prepend(suspectSquares[i]);
                    
                }, 900);
            }, 300 + i*10);
            setTimeout(() => {
                sameWH(suspectSquares[i], cell_width*0.8);
                suspectSquares[i].style.opacity = 1;
            }, 1200 );

        }
    }
    console.log(tryGood,tryBad);
    
}





/*Play*/
// function Play() {
//     summaryMistakes = 0;
//     summaryTime = 0;
//     level = 0;

//     settings_field.style.opacity="0";
//     settings_field.style.visibility="hidden";
//     button_start.removeEventListener("click", Play);

//     setTimeout(() => {
//         // timer.style.visibility="visible";
//         // timer.style.opacity="1";
//         button_start.addEventListener("click", Play);
//         settings_field.style.display="none";
//     }, 400);
//     white_cover.style.opacity="0";
//     white_cover.style.visibility="hidden";

//     checkLevel();
//     playTimer(15);
//     fillField(gameFieldNum);
// }
/*afterPlay*/

// function settings(){
//     console.clear();
//     if (this.className !== "settings active") {
//         var a = document.getElementsByClassName('active');
//         console.log("изменилась сложность на " + this.id);
//         a[0].classList.remove("active");
//         this.classList.add("active");
//     }
//     if (this.id === "easy") d = 12;
//     else if (this.id === "normal") d = 8;
//     else d = 6;
//     console.log("Разница равна " + d);
// }

// function squareClick(){
//     this.style.transform = "scale(0.9)";
//     if (this.className === "square aim"){
//         level++;
//         checkLevel();
//         clearField();
//         fillField(gameFieldNum);
//         seconds +=  2;
//         plustwo.style.opacity = "1";
//         setTimeout(function(){
//             plustwo.style.opacity = "0";
//         }, 500);
//     } else {
//         this.removeEventListener("click", squareClick);
//         this.style.cursor = "default";
//         summaryMistakes++;
//         seconds -=  2;
//         minustwo.style.opacity = "1";
//         setTimeout(function(){
//             minustwo.style.opacity = "0";
//         }, 500);
//     }
// }
// function checkLevel(){
//     if (level < 6) {n = 4;}
//     else if (level < 11) {n = 5;}
//     else if (level < 16) {n = 6;}
//     else if (level < 21) {n = 7;}
//     else if (level < 26) {n = 8;}
//     else if (level < 31) {n = 9;}
//     else if (level < 36) {n = 10;}
//     else if (level < 41) {n = 11;}
//     else if (level < 46) {n = 12;}
//     // else if (level < 51) {n = 13;}
//     // else if (level < 56) {n = 14;}
//     // else if (level < 61) {n = 15;}
//     // else if (level < 66) {n = 16;}
//     gameFieldNum = n * n;
//     gameFieldLine = n;
// }

// function clearField(){
//     let squares = document.getElementsByClassName("square")
//     for (let i = squares.length - 1; i >= 0; i--) {
//         squares[i].parentNode.removeChild(squares[i]);        
//     }
// }

// function fillField(gameFieldNum){
//     for (let i = 0; i < gameFieldNum; i++) {
//         addSquare();
//     }
//     let squares = document.getElementsByClassName("square"),
//         r = rndInt(15,240),
//         g = rndInt(15,240),
//         b = rndInt(15,240),
//         levelColor = rgb(r,g,b);
//     for (let i = 0; i < squares.length; i++) {
//         squares[i].style.backgroundColor = levelColor;
//     }
//     /*aim square*/
//     let f = rndInt(1,2),
//         j = rndInt(0,squares.length-1);
//     squares[j].className = "square aim"
//     if (f===1) {
//         squares[j].style.backgroundColor = rgb(r + d, g + d, b + d)
//     }else
//     squares[j].style.backgroundColor = rgb(r - d, g - d, b - d)
// }
// function addSquare(){
//     let square = document.createElement("div");
//     square.className = "square";
//     square.style.width = widthField / gameFieldLine - 2 +"px";
//     square.style.height = widthField / gameFieldLine - 2 +"px";
//     square.addEventListener("click", squareClick);
//     gameField.appendChild(square);
// }

// function playTimer(a){
//     seconds = a;     
//     var idInt = setInterval(function() {
        
//         if (Math.floor(seconds) > 10){
//             time.style.color = "black";
//         }
//         if (Math.floor(seconds) <= 10) {
//             time.style.color = "orange";
//         }
//         if (Math.floor(seconds) <= 5) {
//             time.style.color = "red";
//         }
//         if (Math.floor(seconds) <= 0) {
//             clearInterval(idInt);
//             endGame();
//         } else {
//             time.innerHTML = Math.floor(seconds);
//             summaryTime += 0.01;
//             seconds -= 0.01;
//         }
//     }, 10);
// }
/* end game */
// function endGame(){
//     if (Math.floor(summaryTime / 60) > 0) {
//         if (Math.floor(summaryTime % 60) < 10) {
//             sumTime.innerHTML = Math.floor(summaryTime / 60) + ':0' + Math.floor(summaryTime % 60);
//         } else{
//             sumTime.innerHTML = Math.floor(summaryTime / 60) + ':' + Math.floor(summaryTime % 60);
//         }
//     } else {
//         sumTime.innerHTML = Math.floor(summaryTime);
//     }
//     sumLevels.innerHTML = level;
//     sumMistakes.innerHTML = summaryMistakes;
//     sumTab.style.opacity = "1";

    
//     seconds = -1;
//     time.style.color = "black";
//     button_start.style.visibility="visible";

//     white_cover.style.opacity="1";
//     white_cover.style.visibility="visible";
//     // button_stop.removeEventListener("click", endGame);
//     button_start.removeEventListener("click", Play);
//     // timer.style.opacity="0";
//     // timer.style.visibility="hidden";
    
    
//     setTimeout(() => {
//         button_start.style.opacity="1";
//         button_start.style.visibility="visible";
//         button_start.addEventListener("click", Play);
//         // button_stop.addEventListener("click", endGame);
//         clearField();
//     }, 500);
// }