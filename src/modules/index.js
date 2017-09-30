import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import account from './account'

export default combineReducers({
  routing: routerReducer,
  counter,
  account
})
