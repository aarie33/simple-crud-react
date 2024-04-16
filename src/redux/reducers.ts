// reducers.ts
import { combineReducers } from 'redux';

interface UserState {
  name: string;
  email: string;
  token: string | null;
}

const initialUserState: UserState = {
  name: '',
  email: '',
  token: localStorage.getItem('token') || null,
};

const userReducer = (state = initialUserState, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload };
    case 'LOGOUT':
      return initialUserState;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
