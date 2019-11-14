/* eslint-disable no-undef */
const { assert } = require('chai');

const run1 = () => 'run';

describe('1st Test', () => {
  it('should run', () => {
    assert.equal(run1(), 'run');
  });
});
