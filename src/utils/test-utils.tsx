import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { Store } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import favoritesReducer from '../store/favoritesSlice';
import searchReducer from '../store/searchSlice';
import { RootState } from '../types';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: Store;
}

interface WrapperProps {
  children: ReactNode;
}

const renderWithProviders = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: combineReducers({
        favorites: favoritesReducer,
        search: searchReducer,
      }),
      preloadedState: preloadedState as Partial<RootState>,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

export * from '@testing-library/react';
export { renderWithProviders as render };
