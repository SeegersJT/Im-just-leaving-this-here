import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { store, persistor } from 'redux/Store.redux';
import ThemeCustomization from '_old/themes'; // TODO: Add to current project
import ScrollTop from '_old/components/ScrollTop'; // TODO: Add to current project

// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeCustomization>
        <ScrollTop>
          <App />
        </ScrollTop>
      </ThemeCustomization>
    </PersistGate>
  </ReduxProvider>
);
