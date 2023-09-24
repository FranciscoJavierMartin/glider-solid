/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import AuthProvider from './context/auth';
import App from './App';
import './index.css';

const root = document.getElementById('root');

render(
  () => (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  ),
  root!
);
