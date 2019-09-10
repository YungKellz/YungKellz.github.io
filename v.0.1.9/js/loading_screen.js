
var
	images = document.images,
	images_total_count = images.length,
	images_loaded_count = 0;
	perc_display = document.getElementById('loader_procents');
	//perc_display.classList.add('loading_done');
for (var i = 0; i < images_total_count;i++)
{
	image_clone = new Image();
	image_clone.onload = image_loaded;
	image_clone.onerror = image_loaded;
	image_clone.src = images[i].src;
}
function image_loaded(){
	images_loaded_count++;

	perc_display.innerHTML = ((( 100 / images_total_count ) * images_loaded_count ) << 0 ) + '%'; 
}

setTimeout(function(){
	perc_display.classList.remove('hidePoints');
}, 4000);

document.body.onload = function (){
	console.log("beach");
	setTimeout(function() {
		var preloader = document.getElementById("preloader");
		if (!preloader.classList.contains('loading_done'))
		{
			preloader.classList.add('loading_done');
		}
	}, 1700); 
	setTimeout(function() {
		var loader = document.getElementById("loader");
		if (!loader.classList.contains('loading_done'))
		{
			loader.classList.add('loading_done');
			document.getElementById('loader_procents').classList.add('loading_done');
		}
	}, 1000); 
	
}