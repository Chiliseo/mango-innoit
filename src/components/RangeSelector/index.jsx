import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SelectorDot = styled.div`
  width: 16px;
  height: 16px;
  background-color: #333;
  border-radius: 50%;
  position: absolute;
  z-index: 5;
  ${props => (props.position === 'left' ? `left: 0;` : `right: 0;`)}
  &:hover {
    cursor: grab;
  }
`
const RangeSelector = props => {
  const { position, mousedown, actualPosition, minValue, maxValue } = props
  const selector = useRef(null)

  return (
    <SelectorDot
      ref={selector}
      onMouseDown={e => mousedown(e, selector)}
      data-max-value={maxValue}
      data-min-value={minValue}
      data-actual-value={actualPosition[position]}
      data-position={position}
      {...props}
      style={{
        left: `${actualPosition[position]}%`
      }}
      data-toggle='tooltip'
    ></SelectorDot>
  )
}
RangeSelector.propTypes = {
  position: PropTypes.string,
  mousedown: PropTypes.func,
  actualPosition: PropTypes.object,
  minValue: PropTypes.number,
  maxValue: PropTypes.number
}

export default RangeSelector
