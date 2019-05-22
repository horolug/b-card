function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function createCircle( x, y ){
  const svgNS = "http://www.w3.org/2000/svg";
  const svgContainer = document.getElementById("network");
  let myCircle = document.createElementNS(svgNS,"circle");
  myCircle.setAttributeNS(null,"class","node");
  myCircle.setAttributeNS(null,"r", 4);
  myCircle.setAttributeNS(null,"cx", x);
  myCircle.setAttributeNS(null,"cy", y);
  svgContainer.appendChild(myCircle);
}

function checkDistance (){

}

function createNodes() {

  const range = 800;
  const nodeCount = 160;
  const coorditnatePool = nodeCount * 2;
  let nodeArray = [];

  while ( nodeArray.length < coorditnatePool ){
    const randomInt =  getRandomInt(800);
    if ( ! nodeArray.includes(randomInt) ){
      nodeArray.push(randomInt);
    }
  }

  const xPool = nodeArray.slice(0, nodeCount);
  const yPool = nodeArray.slice(nodeCount, nodeArray.length);

  for (let i = 0; i < nodeCount; i ++){
    console.log("running for loop from ");
    console.log(" xPool[i] ",  xPool[i]);
    console.log(" yPool[i] ",  yPool[i]);
    createCircle(xPool[i], yPool[i]);
  }
}

createNodes();
