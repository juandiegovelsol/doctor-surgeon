// reducers/userReducer.js
const initialUserState = {
  user: null,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "SET_USER_SESSION":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
