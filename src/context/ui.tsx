import { Context, ParentComponent, createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

type UIState = {
  snackbars: string[];
};

const defaultStore = (): UIState => ({ snackbars: ['Message 1', 'Message 2'] });

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
