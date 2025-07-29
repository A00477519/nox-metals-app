import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);


// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import './index.css';

// const queryClient = new QueryClient();

// // 1. Get the root element
// const container = document.getElementById('root');

// // 2. Assert it exists (TypeScript only)
// if (!container) throw new Error('Failed to find the root element');

// // 3. Create a root
// const root = createRoot(container);

// // 4. Render your app
// root.render(
//   <QueryClientProvider client={queryClient}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </QueryClientProvider>
// );