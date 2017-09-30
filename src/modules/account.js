/**
 * Created by nasir on 30/09/2017.
 */


export const SIGNIN_SUCCESS = 'account/SIGNIN_SUCCESS';
export const SIGNOUT = 'account/SIGNOUT';

const initialState = {
  user: null,
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
    default:
      return state
  }
}

export const signinSuccess = (user) => {
  return dispatch => {
    dispatch({
      type: SIGNIN_SUCCESS,
      user: user
    })
  }
}

export const signout = () => {
  return dispatch => {
    dispatch({
      type: SIGNOUT
    })
  }
}
