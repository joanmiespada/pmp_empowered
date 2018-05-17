import {
    USER_GETALL_REQUEST, 
    USER_GETALL_RESPONSE, 
    USER_GETALL_FAIL
} from './actions';
  
  const reducers = (state = [], action) => {
    switch (action.type) {
      case USER_GETALL_REQUEST:
        return [
          ...state,
          {          
            loadingSpining: true,
          },
        ];
      case LOGIN_RESPONSE:
        return [
          ...state,
          {
            usersPage: action.users,
            loadingSpining: false,
          },
        ];
      case LOGIN_FAIL:
        return [
          ...state,
          {
            loadingSpining: false,
            error: action.error,
          },
        ];
      default:
        return state;
    }
  };
  export reducers;