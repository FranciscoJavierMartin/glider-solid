import {
  ParentComponent,
  Show,
  createContext,
  onMount,
  useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { useLocation, useNavigate } from '@solidjs/router';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from '../components/utils/Loader';
import { User } from '../types/user';
import { firebaseAuth } from '../db';
import { getUser } from '../api/auth';

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
  const [store, setStore] = createStore<AuthStateContextValues>(initialState());
  const location = useLocation();
  const navigate = useNavigate();

  onMount(async () => {
    setStore('isLoading', true);
    listenToAuthChanges();
  });

  const listenToAuthChanges = () => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (!!user) {
        const glideUser = await getUser(user.uid);

        setStore('isAuthenticated', true);
        setStore('user', glideUser);

        if (location.pathname.includes('/auth')) {
          navigate('/', { replace: true });
        }
      } else {
        setStore('isAuthenticated', false);
        setStore('user', null);
      }

      setStore('isLoading', false);
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
