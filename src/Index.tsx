import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App/App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found in the document');
}

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
