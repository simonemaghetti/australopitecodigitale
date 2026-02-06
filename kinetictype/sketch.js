let frase = ["a", "u", "s", "t", "r", "a", "l", "o", "p", "i", "t", "e", "c", "o", " ", "d", "i", "g", "i", "t", "a", "l", "e"];
let indice = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  // Sostituisci il background con un rettangolo semi-trasparente per scie più fluide
  fill(0, 30);
  rect(0, 0, width, height);

  let mxP = map(mouseX, 0, width, -1, 1);
  let myP = map(mouseY, 0, height, -1, 1);

  // Ciclo per creare 3 livelli di profondità
  for (let i = 1; i <= 3; i++) {
    let v = i * 0.4; // Velocità crescente
    let c = color(i * 50, 150 + i * 30, 255); // Colore che schiarisce
    disegnaLivelloParallasse(v, i * 25, c, mxP, myP);
  }

  indice = (indice + 1) % frase.length;
}

function disegnaLivelloParallasse(velocita, dimensioneBase, colore, mx, my) {
  let char = frase[indice];
  let ox = sin(frameCount * 3 * velocita) * 200;
  let oy = cos(frameCount * 2 * velocita) * 100;

  push();
  translate(width / 2 + mx * (80 * velocita), height / 2 + my * (80 * velocita));
  rotate(frameCount * 2 * velocita);
  
  textAlign(CENTER, CENTER);
  textSize(dimensioneBase + sin(frameCount * 5) * 20);
  
  for (let i = 0; i < 4; i++) {
    push();
    rotate(i * 90);
    
    // EFFETTO GLITCH: se il frame è multiplo di 10, sposta casualmente
    let glitch = (frameCount % 10 == 0) ? random(-5, 5) : 0;
    
    // Stroke sottile per l'effetto "Optical"
    stroke(255, 50);
    strokeWeight(1);
    
    fill(colore);
    text(char, ox + glitch, oy);
    
    // Aggiungi un cerchietto che orbita intorno alla lettera
    noStroke();
    fill(255, 150);
    ellipse(ox + glitch, oy - 40, 5, 5);
    pop();
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}