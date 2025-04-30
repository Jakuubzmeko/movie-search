import { configureStore, combineReducers, Reducer, AnyAction } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import searchReducer from './searchSlice';
import { RootState, ExtendedStore } from '../types';

export const createReducer = (
  asyncReducers: Record<string, Reducer>
): Reducer<RootState, AnyAction> => {
  return combineReducers({
    favorites: favoritesReducer,
    search: searchReducer,
    ...asyncReducers,
  }) as Reducer<RootState, AnyAction>;
};

// Initial store with reducers preloaded
export const store = configureStore({
  reducer: createReducer({}),
}) as ExtendedStore;

// Infer the `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;

// Make store globally accessible for debugging
if (typeof window !== 'undefined') {
  window.store = store;
  window.asyncReducers = {};
}

// Function to inject reducers when needed
export const injectReducer = (key: string, asyncReducer: Reducer): ExtendedStore => {
  if (window.asyncReducers) {
    window.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(window.asyncReducers));
  }
  return store;
};
