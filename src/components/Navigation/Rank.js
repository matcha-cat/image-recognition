import React from 'react';
import './Rank.css';

const Rank = ({ name, entries }) => {
  return (
    <div className="Rank">
      <div className="Rank-text">
        {`${name}, your current entry count is...`}
        <div className="f1">{entries}</div>
      </div>
    </div>
  );
};
export default Rank;
