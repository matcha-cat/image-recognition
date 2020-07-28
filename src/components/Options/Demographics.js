import React from 'react';
import './Components.css';

const Demographics = ({ boxes, imageUrl, myHeight, myWidth }) => {
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
        <p className="item-label">Person {i + 1}</p>
      </div>
    );
  }
  var traitsArray = [];
  for (var p = 0; p < boxesNum; p++) {
    console.log(boxes[p].data.concepts);
    var conceptsLength = boxes[p].data.concepts.length;
    traitsArray.push(<p className="heading-label"> Person {p + 1}</p>);
    traitsArray.push(<p> </p>);

    for (var k = 0; k < 3; k++) {
      var name1 = boxes[p].data.concepts[k].name;
      var valueNum = boxes[p].data.concepts[k].value * 100;
      var value1 = Math.round(Number(valueNum));
      traitsArray.push(<p>{name1}</p>);
      traitsArray.push(<p>{value1}%</p>);
    }

    for (var j = 20; j < conceptsLength - 3; j++) {
      var name2 = boxes[p].data.concepts[j].name;
      var valueNum2 = boxes[p].data.concepts[j].value * 100;
      var value2 = Math.round(Number(valueNum2));
      traitsArray.push(<p>{name2}</p>);
      traitsArray.push(<p>{value2}%</p>);
    }
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
        <p className="heading-label">Demographics identified:</p>
        <div className="scrollbar">
          <div className="force-overflow" id="style-1">
        <div className="parent">{traitsArray}</div>
        </div>
        </div>
      </ul>
    </div>
  );
};
export default Demographics;

/*hkj
Object.data[0].regions[n].data.concepts[0,1,2] name value
*/
