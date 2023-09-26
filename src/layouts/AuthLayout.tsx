import { Component, onMount } from 'solid-js';
import { Outlet, useNavigate } from '@solidjs/router';
import { useAuthState } from '../context/auth';

const AuthLayout: Component = () => {
  const authState = useAuthState()!;
  const navigate = useNavigate();

  onMount(() => {
    console.log('Login out');

    if (!authState.isAuthenticated) {
      console.log('Login in');
      navigate('/auth/login', { replace: true });
    }
  });

  return !authState.isAuthenticated ? null : <Outlet />;
};

export default AuthLayout;
