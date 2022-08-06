import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { purchasesReducer } from './reducers/purchasesReducer'
import { productsReducer } from './reducers/productsReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { customersReducer } from './reducers/customersRuducer'

const rootReducer = combineReducers({
  purchasesReducer: purchasesReducer,
  productsReducer: productsReducer,
  customersReducer:customersReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
