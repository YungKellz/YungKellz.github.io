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