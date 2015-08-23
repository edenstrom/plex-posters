export default function mediaReducer(state = {}, action) {
  switch(action.type) {
    case 'GET_MEDIA':
      return {
        ...state,
        [action.id]: action.res.data
      };
    case 'SELECT_POSTER':
      var id = action.id;
      var poster = action.res.data.poster;
      return setPoster(state, id, poster);
    default:
      return state;
  }
}

function setPoster(initState, id, poster) {
  var state = { ...initState };

  Object.keys(state).forEach(function(section) {
    if (typeof state[section] === 'object') {
      for (var item of state[section]) {
        if (`${item.ratingKey}` === id) {
          item.thumb = poster;
        }
      }
    }
  });

  return state;
}
