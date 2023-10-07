import { Accessor, Component, For, Show } from 'solid-js';
import GlidePost from './GlidePost';
import { Glide } from '../../types/glide';
import { CenteredDataLoader } from '../utils/DataLoader';

type PaginatedGlidesProps = {
  pageNumber: Accessor<number>;
  isLoading: boolean;
  pages: {
    [key: string]: { glides: Glide[] };
  };
};

const PaginatedGlides: Component<PaginatedGlidesProps> = (props) => {
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
    </>
  );
};

export default PaginatedGlides;
