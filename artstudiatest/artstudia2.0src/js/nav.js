/*help functions*/
function rgb(r, g, b){
	return "rgb("+r+","+g+","+b+")";
}
function rndInt(min, max) {
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

/*Preloader */
// setTimeout(() => {
// 	preloader.style.opacity = "0";
// 	preloader.style.visibility = "hidden";
// }, 400);

/*белый фон нава и футера*/
	nav_white.style.width = document.getElementsByClassName('container')[0].offsetWidth + "px";
	foot_white.style.width = document.getElementsByClassName('container')[0].offsetWidth + "px";
	foot_gradient.style.height = footer.offsetHeight - 80 + "px";
	foot_white.style.height = footer.offsetHeight - 80 + "px";
	footer.addEventListener('change', () => {
		foot_gradient.style.height = footer.offsetHeight - 80 + "px";
		foot_white.style.height = footer.offsetHeight - 80 + "px";
	});
/*выпадающее "работа"*/
var whiteDrop = document.getElementById('nav_dropdown_white_bg');

nav_menu_works.addEventListener("mouseover",function(){
	// whiteDrop.style.visibility = "visible";
	// whiteDrop.style.opacity = "1";
	// whiteDrop.style.height = "400px";
	//nav_white.style.height = "280px";
	//nav_white.style.borderRadius = "0px 0px 50px 50px";
	//nav_white.style.boxShadow = "0 10px 10px rgba(255,255,255,1)";
	document.getElementsByTagName("main")[0].style.filter = "blur(3px)";
	document.getElementsByTagName("main")[0].style.opacity = "0.3";
	
	// nav_menu_works_head.style.visibility = "hidden";
	// nav_menu_works_head.style.opacity = "0";
	// ulOfWorks.style.visibility = "visible";
	// ulOfWorks.style.opacity = "1";
	// #nav_menu_works_head{
	// 	visibility: hidden;
	// 	opacity: 0;
	//   }
	//   ul{
	// 	visibility: visible;
	// 	opacity: 1;
	//   }
	//nav_gradient.style.height = "270px";
	//navigationOn.style.height = "270px"
});
nav_menu_works.addEventListener("mouseout",function(){
	// whiteDrop.style.visibility = "hidden";
	// whiteDrop.style.opacity = "0";
	// whiteDrop.style.height = "300px";
	//nav_white.style.transition = "0.2s 0.4s";
	document.getElementsByTagName("main")[0].style.filter = "blur(0px)";
	document.getElementsByTagName("main")[0].style.opacity = "1";
	nav_white.style.height = "128px";
	nav_white.style.borderRadius = "0px";
	nav_white.style.boxShadow = "0 10px 10px rgba(255,255,255,0)";
	// nav_menu_works_head.style.visibility = "visible";
	// nav_menu_works_head.style.opacity = "1";
	// ulOfWorks.style.visibility = "hidden";
	// ulOfWorks.style.opacity = "0";
	//nav_gradient.style.height = "128px";
	//navigationOn.style.height = "128px"
});

/*Градиент*/
var p1 = "radial-gradient(circle farthest-corner at ",
	p2 = "px 50px,rgb(255, 0, 0) 0%, rgb(255, 200, 0) 100%)";

function gradientTo(idEl){
	widthEl = idEl.offsetWidth;
	posGrad  = rndInt(0, widthEl - 1);
	toRight(idEl, widthEl, posGrad);
}

function toRight(id, width, pos) {
	var idInt = setInterval(function() {
		pos++;
		id.style.background = p1 + pos + p2;
		if (pos > width) {
			clearInterval(idInt);
			toLeft(id, width, pos);
		}
	}, 1);
}
function toLeft(id, width, pos) {
	var idInt = setInterval(function() {
		pos--;
		id.style.background = p1 + pos + p2;
		if (pos < 0) {
			clearInterval(idInt);
			toRight(id, width, pos);
		}
	}, 1);
}

gradientTo(nav_gradient);
gradientTo(foot_gradient);