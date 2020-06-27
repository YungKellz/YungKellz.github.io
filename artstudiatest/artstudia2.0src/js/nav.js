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
	//nav_white.style.width = document.getElementsByClassName('container')[0].offsetWidth + "px";
	nav_white.style.width  = document.documentElement.clientWidth + "px";
	nav_white.style.height = nav_gradient.offsetHeight + 20 + "px";
	foot_white.style.width = document.getElementsByClassName('container')[0].offsetWidth + "px";
	foot_gradient.style.height = footer.offsetHeight - 80 + "px";
	foot_white.style.height = footer.offsetHeight + "px";
	footer.addEventListener('change', () => {
		foot_gradient.style.height = footer.offsetHeight - 80 + "px";
		foot_white.style.height = footer.offsetHeight - 80 + "px";
	});
/*выпадающее "работа"*/
var whiteDrop = document.getElementById('nav_dropdown_white_bg'),
	mainTag = document.getElementsByTagName("main")[0],
	ulWorks = document.getElementsByTagName("ul")[0];



if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

    nav_menu_works.addEventListener("click",function(){
		mainTag.style.filter = "blur(3px)";
		mainTag.style.opacity = "0.3";
		nav_white.style.position = "fixed";
		nav_white.style.height = "100%";
		nav_white.style.width = "100%";
		nav_white.style.transition = "none";
		nav_white.style.opacity = "0";


		nav_menu_works_head.style.visibility = "hidden";
		nav_menu_works_head.style.opacity = "0";
		ulWorks.style.visibility = "visible";
		ulWorks.style.opacity = "1";
	});

	nav_white.addEventListener("click",function(){
		mainTag.style.filter = "blur(0px)";
		mainTag.style.opacity = "1";
		nav_white.style.position = "absolute";
		nav_white.style.height = "100%";
		nav_white.style.width = "100%";
		nav_white.style.transition = "none";
		nav_white.style.opacity = "0";


		nav_menu_works_head.style.visibility = "visible";
		nav_menu_works_head.style.opacity = "1";
		ulWorks.style.visibility = "hidden";
		ulWorks.style.opacity = "0";
	});
	// nav_menu_works.addEventListener("click",function(){
	// 	mainTag.style.filter = "blur(0px)";
	// 	mainTag.style.opacity = "1";
	// });

  } else {
    nav_menu_works.addEventListener("mouseover",function(){
		mainTag.style.filter = "blur(3px)";
		mainTag.style.opacity = "0.3";
		nav_menu_works_head.style.visibility = "hidden";
		nav_menu_works_head.style.opacity = "0";
		ulWorks.style.visibility = "visible";
		ulWorks.style.opacity = "1";
	});
	nav_menu_works.addEventListener("mouseout",function(){
		mainTag.style.filter = "blur(0px)";
		mainTag.style.opacity = "1";
		nav_menu_works_head.style.visibility = "visible";
		nav_menu_works_head.style.opacity = "1";
		ulWorks.style.visibility = "hidden";
		ulWorks.style.opacity = "0";
	});
	setTimeout(() => {
		gradientTo(nav_gradient, 1, 1);
		gradientTo(foot_gradient, 1, 1);
	}, 2);
}

/*Эфект перехода по страницам*/
document.body.onload = function (){
	console.log('load')
	setTimeout(() => {
		nav_white.style.width = document.getElementsByClassName('container')[0].offsetWidth + "px";
		setTimeout(() => {
			mainTag.style.opacity = 1;
			setTimeout(() => {
				mainTag.style.transition = "0s";
			}, 500);
		}, 300);
	}, 500);

	var links = document.querySelectorAll('a');  
	
	links.forEach(function (link) {
		link.addEventListener('click', onLinkClicked);
		
		function onLinkClicked(event) {
			if (link.href[link.href.length-1] !=='#') {
				console.log(document.documentElement.clientWidth)
				event.preventDefault();
				mainTag.style.transition = "0.5s";
				mainTag.style.opacity = 0;
				setTimeout(() => {
					nav_white.style.width = document.documentElement.clientWidth + "px";
				}, 100);
				onAnimationComplete();
			}
		}
		
		function onAnimationComplete() {
			setTimeout(function() {
				window.location = link.href;  
			}, 500);
		}
	});
}




/*Градиент*/
var p1 = "radial-gradient(circle farthest-corner at ",
	p2 = "px 10px, rgba(255, 0, 0, ",
	p3 = ") 0%, rgba(255, 200, 0, ",
	p4 = ") 100%)";

function gradientTo(idEl, alpha, speed){
	widthEl = idEl.offsetWidth;
	posGrad  = rndInt(0, widthEl - 1);
	toRight(idEl, widthEl, posGrad, alpha, speed);
    
}

function toRight(id, width, pos, alpha, speed) {
	let idInt = setInterval(function() {
		pos++;
		id.style.background = p1 + pos + p2 + alpha + p3 + alpha + p4;
		if (pos > width) {
			clearInterval(idInt);
			toLeft(id, width, pos, alpha);
		}
	}, speed);
}
function toLeft(id, width, pos, alpha, speed) {
	let idInt = setInterval(function() {
		pos--;
		id.style.background = p1 + pos + p2 + alpha + p3 + alpha + p4;
		if (pos < 0) {
			clearInterval(idInt);
			toRight(id, width, pos, alpha);
		}
	}, speed);
}


