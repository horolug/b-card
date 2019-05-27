
function createMicrochip(){
  // 2 rectangles
  // 1 line of text
  // 2 or 4 sets of microchip legs
  // Width or height - sizedif should be always dividable by 16
  const xAxis = 200;
  const yAxis = 250;
  const chipWidth = 60;
  const chipHeight = 60;
  const sizeDiff = 10;
  const innerWidth = chipWidth - (sizeDiff*2);
  const innerHeight = chipHeight - (sizeDiff*2);
  const radius = 8;
  const textFontSize = 20;
  const chipLegSize = 15;
  const containerWidth = chipWidth+chipLegSize*2;
  const containerHeight = chipHeight+chipLegSize*2;

  // Fixme - need a robust way of centering thext within the chip
  const textXaxis = ((chipWidth/2)+textFontSize/2);
  const textYaxis = ((chipHeight/2)+textFontSize);

  const svgNS = "http://www.w3.org/2000/svg";
  const svgContainer = document.getElementById("circuitBoard");
  let chipContainer = document.createElementNS(svgNS,"svg");
  chipContainer.setAttributeNS(null,"x", xAxis);
  chipContainer.setAttributeNS(null,"y", yAxis);
  chipContainer.setAttributeNS(null,"fill", "none");
  // chipContainer.setAttributeNS(null,"width", containerWidth);
  // chipContainer.setAttributeNS(null,"height", containerHeight);
  // chipContainer.setAttributeNS(null,"stroke", "grey");


  let outerSection = document.createElementNS(svgNS,"rect");
  outerSection.setAttributeNS(null,"class","chip");
  outerSection.setAttributeNS(null,"x", chipLegSize);
  outerSection.setAttributeNS(null,"y", chipLegSize);
  outerSection.setAttributeNS(null,"width", chipWidth);
  outerSection.setAttributeNS(null,"height", chipHeight);
  outerSection.setAttributeNS(null,"rx", radius);

  let innerSection = document.createElementNS(svgNS,"rect");
  innerSection.setAttributeNS(null,"class","chip_inside");
  innerSection.setAttributeNS(null,"x", chipLegSize+sizeDiff);
  innerSection.setAttributeNS(null,"y", chipLegSize+sizeDiff);
  innerSection.setAttributeNS(null,"width", innerWidth);
  innerSection.setAttributeNS(null,"height", innerHeight);
  innerSection.setAttributeNS(null,"rx", radius);

  let chipText = document.createElementNS(svgNS,"text");
  chipText.setAttributeNS(null,"class","chip_text");
  chipText.setAttributeNS(null,"x", textXaxis);
  chipText.setAttributeNS(null,"y", textYaxis);
  chipText.setAttributeNS(null,"font-size", textFontSize);
  chipText.setAttributeNS(null,"fill", "orange");
  chipText.textContent = "A";

  chipLegs( chipContainer, chipWidth, chipHeight );

  chipContainer.appendChild(outerSection);
  chipContainer.appendChild(innerSection);
  chipContainer.appendChild(chipText);
  svgContainer.appendChild(chipContainer);
}

function chipLegs( chipContainer, chipWidth, chipHeight, legType ){
  // possible 4 types of chip legs
  // only 2 types are mandatory up+down or left+right
  // legType can be : vertical, horisontal, full

  const xAxis = 0;
  const yAxis = 0;
  const legBaseWidth = 8;
  const legBaseHeigth = 5*2+chipHeight; // leg tip * 2
  const legTipWidth = 4;
  const legTipHeight = 30+chipHeight; // leg base + leg tip * 2
  const legCountHorizontal = (chipWidth / (legBaseWidth * 2)) - 1;
  const legCountVertical = (chipHeight / (legBaseWidth * 2)) - 1;
  let legY = 10;
  let legX = 25;

  const svgNS = "http://www.w3.org/2000/svg";
  let chipLegsContainer =  document.createElementNS(svgNS,"svg");
  chipLegsContainer.setAttributeNS(null,"x", xAxis);
  chipLegsContainer.setAttributeNS(null,"y", yAxis);

  const svgContainer = document.getElementById("circuitBoard");

  if(true){

  }

  for( let i=0; i < legCountHorizontal; i++ ){
    legX = (legBaseWidth*2*i)+25;
    let legBase = document.createElementNS(svgNS,"rect");
    legBase.setAttributeNS(null,"class","chip_leg_a");
    legBase.setAttributeNS(null,"x", legX);
    legBase.setAttributeNS(null,"y", legY);
    legBase.setAttributeNS(null,"width", legBaseWidth);
    legBase.setAttributeNS(null,"height", legBaseHeigth);

    let legTip = document.createElementNS(svgNS,"rect");
    legTip.setAttributeNS(null,"class","chip_leg_b");
    legTip.setAttributeNS(null,"x", legX+2);
    legTip.setAttributeNS(null,"y", 0);
    legTip.setAttributeNS(null,"width", legTipWidth);
    legTip.setAttributeNS(null,"height", legTipHeight);

    chipLegsContainer.appendChild(legTip);
    chipLegsContainer.appendChild(legBase);
  }

  for( let i=0; i < legCountVertical; i++ ){
    legX = 10;
    legY = (legBaseWidth*2*i)+25;
    let legBase = document.createElementNS(svgNS,"rect");
    legBase.setAttributeNS(null,"class","chip_leg_a");
    legBase.setAttributeNS(null,"x", legX);
    legBase.setAttributeNS(null,"y", legY);
    legBase.setAttributeNS(null,"width", legBaseHeigth);
    legBase.setAttributeNS(null,"height", legBaseWidth);

    let legTip = document.createElementNS(svgNS,"rect");
    legTip.setAttributeNS(null,"class","chip_leg_b");
    legTip.setAttributeNS(null,"x", 0);
    legTip.setAttributeNS(null,"y", legY+2);
    legTip.setAttributeNS(null,"width",  legTipHeight);
    legTip.setAttributeNS(null,"height", legTipWidth);

    chipLegsContainer.appendChild(legTip);
    chipLegsContainer.appendChild(legBase);
  }

  chipContainer.appendChild(chipLegsContainer);
}

function drawCircuit( options ){
  console.log("drawCircuit was called");
  createMicrochip();
}


drawCircuit(
  {
    "option": "foo"
  }
);
