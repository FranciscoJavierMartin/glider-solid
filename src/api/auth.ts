import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { AuthForm, RegisterForm } from '../types/form';
import { db, firebaseAuth } from '../db';
import { User } from '../types/user';

export type AuthType = 'register' | 'login';

const register = async (form: RegisterForm) => {
  const { user: registeredUser } = await createUserWithEmailAndPassword(
    firebaseAuth,
    form.email,
    form.password
  );

  const user: User = {
    uid: registeredUser.uid,
    fullName: form.fullName,
    nickName: form.nickName,
    email: form.email,
    avatar: form.avatar,
    followers: [],
    following: [],
    followersCount: 0,
    followingCount: 0,
  };

  await setDoc(doc(db, 'users', registeredUser.uid), user);
  return registeredUser;
};

const login = async (loginForm: AuthForm) => {
  const { user } = await signInWithEmailAndPassword(
    firebaseAuth,
    loginForm.email,
    loginForm.password
  );

  return user;
};

const authenticate = async (form: AuthForm, type: AuthType) => {
  return type === 'login' ? login(form) : register(form as RegisterForm);
};

const logout = () => {
  return signOut(firebaseAuth);
};

const getUser = async (uid: string): Promise<User> => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as User;
};

export { authenticate, register, login, logout, getUser };
