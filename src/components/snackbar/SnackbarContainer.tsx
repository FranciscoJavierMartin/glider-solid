import { Component, For } from 'solid-js';
import { Snackbar } from '.';
import { useUIDispatch, useUIState } from '../../context/ui';

const SnackbarContainer: Component = () => {
  const { snackbars } = useUIState();
  const { removeSnackbar } = useUIDispatch();

  return (
    <div class='fixed z-50 top-0 right-0 p-4 w-full md:max-w-xs'>
      <ul class='flex flex-col space-y-2'>
        <For each={snackbars}>
          {(snackbar) => (
            <Snackbar
              message={snackbar.message}
              type={snackbar.type}
              onClose={removeSnackbar(snackbar.id!)}
            />
          )}
        </For>
      </ul>
    </div>
  );
};

export default SnackbarContainer;
