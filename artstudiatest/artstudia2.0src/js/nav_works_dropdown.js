var white = document.getElementById('nav_dropdown_white_bg');
		document.getElementById('nav_menu_works').addEventListener("mouseout",function(){
			white.style.visibility = "hidden";
			white.style.opacity = "0";
			white.style.height = "300px";
		})
		document.getElementById('nav_menu_works').addEventListener("mouseover",function(){
			white.style.visibility = "visible";
			white.style.opacity = "1";
			white.style.height = "400px";
		})