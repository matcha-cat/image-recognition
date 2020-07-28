import React from 'react';
import './Components.css';

const DetectBox = ({ boxes, imageUrl, myHeight, myWidth }) => {
  const height = myHeight;
  const width = myWidth;
  var boxesArray = [];
  var boxesNum = boxes.length;
  for (var i = 0; i < boxesNum; i++) {
    var leftCol = boxes[i].region_info.bounding_box.left_col * width;
    var topRow = boxes[i].region_info.bounding_box.top_row * height;
    var rightCol = width - boxes[i].region_info.bounding_box.right_col * width;
    var bottomRow =
      height - boxes[i].region_info.bounding_box.bottom_row * height;
    console.log(leftCol, topRow);
    boxesArray.push(
      <div
        className="bounding-box-f"
        style={{
          top: topRow,
          right: rightCol,
          bottom: bottomRow,
          left: leftCol,
        }}
      ></div>
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
    </div>
  );
};
export default DetectBox;
