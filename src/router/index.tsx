import { lazy } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import HomeScreen from '../screens/Home';
const LoginScreen = lazy(() => import('../screens/Login'));
const RegisterScreen = lazy(() => import('../screens/Register'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' component={HomeScreen} />
      <Route path='/auth/login' component={LoginScreen} />
      <Route path='/auth/register' component={RegisterScreen} />
    </Routes>
  );
};

export default AppRoutes;
