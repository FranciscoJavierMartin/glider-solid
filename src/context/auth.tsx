import { ParentComponent, createContext, onMount, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

type AuthStateContextValues = {
  isAuthenticated: boolean;
  isLoading: boolean;
};

const initialState = () => ({
  isAuthenticated: false,
  isLoading: true,
});

const AuthStateContext = createContext<AuthStateContextValues>();

export const useAuthState = () => useContext(AuthStateContext);

const AuthProvider: ParentComponent = (props) => {
  const [store, setStore] = createStore(initialState());

  onMount(async () => {
    try {
      await authenticateUser();
    } catch (error) {
    } finally {
      setStore('isLoading', false);
    }
  });

  const authenticateUser = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setStore('isAuthenticated', true);
        resolve(true);
      }, 1000);
    });
  };

  return (
    <AuthStateContext.Provider value={store}>
      {props.children}
    </AuthStateContext.Provider>
  );
};

export default AuthProvider;
