var images = document.getElementsByClassName('imgCover'),
    modal_body = document.getElementsByClassName("modal-body")[0],
    modal_content = document.getElementsByClassName("modal-content")[0],
    modal_dialog = document.getElementsByClassName("modal-dialog")[0],
    modal_txt = document.getElementById("text-of-modal"),
    work_examples = document.getElementsByClassName('work-examples')[0],
    flagForSlick = false;


function changePic(e){
    if(e.type==="click"){
        document.getElementsByClassName('stat-icon')[0].src = e.target.src;
        
        /**Узнаем что было в альте кликнутой картинки */
        if (!e.target.alt) {
            console.log("%c В картинке пустой альт", 'background: #222; color: #bada55');

            modal_txt.style.display = "none";
            brModal.style.display = "none";
            buttonModalLink.style.display = "none";

             /**Если надо сделать тень для картинки */
             if (e.target.className.indexOf("bord") !== -1) {
                work_examples.style.boxShadow = "0px 0px 20px rgba(0, 0, 0, 0.15)";
            } else {
                work_examples.style.boxShadow = "none";
            }

            /**Есть ли старые img */
            if (slider.children.length > 1) {
                console.log("Лишние слики обнаружены, их ", slider.children.length-1);
                for (let i = slider.children.length - 1; i > 0; i--) {
                    slider.children[i].remove();
                    console.log("Лишний слик удален");
                }
            }
    
            /**Запуск слайдера */
            $(function () { 
                $('.work-examples').slick({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    adaptiveHeight: true
                });
            });
        } else {
            /**Есть ли старые сликеры */
            if (slider.children.length > 1) {
                console.log("Лишние слики обнаружены, их ", slider.children.length-1);
                for (let i = slider.children.length - 1; i > 0; i--) {
                    slider.children[i].remove();
                    console.log("Лишний слик удален");
                }
            }
            
            /**Если есть текст в альте*/
            modal_txt.style.display = "inline-block";
            altArray = e.target.alt.split(' ^ ');
            console.log("%c В картинке не пустой альт", 'background: #222; color: #bada55');
            console.log("Классы картинки: " + e.target.className);
            console.log("Альт   картинки: " + altArray);
            modal_txt.innerHTML = altArray[0];
            
            /**Если есть имя автора */
            if (e.target.className.indexOf("name") !== -1) {
                /**Если есть ссылка на автора */
                if (e.target.className.indexOf("toPort") !== -1) {
                    if (altArray[0] === "") {
                        modal_txt.innerHTML += "<a href="+ altArray[2] + ">" + altArray[1] + "</a>";
                    } else {
                        modal_txt.innerHTML += ' // ' + "<a href="+ altArray[2] + ">" + altArray[1] + "</a>";
                    }
                } 
                /**Если есть имя, но нет ссылки */
                else {
                    if (altArray[0] === "") {
                        modal_txt.innerHTML += altArray[1];
                    } else {
                        modal_txt.innerHTML += ' // ' + altArray[1];
                    }
                }
            }

            /**Если надо сделать тень для картинки */
            if (e.target.className.indexOf("bord") !== -1) {
                work_examples.style.boxShadow = "0px 0px 20px rgba(0, 0, 0, 0.15)";
            } else {
                work_examples.style.boxShadow = "none";
            }

            /**Если есть ссылка */
            if (e.target.className.indexOf("toWeb") !== -1) {
                brModal.style.display = "inline-block";
                buttonModalLink.style.display = "inline-block";
                buttonModalLink.addEventListener("click", () => {
                    window.open(altArray[3], '_blank'); 
                });
            } else {    
                brModal.style.display = "none";
                buttonModalLink.style.display = "none";
            }
            
            
            

            /**Создание slickers */
            if (e.target.className.indexOf("list") !== -1) {
                for (let i = 2; i < parseInt(altArray[4]) + 1; i++) {
                    let img = document.createElement('img');
                    img.className = "stat-icon";
                    img.src = e.target.src.split('_1.')[0] + "_" + i + "." + e.target.src.split('_1.')[1];
                    slider.append(img);
                    console.log('добавлен slicker');
                }
            }
            /**Запуск слайдера */
            $(function () { 
                $('.work-examples').slick({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    adaptiveHeight: true
                });
            });
            
        }
    }
}

for (var i = images.length - 1; i >= 0; i--) {
	images[i].addEventListener("click", changePic);
}

modalWin.addEventListener("click", ()=>{
    setTimeout(() => {
        if (modalWin.className === "modal fade") {
            $('.work-examples').slick('unslick');
        }
    }, 1);
    
});

