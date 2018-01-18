export const TEST = 'TEST';
export const SELECTED = 'SELECTED';

export const test = (obj) => ({
  type: TEST,
  obj
});

export const selected = (obj) => ({
  type: SELECTED,
  obj
})
