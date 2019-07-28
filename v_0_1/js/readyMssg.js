intervalId = window.setInterval(readyTxtFunction, 100);
button = document.getElementById('btn-send-mssg-wu');
button.onclick = function(){
	window.open(readyTxtFunction());
}
function readyTxtFunction(){
	var readyText = document.getElementById('ready_text'),
		nameOfService = document.getElementById('service-title-modal').innerHTML,
		inputName = document.getElementById('input_name'),
		inputDate = document.getElementById('input_date'),
		inputStudio,
		inputCheckBoxInsta = document.getElementById('check1'),
		inputCheckBoxForbidden = document.getElementById('check2'),
		link_whatsapp = 'https://api.whatsapp.com/send?phone=79998649126&text=';
	txtMain = "Здравствуйте, ";
	if (inputName.value != ""){
		txtMain += "меня зовут " + inputName.value + ', ';
	}

	//заменим "семейная съемка" из заголовка на "семейную съемку" для готового сообщения
	nameOfService = nameOfService.toLowerCase();
	numberOfName = nameOfService.length;
	if(nameOfService[numberOfName - 1] == "а"){
		nameOfService = nameOfService.substring(0,numberOfName-1) + "у";
	}
	if(~nameOfService.indexOf("ая")){
		indexOfAYA = nameOfService.indexOf("ая");
		nameOfService = nameOfService.substring(0, indexOfAYA) + "ую" + nameOfService.substring(indexOfAYA+2);
	}
	//

	txtMain += "я бы хотела заказать " + nameOfService;
	if (inputDate.value != ""){
		var a = inputDate.value;
		txtMain += ", ориентировочно на " + a[8] + a[9] + a[7] + a[5] + a[6] + a[4] + a[0] + a[1] + a[2] + a[3];
	}
	if (inputCheckBoxInsta.checked){
		txtMain += ". Плюс короткое видео для Инстаграмма"
	}
	if (inputCheckBoxForbidden.checked){
		txtMain += ". А так же не желательно размещение фотографий в соц сетях автора"
	}
	txtMain += ".";
	readyText.innerHTML = txtMain;
	link_whatsapp += txtMain;
	return link_whatsapp;
}

buttonIndivid = document.getElementById('btn-service-individ');
buttonLovestory = document.getElementById('family_serv');
buttonFamily = document.getElementById('express_serv');
buttonExpress = document.getElementById('btn-express');
buttonBuyCard = document.getElementById('btn-buy-gift-card');

buttonIndivid.onclick = function(){
	changeModalInfo(1);
};
buttonLovestory.onclick = function(){
	changeModalInfo(2);
};
buttonFamily.onclick = function(){
	changeModalInfo(3);
};
buttonExpress.onclick = function(){
	changeModalInfo(4);
	showPoints();
};
buttonBuyCard.onclick = function(){
	changeModalInfo(5);
	hidePoints();
};
function hidePoints(){
	document.getElementById('checkbox-points').classList.add('hidePoints');
	document.getElementById('choose-studio').classList.add('hidePoints');
	document.getElementById('input_date').classList.add('hidePoints');
}
function showPoints(){
	document.getElementById('checkbox-points').classList.remove('hidePoints');
	document.getElementById('choose-studio').classList.remove('hidePoints');
	document.getElementById('input_date').classList.remove('hidePoints');
}
function changeModalInfo(a){
	if (a == 1){
		document.getElementById('service-title-modal').innerHTML = document.getElementById('individ-h').innerHTML;
		document.getElementById('service-description-modal').innerHTML = document.getElementById('individ-p').innerHTML;
	}
	if (a == 2){
		document.getElementById('service-title-modal').innerHTML = document.getElementById('lovestory-h').innerHTML;
		document.getElementById('service-description-modal').innerHTML = document.getElementById('lovestory-p').innerHTML;
	}
	if (a == 3){
		document.getElementById('service-title-modal').innerHTML = document.getElementById('family-h').innerHTML;
		document.getElementById('service-description-modal').innerHTML = document.getElementById('family-p').innerHTML;
	}
	if (a == 4){
		document.getElementById('service-title-modal').innerHTML = document.getElementById('express-h').innerHTML;
		document.getElementById('service-description-modal').innerHTML = document.getElementById('express-p').innerHTML;
	}
	if (a == 5){
		document.getElementById('service-title-modal').innerHTML = document.getElementById('gift-card-h').innerHTML;
		document.getElementById('service-description-modal').innerHTML = document.getElementById('gift-card-p').innerHTML;
	}
}