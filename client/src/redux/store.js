// combineReducers will be use with persist
import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import the reducer function from the counter slice and add it to our store
import userReducer from './userSlice';
import videoReducer from './videoSlice';

// Prevent lost of data after refresshing e.g. basically storing the user Credetails in Localstorage that stores the dark mode or logged in user even after refresh
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// combined our reducer in-order to use persist
const rootReducer = combineReducers({ user: userReducer, video: videoReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* - By defining a field inside the reducer parameter, we tell the store to use this slice reducer function to handle all updates to that state.
   - we will use it in every component in our app 
 */
export const store = configureStore({
  reducer: persistedReducer,
  // use the middleware of we get an error
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// export the persistor
export const persistor = persistStore(store);

/*
OUR STORE ARCHITECTURE:

storage
-- user 
---- currentUser, loading, error
Basical we will have a Storage inside it we have a User, then out Intial states(user, loading, error)
If we ant to user state or loading we gonna go: storage.user.currentUser or storage.user.loading ...
*/
