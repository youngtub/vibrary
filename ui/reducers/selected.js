const selected = (state = {}, action) => {
  switch(action.type) {
    case 'SELECTED':
      return Object.assign({}, state, action.obj);
    default:
      return state;
  }
}

export default selected;
