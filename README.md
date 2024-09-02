# Content Platform

This project is a React application that displays photos fetched from the Unsplash API. It features a responsive masonry grid layout, infinite scrolling, error handling with error boundaries, and a search functionality to filter photos.

## Table of Contents

- [Installation](#installation)
- [Design Decisions](#design-decisions)
- [Performance Optimization](#performance-optimization)
- [Learn More](#learn-more)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/GNarek/content-platform.git
   cd ./content-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**

   - In the `.env.local` file in the root directory of the project add your Unsplash API key:

   ```bash
   REACT_APP_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
   ```

   4. **Start the development server:**

   ```bash
   npm start
   ```

Open http://localhost:3000 to view it in the browser.

### Building the Project

To create a production build of the application:

```bash
 npm run build
```

This will build the app for production to the build folder.
It bundles React in production mode and optimizes the build for the best performance.
The build is minified, and the filenames include hashes for cache-busting.

### Running Tests

You can run the test suite using:

```bash
 npm test
```

This launches the test runner in interactive watch mode.
You can also run specific tests or configure your testing environment as needed.

## Design Decisions

### Error Handling

To ensure that the application is resilient and provides a good user experience, we implemented error boundaries using the `react-error-boundary` library. This allows the application to catch and gracefully handle errors, displaying a fallback UI instead of crashing entirely.

### Responsive Design

The application features a responsive masonry grid layout for displaying photos. This was implemented using window width and custom logic to determine the size and position of photos based on their dimensions.

### Infinite Scrolling

To provide a seamless user experience, infinite scrolling was implemented. This allows users to continuously load more photos as they scroll down the page. The `useInfiniteQuery` hook from `@tanstack/react-query` was used to manage data fetching.

### Search Functionality

A search bar was added to allow users to filter photos based on a query. The search functionality uses debouncing to minimize unnecessary API calls, improving performance.

## Performance Optimization

### Virtualized List for Masonry Grid

To handle large data a virtualized list approach was implemented to only render photos that are visible on the screen. And background color is used as a placeholder.

### Image Positioning

Images are dynamically positioned in a responsive grid by calculating optimal placement to minimize gaps, based on their size and available space.

### Details View Optimizations

The `DetailView` component was optimized to enhance performance and user experience by implementing the following:

**Lazy Loading**: Initially loads a smaller image, followed by the high-resolution version once it's ready. This improves load times and ensures smooth transitions.

### Debouncing API Calls

To prevent excessive API calls, particularly during search input, we implemented debouncing using `lodash`. This delays the execution of the search function until the user has stopped typing for a set period, reducing the number of unnecessary requests.

### Error Boundaries

Error boundaries were implemented to catch and handle errors in the application, ensuring that users are presented with a friendly error message instead of a broken application.

### Lighthouse

Performance was monitored and optimized using Lighthouse.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
