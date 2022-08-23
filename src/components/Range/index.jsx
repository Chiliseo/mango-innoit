import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import RangeSelector from '../RangeSelector';
import './Range.scss';
import RangeLine from '../RangeLine';
import { useState } from 'react';
import RangeLabel from '../RangeLabel';

const Range = props => {
  // component multiple range slider without input range
  const { min, max, currentMin, currentMax, rangeValues } = props;
  const rangeComponentRef = useRef(null);
  const [State, setState] = useState({
    min: min,
    max: max,
    minValue: currentMin,
    maxValue: currentMax,
    dotsRange: [],
    currentMin: currentMin,
    currentMax: currentMax,
    actualPosition: {
      left: min,
      right: max
    }
  });
  useEffect(() => {
    if (currentMin && currentMax) {
      initCalculatePosition(currentMin, currentMax);
    }
  }, [currentMin, currentMax]);
  const initCalculatePosition = (min, max) => {
    const actualPosition = {
      left: ((min / State.max) * 100).toFixed(2),
      right: ((max / State.max) * 100).toFixed(2)
    };
    setState(prevState => ({
      ...prevState,
      currentMin: actualPosition.left,
      currentMax: actualPosition.right,
      actualPosition
    }));
  };
  const mousemove = e => {
    if (!State.moveAllowed) {
      return;
    }
    if (!State.selectedComponent) {
      return;
    }

    const positionType = State.selectedComponentRef.current.dataset.position;
    const { min, max, actualPosition } = State;
    let { minValue, maxValue } = State;
    const { offsetLeft, clientWidth } = rangeComponentRef.current;
    const { offsetWidth } = State.selectedComponentRef.current;
    const mouse = e.clientX;

    const position = ((mouse - offsetLeft) / clientWidth) * 100;
    const newPosition = Math.min(Math.max(position, min / 100), 100);
    const newValue = (newPosition * (max - min)) / 100 + min;
    let newPositionLeft = (((newValue - min) / (max - min)) * 100).toFixed(2);
    
    let newValueRange = 0;
    // move only ranges
    if (rangeValues) {
      // search position near to range
      const value = Math.round((newPositionLeft / 100) * State.max);
      var closest = rangeValues.reduce(function (prev, curr) {
        return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
      });
      newValueRange = closest;
      newPositionLeft = (newValueRange / State.max) * 100;
    }
    // console.log(newValue, newPosition, position);
    // console.log(newPositionLeft, newPositionRight);
    // console.log(actualPosition.left, actualPosition.right);
    // console.log(positionType);
    // console.log(offsetLeft, offsetWidth, clientWidth);
    // check is near to left or right
    if (positionType === 'left') {
      minValue = Math.round((newPositionLeft / 100) * State.max);
      if (rangeValues) {
        minValue = newValueRange;
      }
      if (newPositionLeft >= actualPosition.right) {
        return;
      }
    }
    if (positionType === 'right') {
      maxValue = Math.round((newPositionLeft / 100) * State.max);
      if (rangeValues) {
        maxValue = newValueRange;
      }
      if (newPositionLeft <= actualPosition.left) {
        return;
      }
    }
    State.selectedComponent.style.left = newPositionLeft + '%';
    actualPosition[positionType] = newPositionLeft;
    
    setState({
      ...State,
      minValue,
      maxValue,
      actualPosition
    });
  };
  const mouseup = () => {
    setState({ ...State, moveAllowed: false });
  };
  const mousedown = (e, selector) => {
    setState({
      ...State,
      selectedComponent: selector.current,
      selectedComponentRef: selector,
      moveAllowed: true
    });
  };

  return (
    <div>
      <p className='text-center'>
        Left Value: <b>{State.minValue}</b> Right Value: <b>{State.maxValue}</b>
      </p>
      <div className='container-range'>
        <RangeLabel
          setValue={val => {
            setState({ ...State, min: val });
          }}
          className='min'
          isRange={rangeValues ? true : false}
        >
          {State.min}
        </RangeLabel>
        <div
          className='range'
          ref={rangeComponentRef}
          onMouseMove={e => mousemove(e)}
          onMouseUp={mouseup}
        >
          <RangeSelector
            mousedown={mousedown}
            position={'left'}
            actualPosition={State.actualPosition}
          />
          <RangeLine min={State.min} max={State.max} ranges={rangeValues} />
          <RangeSelector
            mousedown={mousedown}
            position={'right'}
            actualPosition={State.actualPosition}
          />
        </div>
        <RangeLabel
          setValue={val => {
            setState({ ...State, max: val });
          }}
          className='max'
          isRange={rangeValues ? true : false}
        >
          {State.max}
        </RangeLabel>
      </div>
      <p className='text-center'>
        debug: {JSON.stringify(State.actualPosition)}
      </p>
    </div>
  );
};
Range.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  currentMin: PropTypes.number,
  currentMax: PropTypes.number,
  rangeValues: PropTypes.array
};
Range.defaultProps = {
  min: 10,
  max: 100,
  currentMin: 20,
  currentMax: 80
};

export default Range;
