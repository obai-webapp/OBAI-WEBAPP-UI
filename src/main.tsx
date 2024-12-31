import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("Root element with id 'root' not found.");
}

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
