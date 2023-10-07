import { Accessor, Component, For } from 'solid-js';
import GlidePost from './GlidePost';
import { Glide } from '../../types/glide';

type PaginatedGlidesProps = {
  pageNumber: Accessor<number>;
  pages: {
    [key: string]: { glides: Glide[] };
  };
};

const PaginatedGlides: Component<PaginatedGlidesProps> = (props) => {
  return (
    <For each={Array.from({ length: props.pageNumber() })}>
      {(_, i) => (
        <For each={props.pages[i() + 1].glides}>
          {(glide) => <GlidePost glide={glide} />}
        </For>
      )}
    </For>
  );
};

export default PaginatedGlides;
