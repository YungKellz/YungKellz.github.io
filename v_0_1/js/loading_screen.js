document.body.onload = function (){
	console.log("beach");
	setTimeout(function() {
		var preloader = document.getElementById("preloader");
		if (!preloader.classList.contains('loading_done2'))
		{
			preloader.classList.add('loading_done2');
		}
	}, 2000); 
	setTimeout(function() {
		var loader = document.getElementById("loader");
		if (!loader.classList.contains('loading_done1'))
		{
			loader.classList.add('loading_done1');
		}
	}, 1000); 

}