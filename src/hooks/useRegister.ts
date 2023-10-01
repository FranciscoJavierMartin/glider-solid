import { registerUser } from '../api/auth';
import { RegisterForm } from '../types/form';

const useRegister = () => {
  const register = async (registerForm: RegisterForm) => {
    const user = await registerUser(registerForm);
    console.log(user);
  };

  return { register };
};

export default useRegister;
