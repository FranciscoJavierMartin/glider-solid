import { Component, For } from 'solid-js';
import { createStore } from 'solid-js/store';
import MainLayout from '../layouts/MainLayout';
import GlidePost from '../components/glides/GlidePost';
import Messenger from '../components/messenger/Messenger';
import { Glide } from '../types/glide';

const HomeScreen: Component = () => {
  const [glides, setGlides] = createStore<{ items: Glide[] }>({ items: [] });

  return (
    <MainLayout>
      <Messenger />
      <div class='h-px bg-gray-700 my-1' />
      <For each={glides.items}>{(glide) => <GlidePost glide={glide} />}</For>
    </MainLayout>
  );
};

export default HomeScreen;
