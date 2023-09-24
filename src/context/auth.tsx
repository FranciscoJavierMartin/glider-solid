import {
  Accessor,
  ParentComponent,
  Setter,
  createContext,
  createSignal,
  onCleanup,
  onMount,
  useContext,
} from 'solid-js';

type AuthStateContextValues = {
  isAuthenticated: Accessor<boolean>;
  isLoading: Accessor<boolean>;
  setIsAuthenticated: Setter<boolean>;
  setIsLoading: Setter<boolean>;
};

const AuthStateContext = createContext<AuthStateContextValues>();

export const useAuthState = () => useContext(AuthStateContext);

const AuthProvider: ParentComponent = (props) => {
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean>(false);
  const [isLoading, setIsLoading] = createSignal<boolean>(true);

  onMount(() => {});

  onCleanup(() => {});

  return (
    <AuthStateContext.Provider
      value={{ isAuthenticated, isLoading, setIsAuthenticated, setIsLoading }}
    >
      {props.children}
    </AuthStateContext.Provider>
  );
};

export default AuthProvider;
