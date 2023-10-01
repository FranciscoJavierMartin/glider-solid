import { createUserWithEmailAndPassword } from 'firebase/auth';
import { RegisterForm } from '../types/form';
import { firebaseAuth } from '../db';

const registerUser = (form: RegisterForm) => {
  return createUserWithEmailAndPassword(
    firebaseAuth,
    form.email,
    form.password
  );
};

export { registerUser };
