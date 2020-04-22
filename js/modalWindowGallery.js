var images = document.getElementsByTagName('img'),
	modal_pic = document.getElementById("img-of-modal"),
	modal_txt = document.getElementById("text-of-modal");

function changePic(e){
    if(e.type==="click"){
        modal_pic.src = e.target.src;
        modal_txt.innerHTML = e.target.alt;
    }
}

for (var i = images.length - 2; i >= 0; i--) {
	images[i].addEventListener("click", changePic);
}