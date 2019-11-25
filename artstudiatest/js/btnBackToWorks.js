var btn = document.getElementById('back_to_works');

function buttonExit(e){
	if(e.type==="mouseup"){
		btn.style.left="0%";
		btn.style.opacity="0";
		setTimeout(function(){
			location.href='../works.html';
		}, 300);
	}
}
btn.addEventListener("mouseup", buttonExit);
window.setTimeout(function(){
	console.log('sad');
	btn.style.left="5%";
	btn.style.opacity="1";
},550);

var body = document.body,
    html = document.documentElement,
    heightOfDocument = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

intervalId = window.setInterval(Visible, 1);
function Visible() {
	var 	
  		windowPositionBottom = window.pageYOffset,
		screenPositionBottom = windowPositionBottom + document.documentElement.clientHeight;
	if(heightOfDocument - screenPositionBottom < 255){
		btn.style.bottom = -(heightOfDocument - screenPositionBottom) + 255 + "px";
	}
	else{
		btn.style.bottom = 55 + "px";
	}
};

