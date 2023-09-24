import {
  Component,
  Show,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js';
import { Portal } from 'solid-js/web';

type PopupProps = {
  opener: Component;
};

const Popup: Component<PopupProps> = ({ opener: Opener }) => {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  let followTo: HTMLDivElement;
  let popup: HTMLDivElement;

  onMount(() => {
    window.addEventListener('resize', adjustPopup);
    window.addEventListener('click', closePopup);
  });

  onCleanup(() => {
    window.removeEventListener('resize', adjustPopup);
    window.removeEventListener('click', closePopup);
  });

  createEffect(() => {
    if (isOpen()) {
      adjustPopup();
    }
  });

  const adjustPopup = () => {
    if (popup) {
      const position = followTo.getBoundingClientRect();
      popup.style.left = position.left + 'px';
      popup.style.bottom = followTo.clientHeight + 'px';
    }
  };

  const closePopup = (e: MouseEvent) => {
    if (isOpen() && !isPopupClicked(e)) {
      setIsOpen(false);
    }
  };

  const isPopupClicked = (e: MouseEvent): boolean => {
    return popup?.contains(e.target as Node);
  };

  return (
    <div class='flex-it flex-grow'>
      <div
        ref={followTo!}
        onClick={(e) => {
          e.stopImmediatePropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <Opener />
      </div>
      <Show when={isOpen()}>
        <Portal mount={document.getElementById('popups')!}>
          <div
            ref={popup!}
            class='flex-it hover:cursor-pointer fixed bg-gray-800 text-white popup z-10 rounded-2xl border-gray-700 border transition duration-1000'
          >
            <div class='w-72 min-w-68 max-h-120 min-h-8 flex-it overflow-auto'>
              <div class='flex-it flex-grow flex-shrink py-3'>
                <div class='flex-it px-4 py-3 transition hover:bg-gray-700'>
                  Logout
                </div>
              </div>
            </div>
          </div>
        </Portal>
      </Show>
    </div>
  );
};

export default Popup;
