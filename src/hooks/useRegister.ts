import { RegisterForm } from '../types/form';

const useRegister = () => {
  const register = (registerForm: RegisterForm) => {
    alert(JSON.stringify(registerForm));
  };

  return { register };
};

export default useRegister;
