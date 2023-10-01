import { login } from '../api/auth';
import { AuthForm } from '../types/form';

const useLogin = () => {
  const loginUser = (loginForm: AuthForm) => {
    login(loginForm);
  };

  return { loginUser };
};

export default useLogin;
