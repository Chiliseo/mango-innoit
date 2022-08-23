import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import './RangeLine.scss';

const Line = styled.div`
  width: 100%;
  height: 4px;
  background-color: #000;
  position: absolute;
  border-radius: 2px;
`;
const RangeLine = props => {
  const { ranges, max } = props;
  const getPercentage = value => {
    return Math.round(((value + 18) / max) * 100).toFixed(2);
  };
  return (
    <Line>
      <div className='container-vertical-bar position-relative w-100'>
        {ranges.map((range, index) => {
          const position = getPercentage(range);
          return (
            <span
              key={index}
              className='verticalBar'
              style={{
                left: position + '%',
                transform: `translate(-${position}%,-50% )`
              }}
            />
          );
        })}
      </div>
    </Line>
  );
};
RangeLine.propTypes = {
  ranges: PropTypes.array,
  max: PropTypes.number
};
RangeLine.defaultProps = {
  ranges: [1000, 2000, 3000, 8000]
};

export default RangeLine;
