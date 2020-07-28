import React from 'react';
import './Components.css';

const Colors = ({ boxes, imageUrl }) => {
  var colorsArray = [];
  colorsArray.push(<p>Color</p>);
  colorsArray.push(<p></p>);
  var boxesNum = boxes.length;
  for (var i = 0; i < boxesNum; i++) {
    var hex = boxes[i].raw_hex;
    var valueNum = boxes[i].value * 100;
    var value = Math.round(Number(valueNum));
    colorsArray.push(
      <p style={{ backgroundColor: hex }}>
        <span className="marked">{hex}</span>
      </p>
    );
    colorsArray.push(<p>{value}%</p>);
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
      </div>
      <ul className="table">
        <p className="heading-label">Colors identified:</p>
        <div class="parent">{colorsArray}</div>
      </ul>
    </div>
  );
};
export default Colors;
