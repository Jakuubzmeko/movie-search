# Movie App

A simple movie application built with React that allows users to search for movies, view details, and save favorites.

## Features

- Search for movies using the OMDb API
- View detailed information about selected movies
- Add/remove movies to favorites
- Persistent favorites storage on the client-side
- Infinite scrolling for search results
- Responsive design

## Technology Stack

- React
- Redux Toolkit for state management
- React Router for navigation
- Material UI for component styling
- Axios for API requests
- React Infinite Scroll for pagination

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/Jakuubzmeko/movie-search.git
cd movie-app
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create a .env file in the root directory with your OMDb API key:

```
VITE_OMDB_API_KEY=your_api_key_here
```

You can get an API key from [OMDb API](https://www.omdbapi.com/apikey.aspx)

## Available Scripts

### Development

```bash
npm run dev
# or
yarn dev
```

Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build

```bash
npm run build
# or
yarn build
```

Builds the app for production to the `dist` folder.

### Preview

```bash
npm run preview
# or
yarn preview
```

Serves the production build locally for preview.

### Testing

```bash
npm run test
# or
yarn test
```

Runs the test suite using Vitest.

```bash
npm run test:coverage
# or
yarn test:coverage
```

Generates a test coverage report.

## Project Structure

```
movie-app/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   ├── pages/          # App pages/routes
│   ├── services/       # API services
│   ├── store/          # Redux store setup
│   ├── utils/          # Utility functions
│   ├── App.jsx         # App component
│   └── main.jsx        # Entry point
├── .env                # Environment variables
├── index.html          # HTML template
└── package.json        # Project dependencies
```
