import '@testing-library/jest-dom';

module.exports = {
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.scss$': 'jest-scss-transform',
  },
};
