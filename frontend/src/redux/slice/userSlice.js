// Redux Toolkit's createSlice function - a helper that generates action creators and reducers automatically
import { createSlice } from '@reduxjs/toolkit';

/**
 * This manages the user authentication state for the BrewLog application.
 * It uses Redux Toolkit's createSlice to define the user reducer and actions.
 * All user-related state (login status, user data, errors) is centralized here.
 */

// Initial state for the user reducer
// This is what the user state looks like when the app first loads
const initialState = {
  currentUser: null, // Stores the logged-in user's data (null if not logged in)
  error: null, // Stores any authentication error messages
  loading: null, // Tracks whether an auth request is in progress
};

/**
 * createSlice generates:
 - Action creators (signInStart, signInSuccess, etc.)
  - A reducer function that handles these actions
 */
const userSlice = createSlice({
  name: 'user', // Name of the slice (used in Redux DevTools)
  initialState, // Starting state defined above
  reducers: {
    // Action 1: Called when sign-in request starts
    // Sets loading to true to show a loading spinner, clears any previous errors
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Action 2: Called when sign-in succeeds
    // Stores the user data, stops loading, and clears errors
    signInSuccess: (state, action) => {
      state.currentUser = action.payload; // action.payload contains the user data from the server
      state.loading = false;
      state.error = null;
    },

    // Action 3: Called when sign-in fails
    // Stops loading and stores the error message to display to the user
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // action.payload contains the error message
    },

    // Action 4: Called when user signs out
    // Clears all user data from the store
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
  },
});

// Export the action creators
// These are used to dispatch actions from components to update the Redux store
export const { signInStart, signInSuccess, signInFailure, signOutSuccess } =
  userSlice.actions;

// Export the reducer function
// This is imported in the Redux store configuration to manage user state
export default userSlice.reducer;
