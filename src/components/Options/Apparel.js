import React from 'react';
import './Components.css';

const Apparel = ({ boxes, imageUrl, myHeight, myWidth }) => {
  const height = myHeight;
  const width = myWidth;
  var boxesArray = [];
  var boxesNum = boxes.length;
  var apparelArray = [];
  for (var p = 0; p < boxesNum; p++) {
    var conceptsLength = boxes[p].data.concepts.length;
    apparelArray.push(<p className="heading-label">#{p + 1}</p>);
    apparelArray.push(<p> </p>);

    for (var k = 0; k < conceptsLength; k++) {
      var name1 = boxes[p].data.concepts[k].name;
      var valueNum = boxes[p].data.concepts[k].value * 100;
      var value1 = Math.round(Number(valueNum));
      apparelArray.push(<p>{name1}</p>);
      apparelArray.push(<p>{value1}%</p>);
    }
  }

  for (var i = 0; i < boxesNum; i++) {
    var leftCol = boxes[i].region_info.bounding_box.left_col * width;
    var topRow = boxes[i].region_info.bounding_box.top_row * height;
    var rightCol = width - boxes[i].region_info.bounding_box.right_col * width;
    var bottomRow =
      height - boxes[i].region_info.bounding_box.bottom_row * height;
    boxesArray.push(
      <div
        className="bounding-box-d"
        style={{
          top: topRow,
          right: rightCol,
          bottom: bottomRow,
          left: leftCol,
        }}
      >
        <p className="item-label">#{i + 1}</p>
      </div>
    );
  }

  return (
    <div className="components-content">
      <div className="myImage">
        <img
          id="inputimage"
          alt=""
          src={imageUrl}
          width="500px"
          height="auto"
        />
        <div className="myBoxes">{boxesArray}</div>
      </div>
      <ul className="table">
        <p className="heading-label">Apparel items identified:</p>
        <div className="scrollbar">
          <div className="force-overflow" id="style-1">
        <div className="parent">{apparelArray}</div>
        </div>
        </div>
      </ul>
    </div>
  );
};
export default Apparel;
