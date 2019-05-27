
function createMicrochip(){
  // 2 rectangles
  // 1 line of text
  // 2 or 4 sets of microchip legs
  // Width or height should be always dividable by 16
  const xAxis = 200;
  const yAxis = 250;
  const chipWidth = 64;
  const chipHeight = 64;
  const sizeDiff = 12;
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
  // font-size="20" fill="orange"



  chipContainer.appendChild(outerSection);
  chipContainer.appendChild(innerSection);
  chipContainer.appendChild(chipText);

  chipLegs( chipContainer, chipWidth, chipHeight );

  svgContainer.appendChild(chipContainer);
}

function chipLegs( chipContainer, chipWidth ){
  // <rect x="92" class="chip_leg_a" width="4" height="10" />
  // <rect x="90" y="10" class="chip_leg_b" width="8" height="5" />
  // possible 4 types of chip legs
  // only 2 types are mandatory up+down or left+right

  const xAxis = 25;
  const yAxis = 0;
  const legBaseWidth = 8;
  const legBaseHeigth = 5;
  const legTipWidth = 4;
  const legTipHeight = 10;
  const legCount = (chipWidth / (legBaseWidth * 2)) - 1;
  let legY = 10;
  let legX = 0;

  const svgNS = "http://www.w3.org/2000/svg";
  let chipLegsContainer =  document.createElementNS(svgNS,"svg");
  chipLegsContainer.setAttributeNS(null,"x", xAxis);
  chipLegsContainer.setAttributeNS(null,"y", yAxis);

  const svgContainer = document.getElementById("circuitBoard");

  let legBase = document.createElementNS(svgNS,"rect");
  legBase.setAttributeNS(null,"class","chip_leg_a");
  legBase.setAttributeNS(null,"x", 10);
  legBase.setAttributeNS(null,"y", 10);
  legBase.setAttributeNS(null,"width", legBaseWidth);
  legBase.setAttributeNS(null,"height", legBaseHeigth);


  for ( let i=0; i < legCount; i++ ){
    legX = (legBaseWidth*2)*i;
    let legBase = document.createElementNS(svgNS,"rect");
    legBase.setAttributeNS(null,"class","chip_leg_a");
    legBase.setAttributeNS(null,"x", legX);
    legBase.setAttributeNS(null,"y", legY);
    legBase.setAttributeNS(null,"width", legBaseWidth);
    legBase.setAttributeNS(null,"height", legBaseHeigth);
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
