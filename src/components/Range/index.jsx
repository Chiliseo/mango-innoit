import React, { useEffect, useRef } from 'react'
import RangeSelector from '../RangeSelector'
import './Range.scss'
import RangeLine from '../RangeLine'
import { useState } from 'react'
import RangeLabel from '../RangeLabel'

const Range = props => {
  // component multiple range slider without input range
  const { min, max, currentMin, currentMax } = props
  const rangeComponentRef = useRef(null)
  const [State, setState] = useState({
    min: min,
    max: max,
    minValue: currentMin,
    maxValue: currentMax,
    pointsRange: [],
    currentMin: currentMin,
    currentMax: currentMax,
    actualPosition: {
      left: min,
      right: max
    }
  })
  useEffect(() => {
    if (currentMin && currentMax) {
      initCalculatePosition(currentMin, currentMax)
    }
  }, [currentMin, currentMax])
  const initCalculatePosition = (min, max) => {
    const actualPosition = {
      left: ((min / State.max) * 100).toFixed(2),
      right: ((max / State.max) * 100).toFixed(2)
    }
    setState(prevState => ({
      ...prevState,
      currentMin: actualPosition.left,
      currentMax: actualPosition.right,
      actualPosition
    }))
  }
  const mousemove = e => {
    if (!State.moveAllowed) {
      return
    }
    if (!State.selectedComponent) {
      return
    }

    const positionType = State.selectedComponentRef.current.dataset.position
    const { min, max, actualPosition } = State
    let { minValue, maxValue } = State
    const { offsetLeft, clientWidth } = rangeComponentRef.current
    const { offsetWidth } = State.selectedComponentRef.current
    const mouse = e.clientX

    const position = ((mouse - (offsetLeft + offsetWidth)) / clientWidth) * 100
    const newPosition = Math.min(Math.max(position, min / 100), 100)
    const newValue = (newPosition * (max - min)) / 100 + min
    const newPositionLeft = (((newValue - min) / (max - min)) * 100).toFixed(2)
    const newPositionRight = (((max - newValue) / (max - min)) * 100).toFixed(2)

    console.log(newPositionLeft, newPositionRight)
    console.log(actualPosition.left, actualPosition.right)
    console.log(positionType)
    console.log(offsetLeft, offsetWidth, clientWidth)
    const between = newPositionLeft - newPositionRight
    console.log(between)
    // check is near to left or right
    if (positionType === 'left') {
      minValue = Math.round(((newPositionLeft + offsetLeft) / 100) * State.max)
      if (newPositionLeft >= actualPosition.right) {
        // setState({ ...State, moveAllowed: false })
        return
      }
    }
    if (positionType === 'right') {
      maxValue = Math.round(((newPositionLeft + offsetLeft) / 100) * State.max)
      if (newPositionLeft <= actualPosition.left) {
        // setState({ ...State, moveAllowed: false })
        return
      }
    }

    // validate between cross
    // if (between > 0) {
    //   return
    // }
    State.selectedComponent.style.left = newPositionLeft + '%'

    // if (State.min < position || State.max < position) {
    //   setState({ ...State, moveAllowed: false })
    //   return
    // }
    actualPosition[positionType] = newPositionLeft
    // State.selectedComponent.style.left = `${position}%`
    setState({
      ...State,
      minValue,
      maxValue,
      actualPosition
    })
  }
  const mouseup = e => {
    setState({ ...State, moveAllowed: false })
  }
  const mousedown = (e, selector, position = 0) => {
    setState({
      ...State,
      selectedComponent: selector.current,
      selectedComponentRef: selector,
      moveAllowed: true
    })
  }
  const moveToLeft = (e, contentWith, contentLeftPosition, getValue) => {}
  const moveToRight = (e, contentWith, contentLeftPosition, getValue) => {}
  return (
    <div>
      <p className='text-center'>
        Left Value: <b>{State.minValue}</b> Right Value: <b>{State.maxValue}</b>
      </p>
      <div className='container-range'>
        <RangeLabel
          setValue={val => {
            setState({ ...State, min: val })
          }}
          className='min'
        >
          {State.min}
        </RangeLabel>
        <div
          className='range'
          ref={rangeComponentRef}
          onMouseMove={e => mousemove(e)}
          onMouseUp={e => mouseup(e)}
        >
          <RangeSelector
            mousedown={mousedown}
            position={'left'}
            actualPosition={State.actualPosition}
          />
          <RangeLine />
          <RangeSelector
            mousedown={mousedown}
            position={'right'}
            actualPosition={State.actualPosition}
          />
        </div>
        <RangeLabel
          setValue={val => {
            setState({ ...State, max: val })
          }}
          className='max'
        >
          {State.max}
        </RangeLabel>
      </div>
      <p className='text-center'>
        debug: {JSON.stringify(State.actualPosition)}
      </p>
    </div>
  )
}
Range.propTypes = {
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  currentMin: React.PropTypes.number,
  currentMax: React.PropTypes.number
}
Range.defaultProps = {
  min: 10,
  max: 100,
  currentMin: 20,
  currentMax: 80
}

export default Range
