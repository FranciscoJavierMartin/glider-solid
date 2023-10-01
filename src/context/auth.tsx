import {
  ParentComponent,
  Show,
  createContext,
  onMount,
  useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from '../components/utils/Loader';
import { User } from '../types/user';
import { firebaseAuth } from '../db';

type AuthStateContextValues = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
};

const initialState = () => ({
  isAuthenticated: false,
  isLoading: true,
  user: null,
});

const AuthStateContext = createContext<AuthStateContextValues>();

export const useAuthState = () => useContext(AuthStateContext);

const AuthProvider: ParentComponent = (props) => {
  const [store, setStore] = createStore(initialState());

  onMount(async () => {
    setStore('isLoading', true);
    listenToAuthChanges();
  });

  const listenToAuthChanges = () => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setStore('isAuthenticated', true);
        setStore('user', user as any);
      } else {
        setStore('isAuthenticated', false);
        setStore('user', null);
      }

      setStore('isAuthenticated', false);
    });
  };

  return (
    <AuthStateContext.Provider value={store}>
      <Show when={!store.isLoading} fallback={<Loader size={100} />}>
        {props.children}
      </Show>
    </AuthStateContext.Provider>
  );
};

export default AuthProvider;
