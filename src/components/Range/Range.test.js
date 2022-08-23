/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Range } from '../index.js';

let props = {
  min: 10,
  max: 50,
  currentMin: 10,
  currentMax: 50,
};

describe('Range', () => {
  it('should render <Range/>', () => {
    render(<Range />);
    expect(true).toBeTruthy();
  });
  it('should min value be ' + props.min, () => {
    const { container } = render(<Range {...props} />);
    expect(+container.querySelector('.min').textContent).toBe(props.min);
  });
  it('should max value be ' + props.max, () => {
    const { container } = render(<Range {...props} />);
    expect(+container.querySelector('.max').textContent).toBe(props.max);
  });
});
