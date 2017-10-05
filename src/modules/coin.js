/**
 * Created by nasir on 30/09/2017.
 */

export const LOAD_COINS = 'coin/LOAD_COINS';
export const LOAD_COIN_LIST_SUCCESS = 'coin/LOAD_COIN_LIST_SUCCESS';
export const LOAD_COIN_SUCCESS = 'coin/LOAD_COIN_SUCCESS';
export const CHANGE_CURRENCY = 'coin/CHANGE_CURRENCY';
export const LOAD_COIN_CHART_DATA_SUCCESS = 'coin/LOAD_COIN_CHART_DATA_SUCCESS'

const initialState = {
  list: [],
  chartData: [],
  selected: {},
  currency: 'USD',
  pair: '',
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
        selected: action.selected,
        pair: action.selected['symbol'] + state.currency,
      }
    case CHANGE_CURRENCY:
      return {
        ...state,
        currency: action.currency,
      }
    case LOAD_COIN_CHART_DATA_SUCCESS:
      return {
        ...state,
        chartData: action.data
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
};

export const loadCoin = (id, curr = '') => {
  return dispatch => {
    // now load coins and then dispatch
    window.axios.get(`https://api.coinmarketcap.com/v1/ticker/${id}/?convert=${curr}`).then((response) => {
      const coin = response.data[0];
      dispatch({
        type: LOAD_COIN_SUCCESS,
        selected: coin
      });

      dispatch(clearChart());
      dispatch(loadCoinChartData(coin.symbol, 14400));

    }).catch(function (error) {
      console.log(error);
    });
  }
};

export const changeCurrency = (curr) => {
  return dispatch => {
    dispatch({
      type: CHANGE_CURRENCY,
      currency: curr
    })
  }
};


export const loadCoinChartData = (coin, period) => {
  return dispatch => {
    // TODO: adjust the 
    window.axios.get(`https://poloniex.com/public?command=returnChartData&currencyPair=USDT_${coin}&start=1502699200&end=9999999999&period=${period}`).then((response) => {
      if (response.data.error) {
        // TODO: Handle the error in a better way
        dispatch({
          type: LOAD_COIN_CHART_DATA_SUCCESS,
          data: []
        })
      } else {
        dispatch({
          type: LOAD_COIN_CHART_DATA_SUCCESS,
          data: response.data
        })
      }
    })
  }
};

export const clearChart = () => {
  return dispatch => {
    dispatch({
      type: LOAD_COIN_CHART_DATA_SUCCESS,
      data: [] // success with an empty list
    })
  }
};