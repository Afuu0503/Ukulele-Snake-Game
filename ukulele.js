let label = 'waiting...'; //komunikat label określa, że w tym wypadku 
//będzie kontinuum jakieś operacji 

let classifier;//separator


function preload() {
  classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/c_ffmoQ3K/model.json');
}//w tym miejscu załadowałam ze strony teachable machine wyuczony przez komputer 
//kod, w którym rozpoznaje dźwięki ukulele (E, A, C, G)

/*
określenie wszystkich wartości występujących w programie
*/
let snake;
let rez = 15;//w tym wypadku skalowanie wynosi 15
let food;
let w;
let h;

function setup() {
  createCanvas(800, 800);
 
  classifyAudio();
  /*
  do floor przypisałam wartości w oraz h, które były mi potrzebne do 
  określenia położenia węża w "dodatek.js"
  */
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5); //szybkość klatek
  snake = new Snake(); //odtwarzanie nowego węża po każdej klatce
  foodLocation(); // lokalizowanie jedzenia
}


function classifyAudio() {
  classifier.classify(gotResults); //sklasyfikowanie dźwięku i wytworzenie reakcji
}


function foodLocation() {
  let x = floor(random(w));// Tutaj określiłam randomowe pojawianie się jedzenia 
  let y = floor(random(h));
  food = createVector(x, y);//przypisanie wektora do położenia jedzenia. Potrzebne jest to 
  //by określić, czy wąż zjadł jedzenie i czy idą za tym dalsze konsekwencje (wzrost węża)

}
/*
W tym miejscu dokładnie przypisuję wartością z mojej wyuczonej maszyny 
do zmian w położeniu węża
*/
function controlSnake() {
  if (label === 'A') { // UP
    snake.setDir(0, -1);
  } else if (label === 'E') { // RIGHT
    snake.setDir(1, 0);
  } else if (label === 'C') { // LEFT
    snake.setDir(-1, 0);
  } else if (label === 'G') { // DOWN
    snake.setDir(0, 1);
  } 
}
/*
W tym miejscu pozwalam programowi wypisać na ekran wszystko co zostało 
zaprogramowane.
*/
function draw() {
  background(213, 190, 183);//kolor tła
  textSize(32);//podpis z graną struną
  fill(255);//wypełnienie napisu
  text(label, 10, 50);//położenie napisu
  
  scale(rez);// w tym wypadku skalowanie obiektu wynosi tyle ile 
  //jest podane u samej góry
  if (snake.eat(food)) { //jeśli wąż zje jedzenie to...
    foodLocation();//...lokalizacja węża się zmienia
  }
  snake.update();//wąż się aktualizuje
  snake.show();//pokazują się wyniki aktualizacji

/*
W tym miejscu określam dokładnie co się dzieje gdy przegramy
*/
  if (snake.endGame()) {
    print("END GAME"); //wypisz "koniec gry"
    background(255, 0, 0);//zmienia się kolor tła
    noLoop();//nie otwiera nam się na nowo gra
  }
/*
Tutaj określam ddokładnie wygląd jedzenia
*/
  noStroke();//bez obwódek 
  fill(155, 95, 79 );//kolor wypełnienia
  rect(food.x, food.y, 1, 1);//kwadrat z przypisanymi wartościami
}

//Klasyfikacja wyników
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;//jeśli wystąpił jakikolwiek błąd program reaguje błędem
  }
  label = results[0].label;
  controlSnake();//jeśli nie ma zakłuceń to gra jest dalej odtwarzana 
}