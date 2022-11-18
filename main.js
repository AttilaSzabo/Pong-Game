let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');

// Bal ütő beállítása
let balUtoAzXTengejtol = 20;
let balUtoAzYTengejtol = 260;
let balUtoFelmozgatasa = false;
let balUtoLemozgatasa = false;
let balUtoGyorsasaga = 2;

// Jobb ütő beállítása
let jobbUtoAzXTengejtol = 875; // pálya szélessége 900px - 5px az ütő szélessége - 20px az x pozíciója = 875px 
let jobbUtoAzYTengejtol = 260;
let jobbUtoFelmozgatasa = false;
let jobbUtoLemozgatasa = false;
let jobbUtoGyorsasaga = 2;

// Labda beállítása
let labdaXTengeje = 0;
let labdayTengeje = 0;
let labdaxIranya = 0;
let labdayIranya = 0;
let labdaGyorsitasa = 1.5;

// Bal játékos pontszámai
let balJatekos = 0;

// Jobb játékos pontszámai
let jobbJatekos = 0;

// Hang hozzáadása


// Játékosok pontszámai
function jatekosokPontszamia (text,x,y) {
    ctx.beginPath();
    ctx.font = '40px fantasy';
    ctx.fillText(text,x,y);
    ctx.fillStyle = 'white'
};


// Az ütők megrajzolása
function utoRajzolasa (x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.fillStyle = 'white';
    ctx.fill();
};

// Labda megrajzolása
function labdaRajzolasa (x,y,r,) {
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
};

// Labda pozíciója és a véletlen irány generálása
function labdaPozicionalasa () {
    labdaXTengeje = 445;
    labdayTengeje = 295;
    labdaxIranya = (Math.trunc(Math.random())* 2+1) * (Math.round(Math.random()) * 2-1);
    labdayIranya = (Math.trunc(Math.random())* 2+1) * (Math.round(Math.random()) * 2-1);
};

// Labda elindítása
function labdaElinditasa () {
    labdaXTengeje += labdaxIranya;
    labdayTengeje += labdayIranya;
    if (labdayTengeje >= 590 || labdayTengeje <=10) {
        labdayIranya = -labdayIranya
    };
    if (labdaXTengeje > 900) {
        new Audio ("./gameover.mp3").play()
        labdaPozicionalasa ()
        jobbUtoGyorsasaga = 2;
        balUtoGyorsasaga = 2;
        balJatekos += 1;

    };
    if (labdaXTengeje < 0) {
        new Audio ("./gameover.mp3").play()
        labdaPozicionalasa ()
        balUtoGyorsasaga = 2;
        jobbUtoGyorsasaga = 2;
        jobbJatekos += 1;
    };
    if (labdaXTengeje <= 30 && labdayTengeje > balUtoAzYTengejtol && labdayTengeje < balUtoAzYTengejtol + 80) {
        new Audio ("./sound.mp3").play()
        labdaxIranya = -labdaxIranya
        labdaxIranya *= 1.5;
        balUtoGyorsasaga *= 1.5
    };
    if (labdaXTengeje >= 865 && labdayTengeje > jobbUtoAzYTengejtol && labdayTengeje < jobbUtoAzYTengejtol + 80) {
        new Audio ("./sound.mp3").play()
        labdaxIranya = -labdaxIranya
        labdaxIranya *= labdaGyorsitasa;
        jobbUtoGyorsasaga *= 1.5
    };
};

// A billentyű igazra állítása
window.addEventListener('keydown', function(event) {
    if (event.keyCode === 87) {balUtoFelmozgatasa = true;}
    if (event.keyCode === 83) {balUtoLemozgatasa = true;}
    if (event.keyCode === 38) {jobbUtoFelmozgatasa = true;}
    if (event.keyCode === 40) {jobbUtoLemozgatasa = true;}
});

// A billentyű hamisra állítása
window.addEventListener('keyup', function(event) {
    if (event.keyCode === 87) {balUtoFelmozgatasa = false;}
    if (event.keyCode === 83) {balUtoLemozgatasa = false;}
    if (event.keyCode === 38) {jobbUtoFelmozgatasa = false;}
    if (event.keyCode === 40) {jobbUtoLemozgatasa = false;}
});

// Az ütők elindítása fel le
function utokInditasa () {
    if (balUtoFelmozgatasa) {balUtoAzYTengejtol-=balUtoGyorsasaga;}
    if (balUtoLemozgatasa) { balUtoAzYTengejtol+=balUtoGyorsasaga;}
    if (jobbUtoFelmozgatasa) { jobbUtoAzYTengejtol-=jobbUtoGyorsasaga;}
    if (jobbUtoLemozgatasa) { jobbUtoAzYTengejtol+=jobbUtoGyorsasaga;}
};

// Az ütők leállítása ha a pálya végére érnek
function utokAPalyaVegen () {
    if (balUtoAzYTengejtol <= 10) {balUtoFelmozgatasa = false;}
    if (balUtoAzYTengejtol >= 510) {balUtoLemozgatasa = false;}
    if (jobbUtoAzYTengejtol <= 10) {jobbUtoFelmozgatasa = false;}
    if (jobbUtoAzYTengejtol >= 510) {jobbUtoLemozgatasa = false;}
};

// Játék elindítása ciklusban
function jatek () {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    jatekosokPontszamia (balJatekos,30,50);
    jatekosokPontszamia (jobbJatekos,850,50);
    utokAPalyaVegen ()
    utoRajzolasa (jobbUtoAzXTengejtol,jobbUtoAzYTengejtol,5,80);
    utoRajzolasa (balUtoAzXTengejtol,balUtoAzYTengejtol,5,80);
    utokInditasa ()
    labdaElinditasa ()
    labdaRajzolasa (labdaXTengeje,labdayTengeje,10)
    window.requestAnimationFrame(jatek);
};

labdaPozicionalasa ()
jatek ()
