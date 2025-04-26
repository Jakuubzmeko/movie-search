import { configureStore, combineReducers } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import searchReducer from './searchSlice';

// Create a function to add dynamic reducers
export const createReducer = (asyncReducers) => {
  return combineReducers({
    favorites: favoritesReducer,
    ...asyncReducers,
  });
};

// Initial store with search reducer preloaded
export const store = configureStore({
  reducer: createReducer({}),
});

// Make store globally accessible for debugging
if (typeof window !== 'undefined') {
  window.store = store;
}

// Function to inject reducers when needed (for any future lazy-loaded reducers)
export const injectReducer = (key, asyncReducer) => {
  if (store.asyncReducers === undefined) {
    store.asyncReducers = {};
  }

  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));

  return store;
};
