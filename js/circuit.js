function microchip (options){
  const xAxis = options.xCoord;
  const yAxis = options.yCoord;
  const chipWidth = options.width;
  const chipHeight = options.height;
  const innerText = options.name;
  const radius = 8;
  const sizeDiff = 10;
  const innerWidth = chipWidth - (sizeDiff*2);
  const innerHeight = chipHeight - (sizeDiff*2);
  const textFontSize = 20;
  const legsize = 15;

  const groupWidth = chipWidth + legsize*2;
  const groupHeight = chipHeight + legsize*2;

  // Fixme - need a robust way of centering thext within the chip
  // const textXaxis = ((chipWidth/2)+textFontSize/2);
  const textXaxis = 45;
  const textYaxis = ((chipHeight/2)+textFontSize);

  const s = Snap("#board");
  const group = Snap(groupWidth,groupHeight).attr({x:xAxis,y:yAxis});

  let outerSection = group.rect(legsize, legsize, chipWidth, chipHeight, radius);
  outerSection.attr({
    "class": "chip"
  });

  let innerSection = group.rect(legsize+sizeDiff, legsize+sizeDiff, innerWidth, innerHeight, radius);
  innerSection.attr({
    "class": "chip_inside"
  });

  let text = group.text(textXaxis, textYaxis, innerText);
  text.attr({
    "class": "chip_text"
  });

  legs(group, groupWidth, groupHeight);

  s.add(group);
}

function legs( chipContainer, groupWidth, groupHeight ){
  let legBaseWidth = 8;
  let legBaseHeigth = groupHeight-20; // leg tip * 2
  let legTipWidth = 4;
  let legTipHeight = groupHeight; // leg base + leg tip * 2

  const legCountHorizontal = (groupWidth / (legBaseWidth * 2)) - 3;
  const legCountVertical = (groupHeight / (legBaseWidth * 2)) - 3;
  let legY = 10;
  let legX = 25;

  const legGroup = Snap(groupWidth, groupHeight).attr({
    x:0,
    y:0
  });

  for( let i=0; i < legCountHorizontal; i++ ){
    legX = (legBaseWidth*2*i)+25;
    legGroup.rect(legX, legY, legBaseWidth, legBaseHeigth).attr({
      class:"chip_leg_a"
    });

    legGroup.rect(legX+2, 0, legTipWidth, legTipHeight).attr({
      class:"chip_leg_b"
    });
  }

  for( let i=0; i < legCountVertical; i++ ){
    legTipWidth = groupWidth;
    legTipHeight = 4;
    legBaseWidth = groupWidth-20;
    legBaseHeigth = 8;

    legX = 10;
    legY = (legBaseHeigth*2*i)+25;

    legGroup.rect(legX, legY, legBaseWidth, legBaseHeigth).attr({
      class:"chip_leg_a"
    });

    legGroup.rect(0, legY+2, legTipWidth, legTipHeight).attr({
      class:"chip_leg_b"
    });
  }

  chipContainer.prepend(legGroup);
}

function connectedPairs(options){
  // fixme - allow each chip to be connected to more than 1 chip
  let pairList = [];
  for ( let i = 0; i < options.length; i++ ){
    let chipName = options[i].name;
    let chipId = chipName.toLowerCase();

    for ( let k = 0; k <  options.length; k++ ){
      if (options[i].name === options[k].connect ){
        pairList.push([ options[i], options[k]]);
      }
    }
  }
  return pairList;
}

function findPosition( pair, axis ){
  // will take in the pair of microchips
  // for x and y axis it will return one with min coord value

  let updatedPairs = pair;
  if ( axis === "y" ){
    if ( parseInt(pair[1].yCoord) < parseInt(pair[0].yCoord) ){
      updatedPairs = [pair[1], pair[0]];
    }
  }
  if ( axis === "x" ){
    if ( pair[1].xCoord <  pair[0].xCoord ){
      updatedPairs = [pair[1], pair[0]];
    }
  }
  return updatedPairs;
}

// Calculate height and width for a box containing chip connector circuits
function sectionHeight( pair ){
  const elOnTop = findPosition(pair, "y");
  const sectionHeight = Math.abs (
    ( elOnTop[0].yCoord + elOnTop[0].height ) - elOnTop[1].yCoord
  );

  return sectionHeight;
}

function sectionWidth ( pair ){
  const elOnLeft = findPosition(pair, "x");
  const sectionWidth = Math.abs (
    elOnLeft[0].xCoord - (elOnLeft[1].xCoord + elOnLeft[1].width)
  );
  return sectionWidth;
}

// Calculate x and y coordinates for a box containing chip connector circuits
function sectionYcoord (pair, legHeight){
  const elOnTop = findPosition(pair, "y");
  const sectionY = elOnTop[0].yCoord + elOnTop[0].height+legHeight;
  return sectionY;
}

function sectionXcoord (pair, legHeight){
  const elOnLeft = findPosition(pair, "x");
  const sectionX = elOnLeft[0].xCoord+legHeight;
  return sectionX;
}

function placeNode (x, y, section){
  const node = section.circle(x, y, 4).attr({
    stroke: "blue",
    strokeWidth: "2",
    fill: "none"
  });
}

function placeNodes ( pair, section ){
  // method will place 4 nodes
  // method will place 2 connector lines
  // method will decide where to place nodes ( left, right, middle )
  // if chip coordinates overlap, connector line will be straight

}

function overlappingChips (pair){
  if ( Math.abs(pair[0].xCoord - pair[1].xCoord) < pair[1].width ){
    return true;
  }
  return false;
}

function connectorNodes ( section, pair, sectionWidth, sectionHeight ){
  overlappingChips(pair);
  const chipOnLeft = findPosition(pair, "x");
  const chipOnTop = findPosition(pair, "y");
  // fixme - allow connect to a middle of a chip if coordinates allow
  let x1Coord = 0;
  let x2Coord = 0;
  let x3Coord = 0;
  let x4Coord = 0;
  let y1Coord = 0;
  let y2Coord = 0;
  let y3Coord = 0;
  let y4Coord = 0;

  if (chipOnLeft[0].name === chipOnTop[0].name){
    // top left
    x1Coord = chipOnLeft[0].width - 30;
    y1Coord = 14;
    x3Coord = sectionWidth - chipOnLeft[1].width + 14;
  } else if ( chipOnLeft[1].name === chipOnTop[0].name ){
    // top right
    x1Coord = 14 + sectionWidth - chipOnLeft[1].width; // fixme - 14 - need to properly calculate that value
    x3Coord = 14;
    y1Coord = 16;
  }
  if ( chipOnLeft[0].name === chipOnTop[1].name ){
    // bottom left
    x3Coord = chipOnLeft[0].width - 30;
  }

  if( overlappingChips (pair) ){
    x1Coord = chipOnLeft[0].width - (chipOnLeft[0].width/2);
    x3Coord = sectionWidth - chipOnLeft[1].width + (chipOnLeft[1].width/2);
  }

  x2Coord = x1Coord + 16;
  x4Coord = x3Coord + 16;
  y2Coord = sectionHeight - 16;

  const boxA = section.rect(0, 0, sectionWidth, sectionHeight).attr({
    fill: "none",
    stroke: "orange"
  });

  placeNode(x1Coord, y1Coord, section);
  placeNode(x2Coord, y1Coord, section);
  placeNode(x3Coord, y2Coord, section);
  placeNode(x4Coord, y2Coord, section);

  connectorLine(x1Coord, y1Coord+3, x3Coord, y2Coord-3, 4, section, pair);
  connectorLine(x2Coord, y1Coord+3, x4Coord, y2Coord-3, -4, section, pair);
}

function connectorLine(xStart, yStart, xEnd, yEnd, offset, section, pair){
  const midpoint = ((yEnd - yStart-offset)/2)-10;
  let updatedXstart = xStart-midpoint;
  let updatedXend = xEnd+midpoint+offset;
  let adjustedOffset = 0;

  if ( xEnd > xStart ){
    updatedXstart = xStart+midpoint+offset;
    updatedXend = xEnd-midpoint-offset;
    adjustedOffset = offset;
  }

  const turn1x = xStart;
  const turn1y = yStart + 10;

  let turn2x = updatedXstart;
  const turn2y = turn1y+midpoint+adjustedOffset;

  let turn3x = updatedXend+adjustedOffset;
  const turn3y = turn2y;

  let turn4x = xEnd;
  const turn4y = yEnd-10;

  if( overlappingChips (pair) ){
    turn2x = turn1x;
    turn3x = turn1x;
    turn4x = turn1x;
  }

  const line = section.polyline([
    xStart, yStart,
    turn1x, turn1y,
    turn2x, turn2y,
    turn3x, turn3y,
    turn4x, turn4y,
    xEnd, yEnd
  ]).attr({
    stroke: "blue",
    strokeWidth: "2",
    fill: "none"
  });
}

function createCircuitSection( pair, s ){
  const legHeight = 15;
  const height = sectionHeight(pair, legHeight);
  const width = sectionWidth(pair, legHeight);
  const yCoord = sectionYcoord(pair, legHeight);
  const xCoord = sectionXcoord(pair, legHeight);

  const section = Snap(width, height).attr({
    x: xCoord,
    y: yCoord
  });

  connectorNodes(section, pair, width, height);
  s.prepend(section);
}

function connector( options ){

  const s = Snap("#board");
  pairList = connectedPairs(options);

  for ( let i = 0; i < pairList.length; i++ ){
    createCircuitSection(pairList[i], s);
  }

}

function drawCircuit( options ){
  console.log("drawCircuit was called");
  connector(options);
  for( let i = 0; i < options.length; i++ ){
    microchip(options[i]);
  }
}


drawCircuit(
   [
      {
        "name": "HTML",
        "width": 108,
        "height": 64,
        "xCoord": 540,
        "yCoord": 80,
        "connect": "Webpack"
      },
      {
        "name": "Webpack",
        "width": 188,
        "height": 92,
        "xCoord": 240,
        "yCoord": 250
      },
      {
        "name": "CSS",
        "width": 92,
        "height": 64,
        "xCoord": 15,
        "yCoord": 120,
        "connect": "Webpack"
      },
      {
        "name": "SASS",
        "width": 92,
        "height": 64,
        "xCoord": 50,
        "yCoord": 450,
        "connect": "Webpack"
      },
      {
        "name": "React",
        "width": 92,
        "height": 64,
        "xCoord": 550,
        "yCoord": 450,
        "connect": "Webpack"
      },
      {
        "name": "Javascript",
        "width": 124,
        "height": 64,
        "xCoord": 272,
        "yCoord": 80,
        "connect": "Webpack"
      }
    ]
);
