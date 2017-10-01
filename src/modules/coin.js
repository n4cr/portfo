/**
 * Created by nasir on 30/09/2017.
 */

export const LOAD_COINS = 'coin/LOAD_COINS';
export const LOAD_COIN_LIST_SUCCESS = 'coin/LOAD_COIN_LIST_SUCCESS';
export const LOAD_COIN_SUCCESS = 'coin/LOAD_COIN_SUCCESS';
export const CHANGE_CURRENCY = 'coin/CHANGE_CURRENCY';

const initialState = {
  list: [],
  selected: {},
  currency: 'USD'
}
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COIN_LIST_SUCCESS:
      return {
        ...state,
        list: action.data
      };
    case LOAD_COIN_SUCCESS:
      return {
        ...state,
        selected: action.selected
      }
    case CHANGE_CURRENCY:
      return {
          ...state,
        currency: action.currency
      }
    default:
      return state
  }
}

export const loadCoinList = (curr = '') => {
  return dispatch => {
    // now load coins and then dispatch
    window.axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=20&convert=${curr}`).then((response) => {
      dispatch({
        type: LOAD_COIN_LIST_SUCCESS,
        data: response.data
      })
    }).catch(function (error) {
      console.log(error);
    });
  }
}

export const loadCoin = (id) => {
  return dispatch => {
    // now load coins and then dispatch
    window.axios.get(`https://api.coinmarketcap.com/v1/ticker/${id}/`).then((response) => {
      dispatch({
        type: LOAD_COIN_SUCCESS,
        selected: response.data[0]
      })
    }).catch(function (error) {
      console.log(error);
    });
  }
}

export const changeCurrency = (curr) => {
  return dispatch => {
    dispatch({
      type: CHANGE_CURRENCY,
      currency: curr
    })
  }
}