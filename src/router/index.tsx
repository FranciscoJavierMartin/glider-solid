import { lazy } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import NonAuthLayout from '../layouts/NonAuthLayout';
import AuthLayout from '../layouts/AuthLayout';
const LoginScreen = lazy(() => import('../screens/Login'));
const RegisterScreen = lazy(() => import('../screens/Register'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' component={AuthLayout}>
        <Route path='' component={HomeScreen} />
        <Route path='profile' component={ProfileScreen} />
      </Route>
      <Route path='/auth' component={NonAuthLayout}>
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
