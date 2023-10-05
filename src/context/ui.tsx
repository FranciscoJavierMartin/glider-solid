import {
  Context,
  ParentComponent,
  createContext,
  createUniqueId,
  useContext,
} from 'solid-js';
import { createStore, produce } from 'solid-js/store';

type SnackbarType = 'success' | 'error' | 'warning';

export type SnackbarMessage = {
  message: string;
  type: SnackbarType;
  id?: string;
};

type UIState = {
  snackbars: SnackbarMessage[];
};

type UIDispatch = {
  addSnackbar: (s: SnackbarMessage) => void;
  removeSnackbar: (id: string) => () => void;
};

const defaultStore = (): UIState => ({
  snackbars: [],
});

const UIStateContext: Context<UIState> = createContext<UIState>(defaultStore());
const UIDispatchContext = createContext<UIDispatch>({
  addSnackbar: () => {},
  removeSnackbar: (id: string) => () => {},
});

const UIProvider: ParentComponent = (props) => {
  const [store, setStore] = createStore<UIState>(defaultStore());

  const addSnackbar = (snackbar: SnackbarMessage): void => {
    setStore(
      'snackbars',
      produce((snackbars) => {
        snackbars.push({ id: createUniqueId(), ...snackbar });
      })
    );
  };

  const removeSnackbar = (id: string) => (): void => {
    setStore(
      'snackbars',
      produce((snackbars) => {
        const index = snackbars.findIndex((snackbar) => snackbar.id === id);

        if (index > -1) {
          snackbars.splice(index, 1);
        }
      })
    );
  };

  return (
    <UIStateContext.Provider value={store}>
      <UIDispatchContext.Provider value={{ addSnackbar, removeSnackbar }}>
        {props.children}
      </UIDispatchContext.Provider>
    </UIStateContext.Provider>
  );
};

export const useUIState = () => useContext<UIState>(UIStateContext);
export const useUIDispatch = () => useContext(UIDispatchContext);

export default UIProvider;
