import {
  Component,
  createEffect,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
} from 'solid-js';
import { IoCloseCircle } from 'solid-icons/io';
import { SnackbarMessage } from '../../context/ui';

type SnackbarProps = SnackbarMessage & {
  onClose: () => void;
  autoHideDuration?: number;
};

export const Snackbar: Component<SnackbarProps> = (initialProps) => {
  const props = mergeProps({ autoHideDuration: 2000 }, initialProps);
  const [duration, setDuration] = createSignal<number>(props.autoHideDuration);

  let timerId: number;

  onMount(() => {
    timerId = window.setInterval(() => {
      setDuration((prev) => prev - 50);
    }, 50);
  });

  createEffect(() => {
    if (duration() <= 0) {
      window.clearInterval(timerId);
      props.onClose();
    }
  });

  onCleanup(() => {
    window.clearInterval(timerId);
  });

  return (
    <div
      class='min-w-68 text-white flex-it font-bold rounded-md md:max-w-xs w-full text-sm shadow-md'
      classList={{
        'bg-blue-400': props.type === 'success',
        'bg-red-700': props.type === 'error',
        'bg-yellow-500': props.type === 'warning',
      }}
    >
      <div class='flex-it flex-row-reverse p-1'>
        <button onClick={props.onClose} class='text-xl rounded-full'>
          <IoCloseCircle />
        </button>
      </div>
      <div class='flex-it px-2 pb-3'>{props.message}</div>
      <div
        style={{ width: `100%` }}
        class='bg-black opacity-40 text-right h-2'
      ></div>
    </div>
  );
};
