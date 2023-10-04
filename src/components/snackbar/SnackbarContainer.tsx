import { Component, For } from 'solid-js';
import { Snackbar } from '.';
import { useUIState } from '../../context/ui';

const SnackbarContainer: Component = () => {
  const { snackbars } = useUIState();
  return (
    <div class='fixed z-50 top-0 right-0 p-4 w-full md:max-w-xs'>
      <ul class='flex flex-col space-y-2'>
        <For each={snackbars}>
          {(message) => (
            <Snackbar message={message} />
          )}
        </For>
      </ul>
    </div>
  );
};

export default SnackbarContainer;
