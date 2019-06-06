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

function connectorNodes ( section, pair, sectionWidth, sectionHeight ){
  // first pair of nodes will start from left to right
  // method will create 4 nodes - 2 for each microchip

  const chipOnLeft = findPosition(pair, "x");
  const chipOnTop = findPosition(pair, "y");

  let x1Coord = 0;
  let x2Coord = 0;
  let x3Coord = 0;
  let x4Coord = 0;
  let y1Coord = 0;
  let y2Coord = 0;
  let y3Coord = 0;
  let y4Coord = 0;

  // is microchip on bottom left - second on top right
  // is microchip on top left - second on bottom right

  // FIXME - connector nodes to be placed close to the connecting chip 
  if (chipOnLeft[0].name === chipOnTop[0].name){
    // top left
    x1Coord = 14;
    y1Coord = 14;
    x3Coord = sectionWidth - chipOnLeft[1].width + 14;
  } else if ( chipOnLeft[1].name === chipOnTop[0].name ){
    // top right
    x1Coord = 14 + sectionWidth - chipOnLeft[1].width; // fixme - 14 - need to properly calculate that value
    x3Coord = 14;

    y1Coord = 16;

  }

  x2Coord = x1Coord + 16;
  x4Coord = x3Coord + 16;
  y2Coord = sectionHeight - 16;

  const boxA = section.rect(0, 0, sectionWidth, sectionHeight).attr({
    fill: "none",
    stroke: "orange"
  });

  // console.log("pair ", pair);
  const node = section.circle(x1Coord, y1Coord, 4).attr({
    stroke: "blue",
    strokeWidth: "2",
    fill: "none"
  });
  const node2 = section.circle(x2Coord, y1Coord, 4).attr({
    stroke: "blue",
    strokeWidth: "2",
    fill: "none"
  });
  const node3 = section.circle(x3Coord, y2Coord, 4).attr({
    stroke: "blue",
    strokeWidth: "2",
    fill: "none"
  });
  const node4 = section.circle(x4Coord, y2Coord, 4).attr({
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

  // Fixme - pair of connected microchips should be taken from options

  // "name": "SASS",
  // "width": 92,
  // "height": 92,
  // "xCoord": 50,
  // "yCoord": 450,
  // "connect": ["Webpack"]

  // {
  //   "name": "Webpack",
  //   "width": 332,
  //   "height": 108,
  //   "xCoord": 300,
  //   "yCoord": 250
  // },

  // Sass to webpack (as example)
  // x coord - start of scss box
  // y coord - end of webpack box
  // width:  ( webpack x coord + webpack width ) - scss x coord
  // height: (scss box y coord ) - (webpack y coord right + webpack height)
  const sccstowW =(300 + 332) - 50;
  const sccstowH = 450 - (250 + 108);

  const scssWebpack = Snap(sccstowW, sccstowH).attr({x:50+15,y:250+108+15}); // x - start of scss box
  scssWebpack.rect(0, 0, sccstowW, sccstowH).attr({stroke: "orange", fill: "none"});

  // start of circuit connector
  scssWebpack.circle(30, sccstowH-15, 4);
  scssWebpack.circle(46, sccstowH-15, 4);

  // end of circuit connector
  scssWebpack.circle(sccstowW-332+30, 15, 4);
  scssWebpack.circle(sccstowW-332+46, 15, 4);

  // connectors should be parallel or perpendicular to x and y
  // Polyline and start / end areas for connectors should be calculated
  // dynamically, based on microchip positions

  scssWebpack.polyline(
    [
      sccstowW-332+30, 15,
      sccstowW-332+30, 35,
      30, 35,
      30, sccstowH-15
    ]
  ).attr({stroke:"black", fill: "none", strokeWidth: "2"});

  scssWebpack.polyline(
    [
      sccstowW-332+46, 15,
      sccstowW-332+46, 40,
      46, 40,
      46, sccstowH-15
    ]
  ).attr({stroke:"black", fill: "none", strokeWidth: "2"});


  // s.add(scssWebpack);
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
        "height": 108,
        "xCoord": 500,
        "yCoord": 50,
        "connect": "Webpack"
      },
      {
        "name": "Webpack",
        "width": 332,
        "height": 108,
        "xCoord": 250,
        "yCoord": 250
      },
      {
        "name": "CSS",
        "width": 92,
        "height": 92,
        "xCoord": 15,
        "yCoord": 100,
        "connect": "Webpack"
      },
      {
        "name": "SASS",
        "width": 92,
        "height": 92,
        "xCoord": 50,
        "yCoord": 450,
        "connect": "Webpack"
      }
    ]
);
