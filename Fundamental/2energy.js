let leftSide, rightSide, topSide, bottomSide, middle, spring, k, a, electronMembrane, holeMembrane, metal, angle, rotationSpeed, pyramids, monofacial;
let photons = [];
let holes = [];
let electrons = [];
let load;

function setup() {
  initialise();
  load = new Fan();
  electronMembrane = 1;
  holeMembrane = 1;
  metal = 1;
  reset();
}

function reset() {
    let pvx = 0;
    let pvy = sqrt(2-pvx*pvx);
    let photon = new Photon(random(leftSide,rightSide), 0,pvx,pvy, photons);
    photon.wavelength = random(300,1400);
    photons.push(photon);
}

function draw() {
  if(frameCount % 30 === 0){
    reset();
  }
  displayCellElements(1,1,1,1);
  displayLegend(1,1,1,1,1,1,1);
  electronHoleInteraction(0.001,1.5,0.02);
  load.display();
  for (let i = photons.length-1; i >= 0; i--) {
    photons[i].move();
    photons[i].display();
    if ((photons[i].y>topSide)&&(photons[i].y<bottomSide)&&(random(1)>0.96)) {
        let electron = new Electron(photons[i].x,photons[i].y, k, electrons);       
        electrons.push(electron);
        let hole = new Hole(photons[i].x,photons[i].y, k, holes);       
        holes.push(hole);
        photons.splice(i,1);
    }
  }
  electrons.forEach(electron => {
    electron.collide();
    electron.move();
    electron.display();
  });
  holes.forEach(hole => {
    hole.collide();
    hole.move();
    hole.display();
  });
}

