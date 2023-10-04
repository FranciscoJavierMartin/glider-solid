/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import AuthProvider from './context/auth';
import UIProvider from './context/ui';
import App from './App';
import './index.css';

const root = document.getElementById('root');

render(
  () => (
    <Router>
      <UIProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UIProvider>
    </Router>
  ),
  root!
);
