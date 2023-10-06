import { Component, For } from 'solid-js';
import MainLayout from '../layouts/MainLayout';
import GlidePost from '../components/glides/GlidePost';
import Messenger from '../components/messenger/Messenger';
import useGlides from '../hooks/useGlides';

const HomeScreen: Component = () => {
  const { store } = useGlides();

  return (
    <MainLayout>
      <Messenger />
      <div class='h-px bg-gray-700 my-1' />
      <For each={store.glides}>{(glide) => <GlidePost glide={glide} />}</For>
    </MainLayout>
  );
};

export default HomeScreen;
