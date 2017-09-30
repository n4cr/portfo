/**
 * Created by nasir on 30/09/2017.
 */


export const SIGNIN_SUCCESS = 'account/SIGNIN_SUCCESS';
export const SIGNOUT = 'account/SIGNOUT';
export const LOAD_HOLDINGS = 'account/LOAD_HOLDINGS';
export const UPDATE_HOLDING = 'account/UPDATE_HOLDING'

export const STORAGE_FILE = 'portfo.json'

const initialState = {
  user: null,
  holding: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: action.user,
      }
    case SIGNOUT:
      return {
        ...state,
        user: null
      }
    case LOAD_HOLDINGS:
      return {
        ...state,
        holdings: action.holdings
      }
    case UPDATE_HOLDING:
      return {
        ...state,
        holdings: action.holdings,
      }
    default:
      return state
  }
}

export const signinSuccess = (user) => {

  return dispatch => {
    dispatch({
      type: SIGNIN_SUCCESS,
      user: user
    });
  }
}

export const signout = () => {
  window.blockstack.signUserOut(window.location.href)
  // return dispatch => {
  //   dispatch({
  //     type: SIGNOUT
  //   })
  // }
}


export const loadHoldings = () => {
  return dispatch => {
    const blockstack = window.blockstack;
    blockstack.getFile(STORAGE_FILE).then((holdings) => {
      const data = JSON.parse(holdings || '{}')
      dispatch({
        type: LOAD_HOLDINGS,
        holdings: data
      })
      console.log('holdings')
      console.log(holdings)
    })

  }
};


export const updateHoldings = () => {
  return dispatch => {
    const blockstack = window.blockstack;
    const data = { btc: 1.212 }
    blockstack.putFile(STORAGE_FILE, JSON.stringify(data))
    dispatch({
      type: UPDATE_HOLDING,
      holdings: data
    })
  }
};