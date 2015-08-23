var _ = require('lodash');

var initialState = { opened: false };

export default function posterReducer(state = initialState, action) {
  switch(action.type) {
    case 'LOAD_POSTERS':
      var tmp = {
        ...state,
        [action.id]: {
          posters: action.res.data,
          opened: true
        },
        opened: true
      };
      tmp = processOpened(tmp, action.id);
      tmp = addIdToState(tmp, action.id);
      return tmp;
    case 'CLOSE_POSTERS':
      var newState = { ...state, opened: false };
      return processOpened(newState, -1);
    case 'SELECT_POSTER':
      var tmp = {
        ...state,
        opened: false
      };

      tmp = processOpened(tmp, -1);
      tmp = setSelected(tmp, action.id);

      return tmp;
    default:
      return state;
  }
}

function processOpened(state, id) {
  Object.keys(state).forEach(function(key) {
    var item = state[key];

    if (typeof item === 'object') {
      if (key !== id) {
        item.opened = false;
      }
    }
  });

  return state;
}

function setSelected(state, id) {
  Object.keys(state).forEach(function(key) {
    var item = state[key];

    if (typeof item === 'object') {
      if (key === id) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      item.opened = false;
    }
  });

  return state;
}

function addIdToState(state, id) {
  Object.keys(state).forEach(function(key) {
    var item = state[key];

    if (typeof item === 'object') {
      if (key === id) {
        item.id = id;
      }
    }
  });

  return state;
}
