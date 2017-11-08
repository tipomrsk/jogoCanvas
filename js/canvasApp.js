window.addEventListener('load', windowLoaded, false);

function windowLoaded() {
    canvasApp();
}

function canvasApp() {

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    //console.log("w: "+canvas.width+" h: "+canvas.height);
    //POSIÇÃO ALEATÓRIA
    //var yr = 10;
    var wr = 50;
    var hr = wr;
    var yr = (Math.random() * (canvas.height - hr)) + 10;
    var xr = 10;
    var xr2 = (Math.random() * (canvas.width - wr)) + 10;
    var yr2 = 10;
    var yr3 = (Math.random() * (canvas.height - hr)) + 10;
    var xr3 = canvas.width;
    var xr4 = (Math.random() * (canvas.width - wr)) + 10;
    var yr4 = 10;
    var xc = canvas.width / 2;
    var yc = canvas.height / 2;
    var rc = 20;
    var key = 0;
    var speed = 60;
    var loop = setInterval(isLoad, speed);
    var dead = false;
    var tema;
    var sound_dead;
    var load = 0;
    var total = 11;
    var state_megaman = 'stop';
    var cs_megaman = 0;//contador de sprite
    var cs_piranha = 0;
    var cs_enemis = 0;
    var cs_moeda = 0;
    var cs_proto = 0;
    var sx, sy, sw = 28, sh = 37;//variáveis para recortar megaman
    var img_megaman = new Image();
    var img_piranha = new Image();
    var img_enemis = new Image();
    var img_moeda = new Image();
    var img_fundo = new Image();
    var img_inicio = new Image();
    var img_proto = new Image();
    var xm = 100;
    var ym = 100;
    var wm = 35;
    var hm = 35;
    var xp = 200;
    var yp = 100;
    var wp = 35;
    var hp = 35;
    var cont = 0;
    var som;
    
    

    loadAssets();

    function mainLoop() {
        inicio.pause();
        control();
        moveRetangulo();
        moveRetangulo2();
        moveRetangulo3();
        moveRetangulo4();

        if (colide(xr + 10, yr + 10, wr / 2, hr / 2)
                || colide(xr2 + 15, yr2 + 15, wr / 2, hr / 2)
                || colide(xr3, yr3, wr, hr)
                || colide(xr4, yr4, wr, hr)) {
        // gameover();
        }
        if (colidemoeda(xm, ym, wm, hm))
                
        {
            
            cont++;
            som.play();
            xm = (Math.random() * (canvas.width - wm)) + 10;
            ym = (Math.random() * (canvas.height - hm)) + 10;
            
        }
        
        if (colidemoeda(xm, ym, wm, hm))
                
        {
           
            xp = (Math.random() * (canvas.width - wp)) + 10;
            yp = (Math.random() * (canvas.height - hp)) + 10;
            
        }
    

        drawBackground();
   

        //DEPOIS ALTERA OS ENEMEGOS COM WR-TAMANHO E HR-TAMANHO
        drawPiranha(xr, yr, wr, hr, img_piranha);
        //drawRect(xr, yr, wr, hr, "#00f");
        drawEnemis(xr2, yr2, wr, hr, img_enemis,1);
        drawEnemis(xr3, yr3, wr, hr, img_enemis,0);
        drawEnemis(xr4, yr4, wr, hr, img_enemis,3);
        drawMoeda (xm, ym, wm, hm, img_moeda);
        drawProto (xp, yp, wp, hp, img_proto);
        drawMegaman();

        //drawSmile();
        
    }

//    window.addEventListener("keydown",function (e){
//         key = e.keyCode;
//         console.log(key);        
//    });

    $(document).keydown(function (e) {
        key = e.which;
        if (load === total) {
            start();
        }
        console.log(key);
    });

    $(document).keyup(function (e) {
        key = 0;
        state_megaman = 'stop';
    });

//MOVENDO O MEGAMAN
    function control() {
              if (key === 38) {
			state_megaman = 'up';
            if (yc - rc <= 0) { //Cima
                yc = rc;
            } else {
                yc -= 7;
            }
        } else if (key === 40) { //Baixo
		 state_megaman = 'down';
		 if (yc>(canvas.height-rc+1)) {
			 yc=canvas.height-rc+1;
		 } else {
		 yc += 7; }
        } else if (key === 37) { //Esquerda
				 state_megaman = 'left';
          if (xc>(canvas.width-rc+1)) {
			 xc=canvas.width-rc+1;
		 } else if (xc-rc+1<0) {
			 xc=rc+1;

		 }
		 
		 
		 else {
		 xc -= 7;
		 }
        } else if (key === 39) { //Direita
				 state_megaman = 'right';
          if (xc>(canvas.width-rc+1)) {
			 xc=canvas.width-rc+1;
		 } else {
		 xc += 7; }
        }
    }

    function moveRetangulo() {
        xr += 10;
        //Testa quando sai do canvas e reinicia
        if (xr > canvas.width) {
            xr = 10;
            yr = (Math.random() * (canvas.height - 50)) + 10;
        }
    }

    function moveRetangulo2() {
        yr2 += 10;
        //Testa quando sai do canvas e reinicia
        if (yr2 > canvas.height) {
            yr2 = 10;
            xr2 = (Math.random() * (canvas.width - wr)) + 10;
        }
    }

    function moveRetangulo3() {
        xr3 -= 10;
        //Testa quando sai do canvas e reinicia
        if (xr3 < 0) {
            xr3 = canvas.width;
            yr3 = (Math.random() * (canvas.height - 50)) + 10;
        }
    }

    function moveRetangulo4() {
        xr4 += 10;
        yr4 += 10;
        //Testa quando sai do canvas e reinicia
        if (xr4 > canvas.width) {
            xr4 = 10;
            yr4 = (Math.random() * (canvas.height - 50)) + 10;
        }
    }

    function colide(x, y, w, h) {
        var debug = 1;
        if (debug) {
            context.strokeStyle = "#000";
            context.strokeRect(x, y, w, h);

            context.strokeStyle = 'red';
            context.beginPath();//Inicia o  desenho
            context.lineWidth = 3;//Define largura do traÃ§o
            context.arc(//MÃ©todo para desenhar circulos
                    xc, // PosiÃ§Ã£o X
                    yc, // PosiÃ§Ã£o Y
                    rc, // Raio
                    (Math.PI / 180) * 0,
                    (Math.PI / 180) * 360,
                    false);
            context.stroke();
            context.closePath();
        }

        if ((xc > (x - rc) && xc < (x - rc) + (w + rc * 2))
                && (yc > (y - rc) && yc < (y - rc) + (h + rc * 2)))
        {
            console.log("xc: " + xc);
            console.log("yc: " + yc);
            console.log("rc: " + rc);
            console.log("xr: " + x);
            console.log("yr: " + y);
            console.log("wr: " + w);
            console.log("hr: " + h);


            return true;
        } else {
            return false;
        }
    }
    
    function colidemoeda(xm, ym, wm, hm) {
        if ((xc > (xm - rc) && xc < (xm - rc) + (wm + rc * 2))
                && (yc > (ym - rc) && yc < (ym - rc) + (hm + rc * 2)))
        {
            console.log("xc: " + xc);
            console.log("yc: " + yc);
            console.log("rc: " + rc);
            console.log("xr: " + xm);
            console.log("yr: " + ym);
            console.log("wr: " + wm);
            console.log("hr: " + hm);


            return true;
        } else {
            return false;
        }
    }
    
    function drawBackground() {
        //background
        context.fillStyle = img_fundo;
        context.fillRect(0, 0, 720, 400);
        context.strokeStyle = 'white';
        context.strokeRect(2, 2, 716, 396);
		context.fillStyle = "white";
		context.fillText("Pontuação: " + cont, 20, 350);
    }

    function drawRect(x, y, w, h, color) {
        context.fillStyle = color;
        context.fillRect(x, y, w, h);
    }

    function drawPiranha(x, y, w, h, img) {
        cs_piranha++;
        if (cs_piranha === 4) {
            cs_piranha = 0;
        }

        context.drawImage(img_piranha, cs_piranha * 60, 0, 60, 51, x, y, w, h);


    }
    
    function drawMoeda(xm, ym, wm, hm, img) {
        cs_moeda++;
        if (cs_moeda === 8) {
            cs_moeda = 0;
        }

        context.drawImage(img_moeda, cs_moeda * 512, 0, 512, 512, xm, ym, wm, hm);


    }
    
    function drawEnemis (x, y, w, h, img,i){
          cs_enemis++;
        if (cs_enemis === 2) {
            cs_enemis = 0;
        }
                                //altera o tamanho da imagem pros enemegos
        context.drawImage(img_enemis, cs_enemis * 67,i*59, 67, 59, x, y, w, h);

        
    }
    
    function isLoad() {
         inicio.play();
        context.fillStyle = img_inicio;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#000";
        context.font = "28px sans-serif";
        context.textBaseline = 'top';
        if (load === total) {
            
        } else {
            
        }
        context.fillStyle = "#f00";
        context.fillRect(200,
                300, (canvas.width / 2) * load / total,
                canvas.height * 0.1);
        context.strokeStyle = "#000";
        context.strokeRect(200,
                300, canvas.width / 2,
                canvas.height * 0.1);
    }

    function drawProto (xp, yp, wp, hp, img) {
//        proto.play();
        cs_proto++;
        if (cs_proto === 1) {
            cs_proto = 0;
        }

        context.drawImage(img_proto, cs_proto * 534, 0, 534, 885, xp, yp, wp, hp);


    }
    
    function start() {
        clearInterval(loop);
        loop = setInterval(mainLoop, speed);
        load = 0;
        tema.play();
    }

    function gameover() {
        tema.pause();
        tema.currentTime = 0;
        sound_dead.play();
        clearInterval(loop);
        dead = true;
    }
    //DESENHA O MEGAMAN
    function drawMegaman() {
        if (state_megaman === 'stop') {
            cs_megaman = 1;
        } else {
            cs_megaman++;
        }
        if (cs_megaman === 4) {
            cs_megaman = 0;
        }
        sx = 27;
        if (state_megaman === 'down') {
            sy = 81;
        } else if (state_megaman === 'up') {
            sy = 119;
        } else if (state_megaman === 'left') {
            sy = 42;
        } else if (state_megaman === 'right') {
            sy = 3;
        }
        context.drawImage(img_megaman, cs_megaman * sx, sy, sw, sh, (xc - rc), (yc - rc), 2 * rc, 2.5 * rc);

    }

    function loadAssets() {

        //Imagens e Sprites
        //Carega Megaman
        img_megaman.src = 'img/megaman.png';
        img_megaman.onload = function () {
            load++;
            console.log(img_megaman.src + " " + load);
        };
        
        //Carrega Piranha
        img_piranha.src = 'img/piranha.png';
        img_piranha.onload = function () {
            load++;
            console.log(img_piranha.src + " " + load);

        };
        
          img_enemis.src = 'img/enemis.png';
          img_enemis.onload = function () {
          load++;
          console.log(img_enemis.src + " " + load);

        };
        
        img_moeda.src='img/moeda.png';
	img_moeda.onload = function () {
		load++;
	console.log(img_moeda.src + " " + load);	
	};
        
        img_proto.src='img/protoman.png';
	img_proto.onload = function () {
		load++;
	console.log(img_proto.src + " " + load);	
	};
        
        img_fundo.src = 'img/fundo.png';
        img_fundo.onload = function () {
            load++;
        img_fundo = context.createPattern(img_fundo, 'repeat');
        };
        
        img_inicio.src = 'img/inicio.jpg';
        img_inicio.onload = function () {
            load++;
        img_inicio = context.createPattern(img_inicio, 'repeat');
        };
        
       
        //Audio
        tema = new Audio("audio/jogo.mp3");
        tema.load();
        tema.volume = 0.5;
        tema.addEventListener('canplaythrough', function () {
            load++;
        }, false);

        sound_dead = new Audio("audio/dead.mp3");
        sound_dead.load();
        sound_dead.volume = 1;
        sound_dead.addEventListener('canplaythrough', function () {
            load++;
            
        }, false);

          som = new Audio("audio/moeda.mp3");
          som.load();
          som.volume = 1;
          som.addEventListener('canplaythrough', function () {
          load++;
       }, false);
       
          inicio = new Audio("audio/inicio.mp3");
          inicio.load();
          inicio.volume = 1;
          inicio.addEventListener('canplaythrough', function () {
          load++;
       }, false);
       
//        proto = new Audio("audio/proto_whis.mp3");
//        proto.load();
//        proto.volume = 0.2;
//        proto.addEventListener('canplaythrough', function () {
//            load++;
//        }, false);
    }
    
    




}
        