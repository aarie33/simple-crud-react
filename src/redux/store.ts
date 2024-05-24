import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers';

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(),
);

export type RootState = ReturnType<typeof rootReducer>;
export default store;