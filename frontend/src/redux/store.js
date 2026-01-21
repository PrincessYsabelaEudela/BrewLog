import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

/**
 * This sets up the Redux store with persistence.
 * Redux Toolkit's configureStore creates the central state container.
 * Redux-persist automatically saves and restores the state from localStorage.
 */

// Combine all reducers into a single root reducer
// This merges all different slices (user, etc.) into one state object
const rootReducer = combineReducers({
  user: userReducer, // The user authentication reducer
});

// Configuration for redux-persist to save state to localStorage
const persistConfig = {
  key: 'root', // localStorage key where state is saved
  storage, // Use browser localStorage
  version: 1, // Version for migrations
};

// Wrap the rootReducer with persistReducer to enable persistence
// This makes Redux automatically save state changes to localStorage
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer

  // Configure middleware
  middleware: (getDefaultMiddleware) => {
    // Disable serializableCheck because redux-persist stores non-serializable data
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

// Create a persistor object that handles rehydrating (restoring) state from localStorage
// This needs to be passed to PersistGate in your main.jsx or App.jsx
export const persistor = persistStore(store);
