const TEST = (state = {}, action) => {
  switch(action.type) {
    case 'TEST':
      return Object.assign({}, state, action.obj);
    default:
      return state;
  }
}

export default TEST;
