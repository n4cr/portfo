/**
 * Created by nasir on 30/09/2017.
 */

export const LOAD_COINS = 'coin/LOAD_COINS';
export const LOAD_COINS_SUCCESS = 'coin/LOAD_COINS_SUCCESS'

const initialState = {
  list: []
}
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COINS_SUCCESS:
      return {
        ...state,
        list: action.data
      }
    default:
      return state
  }
}

export const loadCoins = () => {
  return dispatch => {
    // now load coins and then dispatch
    window.axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=20').then((response) => {
      dispatch({
        type: LOAD_COINS_SUCCESS,
        data: response.data
      })
    }).catch(function (error) {
      console.log(error);
    });
  }
}
