import { oneOf, deepCopy } from '@/utils/assist';

describe('Utils Assist', () => {
  it('oneOf 1', () => {
    const isOneOf = oneOf('', []);
    expect(isOneOf).to.false;
  });

  it('oneOf 2', () => {
    const isOneOf = oneOf('b', ['a']);
    expect(isOneOf).to.false;
  });

  it('deepCopy array', () => {
    let arr = [1, 2, 3];
    let arr2 = deepCopy(arr);
    expect(arr.toString()).to.equal(arr2.toString());
  });

  it('deepCopy obj', () => {
    let obj = {
      name: 'cobish',
      age: 12
    };
    let obj2 = deepCopy(obj);
    expect(JSON.stringify(obj)).to.equal(JSON.stringify(obj2));
  });
});