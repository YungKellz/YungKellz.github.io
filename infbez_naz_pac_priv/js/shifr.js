intervalId = window.setInterval(Shifr, 200);
intervalId2 = window.setInterval(unShifr, 200);

function Shifr(){

	var inputText = document.getElementById('input_text').value,
		inputLenght = document.getElementById('input_length').value,
		key = document.getElementById('input_key').value,
		abc = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя",
		outputText = "",
		txtLen = inputText.length,
		keyLen = key.length;

		
	if (inputLenght != "" && inputText != "" && key != ""){
		/*CESAR*/
		for (let i = 0; i < txtLen; i++) 
		{
			c = inputText[i]; /*c это i-тый символ*/
			p = abc.indexOf(c); /*р это индекс символа в алфавите, если не буква то p=-1*/
			if(p != -1){
				a = p + parseInt(inputLenght); /*а это индекс зашифрованного символа*/

				while(a >= abc.length) a-=abc.length; /*проверка что а не вышел за границы алфавита*/
		  		outputText += abc[a];
			}
			else{
				outputText += c;/*здесь прибавляются точки, запятые, пробелы*/
			}
		}
		inputText = outputText;
		outputText = "";
		console.log(inputText);
		/*XOR*/
		while (key.length < txtLen) {
			key = key + key;
    	}
    	for(var i = 0; i < txtLen; i++) {
	        var c1 = inputText[i].charCodeAt(0);
	        var c2 = key[i].charCodeAt(0);
	        var xorC = c1 ^ c2 + 60;
	        outputText += String.fromCharCode(xorC);
	    }
		document.getElementById('ready_text').innerHTML = outputText;
	}
	else document.getElementById('ready_text').innerHTML = "Здесь будет текст зашифрованного сообщения";
	return false;
}

function unShifr(){

	var inputText = document.getElementById('input_text_2').value,
		inputLenght = document.getElementById('input_length_2').value,
		key = document.getElementById('input_key_2').value,
		abc = "яюэьыъщшчцхфутсрпонмлкйизжёедгвба",
		outputText = "",
		txtLen = inputText.length,
		keyLen = key.length;
	if (inputLenght != "" && inputText != "" && key != ""){
		/*XOR*/
		while (key.length < txtLen) {
			key = key + key;
    	}
    	for(var i = 0; i < txtLen; i++) {
	        var c1 = inputText[i].charCodeAt(0);
	        var c2 = key[i].charCodeAt(0);
	        var xorC = c1 ^ c2 + 60;
	        outputText += String.fromCharCode(xorC);
	    }

		inputText = outputText;
		outputText = "";
		console.log(inputText);
		/*CESAR*/
		for (let i = 0; i < txtLen; i++) 
		{
			c = inputText[i]; /*c это i-тый символ*/
			p = abc.indexOf(c); /*р это индекс символа в алфавите, если не буква то p=-1*/
			if(p != -1){
				a = p + parseInt(inputLenght); /*а это индекс зашифрованного символа*/

				if(a >= abc.length) a-=abc.length; /*проверка что а не вышел за границы алфавита*/
		  		outputText += abc[a];
			}
			else{
				outputText += c;/*здесь прибавляются точки, запятые, пробелы*/
			}
		}
		
		document.getElementById('ready_text_2').innerHTML = outputText;
	}
	else document.getElementById('ready_text_2').innerHTML = "Здесь будет текст расшифрованного сообщения";
	return false;
}




/*Кодируем изображения*/
var imageLoader = document.getElementById('imageLoader_1');
	imageLoader.addEventListener('change', handleImage, false);

var canvas1 = document.getElementById('imageCanvas1'), /* Первый канвас Ориг*/
	canvasOut1 = document.getElementById('imageCanvas2');/* Второй канвас Зашифрованный*/
var ctx = canvas1.getContext('2d'),
	ctx2 = canvasOut1.getContext('2d');

function handleImage(e){
	var inputText = document.getElementById('message').value,
	messageLength = inputText.length,
	messageLengthByte = messageLength.toString('2'), 
	messageASCII = "", messageByte;
	while (messageLengthByte.length < 16) messageLengthByte = "0" + messageLengthByte;


    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
	        canvas1.width = img.width;
	        canvas1.height = img.height;
	        canvasOut1.width = img.width;
	        canvasOut1.height = img.height;
	        ctx.drawImage(img,0,0);
	        ctx2.drawImage(img,0,0);

	        var imageData = ctx2.getImageData(0, 0, 2, 1); /*Выцепили первые два пикселя которые будут сообщать длину сообщения*/
	        var byte;
	        for (var i = 0; i < 8; i++) {
                byte = imageData.data[i];/* 10ричная получаем компоненту какогото цвета цвета идя с конца второго пикселя к началу первого*/
           		byte = byte.toString(2); /*переделали в строку*/
           		byte = byte.substr(0,byte.length-2) + messageLengthByte[i * 2] + messageLengthByte[i * 2 + 1];
           		
           		byte = parseInt(byte, 2);

           		imageData.data[i] = byte;
            }
            ctx2.putImageData(imageData, 0, 0);/*Засунули первые два пикселя в начало картинки*/
            /*определяем область записывания мессэджа*/
            imageData = ctx2.getImageData(0,1,img.width,img.height-1);
            /*запихиваем каждый символ в каждый пиксель*/
            for (var i = 0; i < messageLength; i++)
            {
            	var c = inputText[i];
            		c = c.charCodeAt(0);
            		c = c.toString('2');
            		while (c.length < 12) c = "0" + c;
            		/*c - string 12 цифр двоичнoe представление символа для закладки в пиксель*/
            		
            		/*Вставляем в пиксель символ. делим симовл на 4 части и вставляем в последние три бита каждого компонента пикселя*/
            		for (var j = 0; j < 4; j++){
            			byte = imageData.data[i*4 + j];
	            		byte = byte.toString('2');
	            		byte = byte.substr(0,byte.length-3 ) + c.substr(j*3, 3);
	            		byte = parseInt(byte, 2);

	            		imageData.data[i*4 + j] = byte;
            		}
            		
            }
            ctx2.putImageData(imageData, 0, 1);/*засунули текст в пиксели а пиксели в картинку начиная со второй строки*/
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}

/*Декодируем изображения*/

var imageLoader2 = document.getElementById('imageLoader_2');
	imageLoader2.addEventListener('change', unhandleImage, false);

var txtOutLabel = document.getElementById('unShifr_pic');

var canvas3 = document.getElementById('imageCanvas3'); /* Третий канвас зашифрованный*/
var ctx3 = canvas3.getContext('2d');

function unhandleImage(e){
	
	var lenghtOfMes="", finalTxt="";

    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        	img.onload = function(){
	        canvas3.width = img.width;
	        canvas3.height = img.height;
	        ctx3.drawImage(img,0,0);

	        var imageData = ctx3.getImageData(0, 0, 2, 1); /*Выцепили первые два пикселя которые будут сообщать длину сообщения*/
	        var byte;
	        for (var i = 0; i < 8; i++) {
                byte = imageData.data[i]; /* 10ричная получаем компоненту какогото цвета цвета идя с конца второго пикселя к началу первого*/
           		byte = byte.toString(2);  /* переделали в строку */
           		//console.log(byte);
           		byte = byte.substr(byte.length-2,2);
           		//console.log(byte);
           		lenghtOfMes += byte;
            }
            //console.log(lenghtOfMes);

            lenghtOfMes = parseInt(lenghtOfMes,2);
            console.log("Длина сообщения",lenghtOfMes);

            var imageData = ctx3.getImageData(0, 1, img.width, img.height-1);
            var comp;
            for (var i = 0; i < lenghtOfMes; i++)
            {
            	var c, comp = "";
            	for(var j = 0; j < 4; j++)
            	{
            		var t = imageData.data[i*4 + j].toString('2');
            		while (t.length < 4) t = "0" + t;
            		comp += t.substr(t.length - 3, 3);
            		//console.log(comp);
            	}
            	c = parseInt(comp,2); /*Символ достанный из пикселя*/
            	
            	finalTxt += String.fromCharCode(c);

            }
            console.log(finalTxt);
            txtOutLabel.innerHTML = finalTxt;
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}