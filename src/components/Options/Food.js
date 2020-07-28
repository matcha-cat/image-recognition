import React from 'react';
import './Components.css';

const Food = ({ boxes, imageUrl }) => {
  var boxesNum = boxes.length;
  var foodArray = [];

  for (var p = 0; p < boxesNum; p++) {
    var name1 = boxes[p].name;
    var valueNum = boxes[p].value * 100;
    var value1 = Math.round(Number(valueNum));
    foodArray.push(<p>{name1}</p>);
    foodArray.push(<p>{value1}%</p>);
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
        <p className="heading-label">Food items identified:</p>
        <div className="scrollbar">
          <div className="force-overflow" id="style-1">
        <div className="parent">{foodArray}</div>
        </div>
        </div>
      </ul>
    </div>
  );
};
export default Food;
