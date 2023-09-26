import { Component, onMount } from 'solid-js';
import { Outlet, useNavigate } from '@solidjs/router';
import { useAuthState } from '../context/auth';

const AuthLayout: Component = () => {
  const authState = useAuthState()!;
  const navigate = useNavigate();

  onMount(() => {
    if (!authState.isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }
  });

  return !authState.isAuthenticated ? null : <Outlet />;
};

export default AuthLayout;
