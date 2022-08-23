import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.span`
  padding: 0.5rem;
`;
const RangeLabel = props => {
  const { isRange } = props;
  const [Edit, setEdit] = useState(false);
  const inputRef = useRef(null);

  // click outside of input to close edit mode
  const handleClickOutside = e => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setEdit(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const setValue = e => {
    if (e.keyCode === 13) {
      setEdit(false);
      props.setValue(+e.target.value);
    }
  };
  return (
    <React.Fragment>
      <Label
        onClick={() => {
          !isRange && setEdit(!Edit);
        }}
        className='range-label'
      >
        {Edit ? (
          <input type='number' autoFocus onKeyDown={setValue} ref={inputRef} />
        ) : (
          <Label {...props}>{props.children}</Label>
        )}
      </Label>
    </React.Fragment>
  );
};
RangeLabel.propTypes = {
  children: PropTypes.node,
  setValue: PropTypes.func,
  isRange: PropTypes.bool
};

export default RangeLabel;
