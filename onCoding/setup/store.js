//import rootReducer from './reducers/index';
// import AsyncStorage from '@react-native-community/async-storage';
import {AsyncStorage} from 'react-native';
import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

let reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  reducer: reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['data', 'tabbar'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer);

let persistor = persistStore(store);

export {store, persistor};
