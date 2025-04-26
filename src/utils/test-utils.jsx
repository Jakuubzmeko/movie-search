import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import favoritesReducer from '../store/favoritesSlice';
import searchReducer from '../store/searchSlice';

const renderWithProviders = (
  ui,
  {
    preloadedState = {},

    store = configureStore({
      reducer: {
        favorites: favoritesReducer,
        search: searchReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => {
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

// Re-export everything from testing-library
export * from '@testing-library/react';
// Override the render method
export { renderWithProviders as render };
