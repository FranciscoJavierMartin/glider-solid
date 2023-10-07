import { Accessor, Component, For, Show, onCleanup, onMount } from 'solid-js';
import GlidePost from './GlidePost';
import { Glide } from '../../types/glide';
import { CenteredDataLoader } from '../utils/DataLoader';

type PaginatedGlidesProps = {
  pageNumber: Accessor<number>;
  isLoading: boolean;
  loadMoreGlides: () => Promise<void>;
  pages: {
    [key: string]: { glides: Glide[] };
  };
};

const PaginatedGlides: Component<PaginatedGlidesProps> = (props) => {
  let lastItemRef: HTMLDivElement;

  onMount(() => {
    window.addEventListener('scroll', loadNewItems);
  });

  onCleanup(() => {
    window.removeEventListener('scroll', loadNewItems);
  });

  const loadNewItems = () => {
    if (
      lastItemRef.getBoundingClientRect().top <= window.innerHeight &&
      !props.isLoading
    ) {
      props.loadMoreGlides();
    }
  };

  return (
    <>
      <For each={Array.from({ length: props.pageNumber() })}>
        {(_, i) => (
          <For each={props.pages[i() + 1]?.glides}>
            {(glide) => <GlidePost glide={glide} />}
          </For>
        )}
      </For>
      <Show when={props.isLoading}>
        <CenteredDataLoader />
      </Show>
      <div ref={lastItemRef!} />
      <div class='h-96' />
    </>
  );
};

export default PaginatedGlides;
