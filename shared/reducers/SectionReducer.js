import Immutable from 'immutable';

const defaultState = new Immutable.List();

export default function sectionReducer(state = defaultState, action) {
  switch(action.type) {
    case 'GET_SECTIONS':
      return state.concat(action.res.data);
    default:
      return state;
  }
}
