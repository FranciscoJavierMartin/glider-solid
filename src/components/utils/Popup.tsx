import { Component, Show, createSignal } from 'solid-js';

type PopupProps = {
  opener: Component;
};

const Popup: Component<PopupProps> = ({ opener: Opener }) => {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);

  return (
    <div class='relative'>
      <div onClick={() => setIsOpen((prev) => !prev)}>
        <Opener />
      </div>
      <Show when={isOpen()}>
        <div class='flex-it w-20 h-20 fixed bg-black bottom-10 popup'>
          Hello world
        </div>
      </Show>
    </div>
  );
};

export default Popup;
