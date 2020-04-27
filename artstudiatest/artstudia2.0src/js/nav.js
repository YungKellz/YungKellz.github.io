var whiteDrop = document.getElementById('nav_dropdown_white_bg');

nav_menu_works.addEventListener("mouseout",function(){
	whiteDrop.style.visibility = "hidden";
	whiteDrop.style.opacity = "0";
	whiteDrop.style.height = "300px";
});
nav_menu_works.addEventListener("mouseover",function(){
	whiteDrop.style.visibility = "visible";
	whiteDrop.style.opacity = "1";
	whiteDrop.style.height = "400px";
});

var p1 = "radial-gradient(circle farthest-corner at ",
	p2 = "px 50px,rgb(255, 0, 0) 0%, rgb(255, 200, 0) 100%)";

var     pos = 0;
const width = document.body.clientWidth;

toRight();

function toRight() {
	var idInt = setInterval(function() {
		pos++;
		nav_gradient.style.background = p1 + pos + p2;
		footer.style.background = p1 + pos + p2;
		if (pos > width) {
			clearInterval(idInt);
			toLeft();
		}
	}, 1);
}
function toLeft() {
	var idInt = setInterval(function() {
		pos--;
		nav_gradient.style.background = p1 + pos + p2;
		footer.style.background = p1 + pos + p2;
		if (pos < 0) {
			clearInterval(idInt);
			toRight();
		}
	}, 1);
}

nav_white.style.width = document.getElementsByClassName('container')[0].offsetWidth + "px";
