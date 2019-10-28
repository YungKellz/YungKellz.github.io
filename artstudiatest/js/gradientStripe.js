var gr1 = document.getElementById("gradientfornav1"),
	gr2 = document.getElementById("gradientfornav2");




intervalId = window.setInterval(changeGradient1, 12000);
window.setTimeout(function(){
	intervalId = window.setInterval(changeGradient2, 12000);

},6000);
function getRandomInRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInRangePRO(min, max, n) {
	var a = getRandomInRange(min, max);
	if (a>70 && a <110){
		getRandomInRangePRO(min, max, n);
	}
	else{
		if (a>70 && a <110){
			getRandomInRangePRO(min, max, n);
		}
		else{
			console.log(a);
			return a;
		}
	}
}

function changeGradient1(){
	gr1.style.background='linear-gradient('+ getRandomInRangePRO(0, 360, 1)+'deg, #E100FF '+ getRandomInRangePRO(0, 20, 1)+'%, #7F00FF 100%)';
	gr1.style.opacity="1";
	gr2.style.opacity="0";
}
function changeGradient2(){
	gr2.style.background='linear-gradient('+ getRandomInRangePRO(0, 360, 2)+'deg, #E100FF '+ getRandomInRangePRO(0, 20, 2)+'%, #7F00FF 100%)';
	gr1.style.opacity="0";
	gr2.style.opacity="1";
	console.log("changed");
}
