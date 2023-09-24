import { createRoot, createSignal, onCleanup, onMount } from 'solid-js';

const getClientSize = () => ({
  height: document.body.clientHeight,
  width: document.body.clientWidth,
});

const pageSize = () => {
  const [value, setValue] = createSignal({
    height: document.body.clientHeight,
    width: document.body.clientWidth,
  });

  onMount(() => {
    window.addEventListener('resize', handleResize);
  });

  onCleanup(() => {
    window.removeEventListener('resize', handleResize);
  });

  const handleResize = () => {
    setValue(getClientSize());
  };

  const isXL = () => value().width > 1280;
  const isLG = () => value().width > 1024;

  return { isXL, isLG };
};

export default createRoot(pageSize);
