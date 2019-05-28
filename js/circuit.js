
function createMicrochip(options){
  // 2 rectangles
  // 1 line of text
  // 2 or 4 sets of microchip legs
  // Width or height - sizedif should be always dividable by 16

  const xAxis = options.xCoord;
  const yAxis = options.yCoord;
  const chipWidth = options.width;
  const chipHeight = options.height;
  const innerText = options.name;
  const sizeDiff = 10;
  const innerWidth = chipWidth - (sizeDiff*2);
  const innerHeight = chipHeight - (sizeDiff*2);
  const radius = 8;
  const textFontSize = 20;
  const chipLegSize = 15;
  const containerWidth = chipWidth+chipLegSize*2;
  const containerHeight = chipHeight+chipLegSize*2;

  // Fixme - need a robust way of centering thext within the chip
  // const textXaxis = ((chipWidth/2)+textFontSize/2);
  const textXaxis = 45;
  const textYaxis = ((chipHeight/2)+textFontSize);

  const svgNS = "http://www.w3.org/2000/svg";
  const svgContainer = document.getElementById("circuitBoard");
  let chipContainer = document.createElementNS(svgNS,"svg");
  chipContainer.setAttributeNS(null,"x", xAxis);
  chipContainer.setAttributeNS(null,"y", yAxis);

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
  chipText.textContent = innerText;

  chipLegs( chipContainer, chipWidth, chipHeight );

  chipContainer.appendChild(outerSection);
  chipContainer.appendChild(innerSection);
  chipContainer.appendChild(chipText);
  svgContainer.appendChild(chipContainer);
}

function microchip (options){
  const xAxis1 = options.xCoord;
  const yAxis1 = options.yCoord;
  const chipWidth = options.width;
  const chipHeight = options.height;
  const innerText = options.name;
  const radius = 8;
  const sizeDiff = 10;
  const innerWidth = chipWidth - (sizeDiff*2);
  const innerHeight = chipHeight - (sizeDiff*2);
  const textFontSize = 20;

  // Fixme - need a robust way of centering thext within the chip
  // const textXaxis = ((chipWidth/2)+textFontSize/2);
  const textXaxis = 45;
  const textYaxis = ((chipHeight/2)+textFontSize);

  const s = Snap("#board");

  let outerSection = s.rect(xAxis1, yAxis1, chipWidth, chipHeight, radius);
  outerSection.attr({
    "class": "chip"
  });

  let innerSection = s.rect(xAxis1+sizeDiff, yAxis1+sizeDiff, innerWidth, innerHeight, radius);
  innerSection.attr({
    "class": "chip_inside"
  });

  let text = s.text(textXaxis, textYaxis, innerText);
  text.attr({
    "class": "chip_text"
  });
}

function createChipLeg( legX, legY, chipHeight){
  // fixme - logic responsible for creating chip legs needs to be refactored
}

function chipLegs( chipContainer, chipWidth, chipHeight ){
  const xAxis = 0;
  const yAxis = 0;
  const legBaseWidth = 8;
  const legBaseHeigth = 10+chipHeight; // leg tip * 2
  const legTipWidth = 4;
  const legTipHeight = 30+chipHeight; // leg base + leg tip * 2

  const legCountHorizontal = (chipWidth / (legBaseWidth * 2)) - 1;
  const legCountVertical = (chipHeight / (legBaseWidth * 2)) - 1;
  let legY = 10;
  let legX = 25;

  const svgContainer = document.getElementById("circuitBoard");
  const svgNS = "http://www.w3.org/2000/svg";
  let chipLegsContainer =  document.createElementNS(svgNS,"svg");
  chipLegsContainer.setAttributeNS(null,"x", xAxis);
  chipLegsContainer.setAttributeNS(null,"y", yAxis);

  for( let i=0; i < legCountHorizontal; i++ ){
    legX = (legBaseWidth*2*i)+25;

    createChipLeg( legX, legY, chipHeight );
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
    legBase.setAttributeNS(null,"width", 10+chipWidth);
    legBase.setAttributeNS(null,"height", legBaseWidth);

    let legTip = document.createElementNS(svgNS,"rect");
    legTip.setAttributeNS(null,"class","chip_leg_b");
    legTip.setAttributeNS(null,"x", 0);
    legTip.setAttributeNS(null,"y", legY+2);
    legTip.setAttributeNS(null,"width",  30+chipWidth);
    legTip.setAttributeNS(null,"height", legTipWidth);

    chipLegsContainer.appendChild(legTip);
    chipLegsContainer.appendChild(legBase);
  }

  chipContainer.appendChild(chipLegsContainer);
}

function drawCircuit( options ){
  console.log("drawCircuit was called");


  for( let i = 0; i < options.length; i++ ){
    createMicrochip(options[i]);

    microchip(options[i]);
  }
}


drawCircuit(
   [
      {
        "name": "HTML",
        "width": 108,
        "height": 108,
        "xCoord": 100,
        "yCoord": 100
      },
      {
        "name": "Webpack",
        "width": 332,
        "height": 108,
        "xCoord": 300,
        "yCoord": 100
      },
      {
        "name": "CSS",
        "width": 92,
        "height": 92,
        "xCoord": 0,
        "yCoord": 0
      },
    ]
);
