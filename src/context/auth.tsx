import {
  ParentComponent,
  createContext,
  onCleanup,
  onMount,
  useContext,
} from 'solid-js';

type AuthStateContextValues = {
  
}

const AuthStateContext = createContext<AuthStateContextValues>();

export const useAuthState = () => useContext(AuthStateContext);

const AuthProvider: ParentComponent = (props) => {
  onMount(() => {});

  onCleanup(() => {});

  return (
    <AuthStateContext.Provider value={{}}>
      {props.children}
    </AuthStateContext.Provider>
  );
};

export default AuthProvider;
