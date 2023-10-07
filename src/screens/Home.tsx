import { Component, For } from 'solid-js';
import MainLayout from '../layouts/MainLayout';
import GlidePost from '../components/glides/GlidePost';
import Messenger from '../components/messenger/Messenger';
import useGlides from '../hooks/useGlides';

const HomeScreen: Component = () => {
  const { store, pageNumber, addGlide } = useGlides();

  return (
    <MainLayout>
      <Messenger onGlideAdded={addGlide} />
      <div class='h-px bg-gray-700 my-1' />
      <For each={Array.from({ length: pageNumber() })}>
        {(_, i) => (
          <For each={store.pages[i() + 1]?.glides}>
            {(glide) => <GlidePost glide={glide} />}
          </For>
        )}
      </For>
    </MainLayout>
  );
};

export default HomeScreen;
