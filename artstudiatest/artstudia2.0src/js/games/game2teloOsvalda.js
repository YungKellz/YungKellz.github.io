game_field.style.maxHeight = document.documentElement.clientHeight*0.6 + "px";
game_field.style.maxWidth  = document.documentElement.clientHeight*0.6 + "px";
var game_field_width = 500;
if (game_field_width > document.documentElement.clientHeight*0.6) game_field_width = document.documentElement.clientHeight*0.6;


var numOfTryConst = 0,
    numOfTry = 0,
    flagForCloseDescAnimation = false,
    gameFieldLine = 0,
    gameFieldNum = 0,
    seconds = 0,
    gameOn = false,
    cell_width = 0,
    squaresOnField = 4,
    triedNum = -1,
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
    let secondColor = color + rndInt(60, 300);
    for (let i = 0; i < l; i++) {
        for (let j = l-1 ; j >= w-1; j--) {
            let S  = pointsForS[j + i - l + 1]*100,
                L  = pointsForL[j + Math.round((w*2 - 1)/2) - 1]*100;
            a[i*l + j].style.background = "hsl(" + secondColor +", " + S + "%, " + L + "%)";
            //a[i*l + j].innerHTML = "(" + i + ", " + j + ")<br>S = " + S + "<br>Act = " + (j + i - l + 1) + "<br>L = " + L;
        };
        w--;
    }
};
function shuffle(arr){
	var j, color, alt;
	for(var i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		color = arr[j].style.backgroundColor;
		arr[j].style.backgroundColor = arr[i].style.backgroundColor;
        arr[i].style.backgroundColor = color;
		alt = arr[j].alt;
		arr[j].alt = arr[i].alt;
		arr[i].alt = alt;
	}
	return arr;
}

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
        if (!gameOn) {
            clearInterval(idInt);
        } else {
            if (Math.floor(seconds / 60) > 0) {
                if (Math.floor(seconds % 60) < 10) {
                    time.innerHTML = Math.floor(seconds / 60) + ':0' + Math.floor(seconds % 60);
                } else{
                    time.innerHTML = Math.floor(seconds / 60) + ':' + Math.floor(seconds % 60);
                }
            } else {
                time.innerHTML = Math.floor(seconds);
            }
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
        numOfTryConst = 4;
        numOfTry      = numOfTryConst; 
        gameFieldLine = 5; 
        gameFieldNum  = gameFieldLine*gameFieldLine;
        fieldSizeTxt.innerHTML = gameFieldLine + "x" + gameFieldLine;
        numOfTryTxt.innerHTML = numOfTryConst;
    } else 
    if (this.id === "normal") {
        numOfTryConst = 3;
        numOfTry      = numOfTryConst; 
        gameFieldLine = 3; 
        gameFieldNum  = gameFieldLine*gameFieldLine;
        fieldSizeTxt.innerHTML = gameFieldLine + "x" + gameFieldLine;
        numOfTryTxt.innerHTML = numOfTryConst;
    }
    else {
        numOfTryConst = 2;
        numOfTry      = numOfTryConst; 
        gameFieldLine = 12; 
        gameFieldNum  = gameFieldLine*gameFieldLine;
        fieldSizeTxt.innerHTML = gameFieldLine + "x" + gameFieldLine;
        numOfTryTxt.innerHTML = numOfTryConst;
    }
    console.log("Размер поля " + gameFieldLine);
};

/*hover для button_check*/
function button_check_mouseenter (){
    button_check.style.color = '#FF6600';
    button_check.style.borderColor = '#FF6600';
}
function button_check_mouseleave (){
    button_check.style.color = '#636363';
    button_check.style.borderColor = '#636363';
}

button_check.addEventListener('mouseenter',button_check_mouseenter);
button_check.addEventListener('mouseleave',button_check_mouseleave);

/* максимальная ширина пула*/
function pull_field_maxWidth(){
    let currentWidth = pull_field.offsetWidth;
    //console.log(currentWidth);
}

                                            /////////////**PLAY */
button_start.addEventListener("click", Play);
function Play(){
    gameOn = true;
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
        }, 100);
    }, 500);
    /**Создаем cells и squares*/
    createCells(gameFieldNum);
    createSquares(gameFieldNum);
    /**Обнуляем статистику */
    numOfTry = numOfTry + 1;
    checkRights(button_check);
    
    shuffle(pull_field.querySelectorAll('.square'));
    pull_field_maxWidth();
    currentScore.innerHTML = squaresOnField;
    maxScore.innerHTML     = gameFieldNum;
    tryCountTxt.innerHTML  = 'осталось <span id="tryCount">2</span> проверки';
    tryCount.innerHTML     = numOfTry;
    /** Полупрозрачные замки */
    
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
        document.querySelector('head style').innerHTML = '#pull_field .square {margin:' + cell_width*0.2 + 'px;} #pull_field {border-radius:' + cell_width*0.3 + 'px; padding:' + cell_width*0.1 + 'px; min-width:' + cell_width*1.4 + 'px; min-height:' + cell_width*1.4 + 'px}';
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



///////////////////////////////////////         DRAG AND DROP
/**для квадратов */
const dragStart = function () {
    game_field.querySelectorAll('img').forEach(element => {
        element.style.opacity = "0.5";
    });
    DragItm = this;
    setTimeout(() => {
        this.style.display = "none";
    }, 0);
};
const dragEnd = function () {
    this.style.display = "inline-block"; 
    DragItm = null;
};

/**для ячеек */
const dragOver = function (evt) {
    evt.preventDefault();
};
const dragEnter = function () {
    if(this.id !== "pull_field" && ((this.children.length == 0 && this.style.backgroundColor == '')||(this.children.length !== 0 && this.querySelectorAll('img').length == 0))){
        this.style.border = "3px solid rgba(228, 228, 228,1)";
    }
};
const dragLeave = function () {
    if(this.id !== "pull_field")if(this.id !== "pull_field" && this.children.length == 0 && this.style.backgroundColor == ''){
        this.style.border = "1px solid rgba(228, 228, 228,0.3)";
    }
    if(this.id !== "pull_field" && this.children.length !== 0 && this.querySelectorAll('img').length == 0){
        this.style.border = "none";
    }
    
};
const dragDrop = function () {
    let changeNumOnField = 0;

    if(this.className == "cell"){
        let otkuda = DragItm.parentElement,
                kuda = this;
        if (otkuda.id == "pull_field") {
            if (kuda.id == "pull_field") {
                console.log('pp')
            }
            else {
                console.log('pg');
                kuda.style.border = "none";
                
                if (kuda.children.length == 0) {
                    changeNumOnField = 1;
                    sameWH(DragItm, cell_width);
                    kuda.prepend(DragItm);
                }
                else{
                    changeNumOnField = 0;
                    sameWH(kuda.children[0], cell_width*0.8);
                    sameWH(DragItm, cell_width);
                    otkuda.prepend(kuda.children[0]);
                    kuda.prepend(DragItm);
                }
            }
        }
        if (otkuda.id !== "pull_field") {
            if (kuda.id == "pull_field") {
                console.log('gp')
                changeNumOnField = -1;
                sameWH(DragItm, cell_width*0.8);
                kuda.prepend(DragItm);                   
            }
            else {
                console.log('gg');
                kuda.style.border = "none";
                changeNumOnField = 0;
                if (kuda.children.length == 0) {
                    sameWH(DragItm, cell_width);
                    kuda.prepend(DragItm);
                    otkuda.style.border = "1px solid rgba(228, 228, 228,0.3)";
                }
                else{
                    sameWH(DragItm, cell_width);
                    otkuda.prepend(kuda.children[0]);
                    kuda.prepend(DragItm);
                    otkuda.style.border = "none";
                }
            }
        }
        
    }else{
        console.log('cs')
        this.prepend(DragItm);
        changeNumOnField = -1;
    }
    plusMinus(changeNumOnField);
};
/**ГЛАВНОЕ */

function dragAndDrop() {
    var squares = document.querySelectorAll('.square');
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
/////////////////////////////////////////............///////////         ПРОВЕРКА

button_check.addEventListener('click', button_check_pressed);
function button_check_pressed() {checkRights(button_check)};

function checkRights(btn) {
    console.log('numOfTry',numOfTry);
    var tryBad = 0;
    //game_field.style.backgroundColor = "red";
    numOfTry--;
    if (btn.id !== 'button_stop') {
        triedNum++;
    }
    

    game_field.addEventListener('mouseenter', function () {
        game_field.querySelectorAll('img').forEach(element => {
            element.style.opacity = "0.5";
        });
    })
    game_field.addEventListener('mouseleave', function () {
        game_field.querySelectorAll('img').forEach(element => {
            element.style.opacity = "0";
        });
    })
                                            /////////**ИЗМЕНЕНИЯ В STAT_FIELD */
    if (triedNum >= 1) {
        if (btn.id !== 'button_stop') {
            btn.style.backgroundColor = "rgba(255, 102, 0, 0.2)";
        }
        setTimeout(() => {
            btn.style.backgroundColor = "white";
        }, 400);

        setTimeout(() => {game_field.style.boxShadow = "0px 0px 36px rgba(0, 0, 0, 0.05)"}, 400);
        if (numOfTry == 0) {
            
            button_check.removeEventListener('mouseenter',button_check_mouseenter);
            button_check.removeEventListener('mouseleave',button_check_mouseleave);
            button_check.removeEventListener ('click', button_check_pressed);
            button_check.style.borderColor = "rgb(220, 220, 220)"
            button_check.style.color = "rgb(220, 220, 220)";
            tryCountTxt.innerHTML = 'проверок не осталось';
        } else {
            if (numOfTry == 1) {
                tryCountTxt.innerHTML = 'осталась <span id="tryCount">одна</span> проверка';
            } else {tryCount.innerHTML = numOfTry;}
        }
        if (btn.id !== 'button_stop') {
            game_field.style.boxShadow = "0px 0px 50px rgba(0, 0, 0, 0.2)";
        }
        
    }
                                            /////////**ОТЛОВ ПОДОЗРЕВАЕМЫХ */
    const suspectSquares = document.querySelectorAll('#game_field .cell .square');
    for (let i = 0; i < suspectSquares.length; i++) {

        //console.log(suspectSquares[i].alt,suspectSquares[i].parentElement.alt)
                                            //////////**совпадение */
        if (suspectSquares[i].parentElement.alt == suspectSquares[i].alt) {
            //console.log('yes');
            let img = document.createElement("img");
                img.src    = "../../img/icons/lock.svg";
            suspectSquares[i].parentElement.removeEventListener('dragover',dragOver);
            suspectSquares[i].parentElement.appendChild(img);


            suspectSquares[i].parentElement.style.backgroundColor = suspectSquares[i].style.backgroundColor;
            suspectSquares[i].parentElement.style.border = "none";
            suspectSquares[i].remove();
        } else {
                                            //////////**не совпали */
            suspectSquares[i].parentElement.style.border = "1px solid rgba(228, 228, 228,0.3)";
            tryBad = tryBad - 1;
            suspectSquares[i].style.transition = "0.9s";
            setTimeout(() => {
                suspectSquares[i].style.opacity = 0;
                setTimeout(() => {

                    pull_field.prepend(suspectSquares[i]);
                    
                }, 900);
            }, 300 + i*50);
            setTimeout(() => {
                sameWH(suspectSquares[i], cell_width*0.8);
                suspectSquares[i].style.opacity = 1;
            }, 1200 + i*50 );

        }
    } 
    
    game_field.querySelectorAll('img').forEach(element => {
        element.style.opacity = "0.5";
    });
    setTimeout(() => {
        game_field.querySelectorAll('img').forEach(element => {
            element.style.opacity = "0";
        });
    }, 400);
    plusMinus(tryBad);

    if (currentScore.innerHTML == squaresOnField) {
        console.log('currentScore',currentScore.innerHTML,'gameFieldNum',gameFieldNum);
        button_stop.click();
    }
}

function plusMinus (n){
    if (n > 0) {
        plusN.style.color      = rgb(136, 226, 0);
        plusN.innerHTML        = "+" + n;
        plusN.style.opacity    = 1;
        squaresOnField        += n;
        currentScore.innerHTML = squaresOnField;
        setTimeout(() => {
            plusN.style.opacity = 0;
        }, 500);
    }else if (n < 0){
        plusN.style.color      = rgb(226, 8, 0);
        plusN.innerHTML        = '−' + n*(-1);
        plusN.style.opacity    = 1;
        squaresOnField         = squaresOnField + n;
        currentScore.innerHTML = squaresOnField;
        setTimeout(() => {
            plusN.style.opacity = 0;
        }, 500);
    }
}
/////////////////////////////////////////............///////////         КОНЕЦ ИГРЫ
button_stop.addEventListener('click', gameEnd);
function gameEnd(){
    console.log('gameEnd');
                                            //////////////// Подсчет резульататов
    gameOn = false;
    numOfTry = 1;
    checkRights(this);
    let summ_level_txt = document.getElementsByClassName('active')[0].textContent;
    if (summ_level_txt === 'легко') {
        sumLevel.innerHTML = 'легкий';
    } else
    if (summ_level_txt === 'средне') {
        sumLevel.innerHTML = 'средний';
    } else sumLevel.innerHTML = 'сложный';
    sumScore.innerHTML = squaresOnField + ' из ' + gameFieldNum;
    sumTime.innerHTML  = time.textContent; 
    sumTrys.innerHTML  = triedNum-1 + ' из ' + numOfTryConst;
                                                        ///////////////// Анимация
    pull_field.style.opacity = '0';
    game_field.querySelectorAll('img').forEach(Element => {Element.remove()});
    setTimeout(() => {
        pull_field.style.display   = 'none';
        time.style.opacity  = '0';
        tryCountTxt.style.opacity  = '0';
        button_check.style.opacity = '0';
        button_stop.style.opacity  = '0';
        setTimeout(() => {
            game_field.style.boxShadow = '0px 0px 50px rgba(0, 0, 0, 0.2)';
            currentScoreBlock.style.transform = "scale(1.5)";

            setTimeout(() => {
                currentScoreBlock.style.opacity = "0";
            }, 100);
            setTimeout(() => {
                currentScoreBlock.style.display = "none";
                button_check.style.display = 'none';
                button_stop.style.display  = 'none';
                tryCountTxt.style.display  = 'none';
                sum_field.style.display = "inline-block";
                setTimeout(() => {
                    sum_field.style.opacity = '1';
                    sum_field.style.transform = 'translateY(0)';
                    button_restart.style.display = "inline-block";
                    setTimeout(() => {
                        button_restart.style.opacity = '1';
                    }, 500);
                }, 500);
            }, 600);
        }, 800);
    }, 400);
}
/////////////////////////////////////////.........../////////////       РЕСТАРТ
button_restart.addEventListener('click', restart);
function restart(){
    console.log('restart');
    game_field.style.boxShadow = "0px 0px 36px rgba(0, 0, 0, 0.05)";
    seconds = 0;
    triedNum = -1;
    squaresOnField = 4;

    play_field.style.opacity = '0';
    setTimeout(() => {
        play_field.style.display = 'none';
        ////////////////////////////////////////приводим в порядок игровое поле
        document.querySelectorAll('#game_field .cell').forEach(el => {el.remove();})
        document.querySelectorAll('#pull_field .square').forEach(el => {el.remove();})
        sum_field.style.display = 'none';
        sum_field.style.opacity = '0';
        button_restart.style.display = 'none';
        button_restart.style.opacity = '0';
        
        time.style.display = 'inline-block';
        time.style.opacity = '1';

        tryCountTxt.style.display = 'block';
        tryCountTxt.style.opacity = '1';
        tryCountTxt.innerHTML = 'осталось <span id="tryCount">2</span> проверки';

        button_check.style.display = 'inline-block';
        button_check.style.opacity = '1';
        button_check.style.color   = 'rgb(99, 99, 99)'; 
        button_check.style.borderColor   = 'rgb(99, 99, 99)';
        button_check.addEventListener ('click', button_check_pressed);
        button_check.addEventListener('mouseenter',button_check_mouseenter);
        button_check.addEventListener('mouseleave',button_check_mouseleave);

        currentScoreBlock.style.display = 'block';
        currentScoreBlock.style.opacity = '1';
        currentScoreBlock.style.transform = 'scale(1)';

        button_stop.style.display = 'inline-block';
        button_stop.style.opacity = '1';

        pull_field.style.display = 'inline-block';
        pull_field.style.opacity = '1';
        /////////////////////////////////////// показываем настройки
        settings_field.style.display = 'block';
        settings_field.style.opacity = '0';
        setTimeout(() => {
            settings_field.style.opacity = '1';
            normal.click();
        }, 10);
    }, 1000);

}

setTimeout(() => {
    questionAboutDesc_yes.click();
    
}, 500);


// setTimeout(() => {
//             button_start.click();
//             setTimeout(() => {
//                 button_stop.click();
//                 setTimeout(() => {
//                     button_restart.click();
//                     // setTimeout(() => {
//                     //     button_start.click();
//                     // }, 2000);
//                 },3500);
//             }, 500);
//         }, 1000);

