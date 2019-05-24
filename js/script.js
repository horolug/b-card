function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(dataSet) {
    var ctr = dataSet.length, temp, index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = dataSet[ctr];
        dataSet[ctr] = dataSet[index];
        dataSet[index] = temp;
    }
    return dataSet;
}

function createCircle( x, y ){
  const svgNS = "http://www.w3.org/2000/svg";
  const svgContainer = document.getElementById("network");
  let myCircle = document.createElementNS(svgNS,"circle");
  myCircle.setAttributeNS(null,"class","node");
  myCircle.setAttributeNS(null,"r", 2);
  myCircle.setAttributeNS(null,"cx", x);
  myCircle.setAttributeNS(null,"cy", y);
  svgContainer.appendChild(myCircle);
}

function createLine(x1, x2, y1, y2){
  console.log("getting");
  console.log("x1", x1);
  console.log("x2", x2);
  console.log("y1", y1);
  console.log("y2", y2);

  const svgNS = "http://www.w3.org/2000/svg";
  const svgContainer = document.getElementById("network");
  let myLine = document.createElementNS(svgNS,"line");
  myLine.setAttributeNS(null,"class","node-connector");
  myLine.setAttributeNS(null,"x1", x1);
  myLine.setAttributeNS(null,"x2", x2);
  myLine.setAttributeNS(null,"y1", y1);
  myLine.setAttributeNS(null,"y2", y2);
  svgContainer.appendChild(myLine);
}

function randomNodes(nodeCount, sectorNumber, sectorSize){
  // Fixme - to avoid linear spread, we need to factor in virtual lines and columns
  const minDistance = 10;
  const maxDistance = 25;
  let nodeList = [];
  for ( let k=0; k < nodeCount; k++  ){
    const startingPoint = sectorNumber * sectorSize;
    let randomInt = '';
    if ( nodeList.length === 0 ){
      randomInt = getRandomInt(startingPoint, startingPoint+minDistance);
    } else {
      let minValue = nodeList[nodeList.length-1]+minDistance;
      let maxValue = nodeList[nodeList.length-1]+maxDistance;
      randomInt = getRandomInt(minValue, maxValue);
    }
    nodeList.push(randomInt);
  }
  return shuffle(nodeList);
}

function addNodes( xSectorIndex, ySectorIndex, sectorSize ){
  const nodeCount = 3;
  const nodeList = {
    'xNodes': randomNodes(nodeCount, xSectorIndex, sectorSize),
    'yNodes': randomNodes(nodeCount, ySectorIndex, sectorSize)
  };

  return nodeList;
}

function sectorPool (){
  let sectorPool = [];
  const range = 800;
  const cols = [];
  const rows = [];
  const sectorCount = 80;
  const sectorSize = 60;
  const colCount = range / sectorSize;
  const rowCount = range / sectorSize;
  // For each line we keep same y coord setting;
  // For each col we keep same x coord setting;
  console.log("cols and rows", );

  for ( let i=0; i < rowCount; i++ ){
    for (let j=0; j < colCount; j++){
      sectorPool.push( addNodes(i, j, sectorSize) );
    }
  }

  // for (let i=0; i < sectorCount; i++ ){
  //   sectorPool.push( addNodes(i, sectorSize) );
  // }

  console.log("sectorPool returning", sectorPool);
  return sectorPool;
}

function createNodes() {
  const range = 800;
  const nodeCount = 65;
  const coorditnatePool = nodeCount * 2;
  let nodeArray = [];
  const sectorSize = 40;
  const sectorCount = 800/sectorSize;

  const sectors = sectorPool(sectorCount, sectorSize);
  console.log("sectors", sectors);
  for ( let j=0; j < sectors.length; j++ ){
    console.log("first loop", j);
    console.log("sectors[j].length", sectors[j]['xNodes'].length);
    for( let k=0; k < sectors[j]['xNodes'].length; k++ ){
      console.log("second loop", k);
      console.log("x val", sectors[j]['xNodes'][k]);
      console.log("y val", sectors[j]['yNodes'][k]);
      const x1 =  sectors[j]['xNodes'][k];
      const y1 = sectors[j]['yNodes'][k];

      createCircle(x1, y1);

      let x2 = "";
      let y2 = "";

    }
  }
}

// createNodes();
