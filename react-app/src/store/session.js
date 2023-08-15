import {
  csrfFetch
} from './csrf';

// ****************************************************************************
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

// ****************************************************************************

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// ****************************************************************************
export const login = (user) => async (dispatch) => {
  const {
    email,
    password
  } = user;
  const response = await csrfFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};
// ****************************************************************************
export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

// ****************************************************************************
export const restoreUser = () => async (dispatch) => {
  const response = await fetch('/api/auth/');
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

// ****************************************************************************
export const signUp = (formData) => async (dispatch) => {

  // const {
  //   username,
  //   email,
  //   password,
  //   first_name,
  //   last_name,
  //   profile_image
  // } = user;

  console.log("ENTERED CREATE USER THUNK")
  console.log("PROFILE IMAGE IN CREATE USER THHUNK", formData.get("profile_image"))

debugger

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    // body: JSON.stringify({
    //   username,
    //   email,
    //   password,
    //   first_name,
    //   last_name,
    //   profile_image
    // }),
    body:formData
  });

  debugger

  if (response.ok) {
    console.log("RESPONSE IN USERTHUNK IS OK!!!!!!!!!!!!!!!")
    const {data }= await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
};

// ****************************************************************************
const initialState = {
  user: null
};

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};
// ****************************************************************************
export default sessionReducer;
