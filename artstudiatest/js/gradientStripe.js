var gr1 = document.getElementById("gradientfornav1"),
	gr2 = document.getElementById("gradientfornav2");




intervalId = window.setInterval(changeGradient1, 12000);
window.setTimeout(function(){
	intervalId = window.setInterval(changeGradient2, 12000);

},6000);
function getRandomInRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function changeGradient1(){
	gr1.style.background='linear-gradient('+ getRandomInRange(0, 270)+'deg, #E100FF '+ getRandomInRange(0, 20)+'%, #7F00FF 100%)';
	gr1.style.opacity="1";
	gr2.style.opacity="0";
	console.log('sad');
}
function changeGradient2(){
	gr2.style.background='linear-gradient('+ getRandomInRange(0, 270)+'deg, #E100FF '+ getRandomInRange(0, 20)+'%, #7F00FF 100%)';
	gr1.style.opacity="0";
	gr2.style.opacity="1";
	console.log('asd');
}