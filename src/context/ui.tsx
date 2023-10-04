import { Context, ParentComponent, createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

type SnackbarType = 'success' | 'error' | 'warning';

export type SnackbarMessage = {
  message: string;
  type: SnackbarType;
  id?: string;
};

type UIState = {
  snackbars: SnackbarMessage[];
};

const defaultStore = (): UIState => ({
  snackbars: [
    { message: 'Hello World', type: 'success' },
    { message: 'Ooop, something wrong', type: 'error' },
    { message: 'Verify your profile', type: 'warning' },
  ],
});

const UIStateContext: Context<UIState> = createContext<UIState>(defaultStore());

const UIProvider: ParentComponent = (props) => {
  const [store, setStore] = createStore<UIState>(defaultStore());

  return (
    <UIStateContext.Provider value={store}>
      {props.children}
    </UIStateContext.Provider>
  );
};

export const useUIState = () => useContext<UIState>(UIStateContext);

export default UIProvider;
