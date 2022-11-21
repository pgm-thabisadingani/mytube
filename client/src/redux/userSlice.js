import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

// reducer are function we want to use
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // this fuction takes the state and changes its inital value
    // action is not necessary
    loginStart: (state) => {
      state.loading = true;
    },
    // if its successfully means we have a currentUser, add an action and payload
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      // false coz we have results
      state.loading = false;
      state.error = action.payload;
    },
    // for the log out funtion
    logout: (state) => {
      //: reset to initial state
      state.currentUser = null;
      state.loading = false;
      state.error = true;
    },
    subscription: (state, action) => {
      //action.payload : channel id
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        // if not subscribed add channelId to user
        state.currentUser.subscribedUsers.push(action.payload);
      }
    },
  },
});

// export the userSlice fucntions
export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions;

// export the userSlice reducer
export default userSlice.reducer;
