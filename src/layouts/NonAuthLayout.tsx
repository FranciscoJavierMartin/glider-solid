import { Component, onMount } from 'solid-js';
import { Outlet, useNavigate } from '@solidjs/router';
import { useAuthState } from '../context/auth';

const NonAuthLayout: Component = () => {
  const authState = useAuthState()!;
  const navigate = useNavigate();

  onMount(() => {
    if (authState.isAuthenticated) {
      navigate('/', { replace: true });
    }
  });

  return <Outlet />;
};

export default NonAuthLayout;
