import React from 'react';
import './Components.css';

const Objects = ({ boxes, imageUrl }) => {
  var objectsArray = [];
  for (var i = 0; i < 20; i++) {
    var valueNum = boxes[i].value * 100;
    var name = boxes[i].name;
    var value = Math.round(valueNum);
    objectsArray.push(<p>{name}</p>);
    objectsArray.push(<p>{value}%</p>);
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
        <p className="heading-label">Objects and concepts identified:</p>
        <div className="scrollbar">
          <div className="force-overflow" id="style-1">
        <div className="parent">{objectsArray}</div>
        </div>
        </div>
      </ul>
    </div>
  );
};
export default Objects;
