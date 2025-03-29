import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './services/store';
import App from './components/app/app';
import Initializer from './Initializer';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Initializer>
        <App />
      </Initializer>
    </Provider>
  </React.StrictMode>
);
