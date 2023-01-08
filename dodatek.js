/*
Żeby stworzyć węża, który mógłby się poruszać po canvasie trzeba stworzyś
osobną klasę dla niego w której określimy sobie dokładnie jego wygląd i 
funkcje. Wąż jest kwadracikiem, który porusza się po planszy. Gdy pokryje się 
z przypisanym obiektem powiększa się o jeden segment i kontynuuje ruch. 
Zatem...*/
class Snake {
    /*
    Zaczęłam od stworzenia klasy Wąż dla wszystkich wyrażeń określonych 
    poniżej. Jako pierwsze określiłam konstrukcję węża. Jako drugie przywołałam 
    funkcję body, następnie przypisałam jej współrzędne. Body działa w tym wypadku
    jak ciąg, który przypisałam jako "createvector", który ma na celu określenie ścieżki 
    ruchu danego obiektu. 
    Na razie nie jest dokładnie zdefiniowana(dokładny obszar znajduje się w ukulele.js), 
    ale wiemy na jej podstawie, że obiekt będzie się poruszać po jakieś przestrzeni "floor". 
    Metoda dir zastosowana przeze mnie ma na celu wyświetlić interaktywną listę własności 
    danego obiektu, czyli możliwość poruszania się wektorowego. 
    */ 
    constructor() {
        this.body = [];
      this.body[0] = createVector(floor(w/2), floor(h/2));
      this.xdir = 0;
      this.ydir = 0;
      this.len = 0;
    }
    /*
    w setDir jak sama nazwa wskazuje określiłam sobie czym tak na prawdę jest 
    interaktywna lista własności a właściwie z jakich komponentów się składa. Więc
    na początku określiłam sobie, że mam obiekty x i obiekty y, które znajdują 
    się tej funkcji
    */
    setDir(x, y) {
        this.xdir = x;
      this.ydir = y;
    }
    /*
    potrzebne było mi określenie położenia głowy, by wąż cały czas sprawdza, 
    czy jeśli glowa będzie w tym samym miejscu co jego "jedzenie" to musi powiększyć 
    się o jeden segment. Znowu przypisujemy położenie interaktywnego obiektu 
    dir i określamy, że głowa znajduje się na samym początku twożonego ciągu 
    obiektów, ponieważ reszta jest spychana dalej
    */
    update() {
        let head = this.body[this.body.length-1].copy();
      this.body.shift();
      head.x += this.xdir;
      head.y += this.ydir;
      this.body.push(head);
    }
    /*
    len które zostało wpisane powyżej określa położenie węża. Jeśli głowa
    napotka na jedzenie, ciało węża ma się powiększyć (w tym przypadku o 
    ilość zjedzonego jedzenia). Jednak rośnięcie węża jest określone poniżej. 
    Tutaj tylko określamy co się stanie jeśli wąż napotka jedzenie, ale tego 
    dokładnie nie definiujemy.
    */
    grow() {
        let head = this.body[this.body.length-1].copy();
      this.len++;
      this.body.push(head);
    }
    /*
    endGame opisuje zachowanie gry gdy wąż spotka pewne przeszkody. W tym wypadku 
    określamy, że przekroczenie wymiarów planszy po każdej stronie skutkuje zakończeniem gry. 
    przywołujemy ponownie pozycję węża i określamy, że jeżeli jego pozycja 
    będzie wychodzić poza zakres każdej strony canvasu określonej wartościami (w,h)
    to zwraca nam warunek true czyli przegrywa grę. Taka sama sytuacja jest jeśli 
    wąż swoją głową dotkie reszty swojego ciała.   
    */
    endGame() {
        let x = this.body[this.body.length-1].x;//tutaj mamy położenie głowy
      let y = this.body[this.body.length-1].y;
       if(x > w-1 || x < 0 || y > h-1 || y < 0) { //tutaj pojawił się zakres każdej strony canvasu
          return true;
       }
      x = constrain(x, 0, w-1);//constrain określa najmnijszą i największą wartość
      y = constrain(y, 0, h-1);
      for(let i = 0; i < this.body.length-1; i++) {
          let part = this.body[i];
        if(part.x == x && part.y == y) {//tutaj określamy dokładnie, że jeżeli dotkinie swojego ciała to...
            return true;//...zwracamy prawdę, czyli gra się kończy
        }
      }
      return false;
    }
    /*
    eat(pos) opisuje x i y jako położenie ciała z uwzględnieniem długości. 
    Jeśli jego położenie jest równe położeniu jedzenia ciało obiektu 
    powiększa się. W innym wypadku - flase - czyli pozostaje bez zmian. 
    Jest to uzupełnienie funkcji grow(). 
    */
    eat(pos) {
        let x = this.body[this.body.length-1].x;
      let y = this.body[this.body.length-1].y; //dzięki temu nie widzimy pokarmu, który przechodzi przez ciało węża
      if(x == pos.x && y == pos.y) {
        this.grow();
        return true;
      }
      return false;
    }
    /*
    Show określa wygląd naszego węża. Fill określa jego kolor, noStroke - bez
    krawędzi, rect - kwadracik o wymiarach obiektu interaktywnego x i y, 
    gdzie rozmiar wynosi 1 x 1 piksela. Później te wymiary zostaną 
    zmienione w ukulele.js. Całość zawarta jest w pętli, która określa, że 
    po każdym ruchu, chcę żeby wygląd węża, a zwłaszcza jego długość była zachowana
    */
    show() {
        for(let i = 0; i < this.body.length; i++) {
          fill(0, 162, 191 );
        noStroke();
        rect(this.body[i].x, this.body[i].y, 1, 1)
      }
    }
  
  }