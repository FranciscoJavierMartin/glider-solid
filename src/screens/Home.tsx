import { Component } from 'solid-js';
import MainLayout from '../layouts/MainLayout';
import PaginatedGlides from '../components/glides/PaginatedGlides';
import Messenger from '../components/messenger/Messenger';
import useGlides from '../hooks/useGlides';

const HomeScreen: Component = () => {
  const { store, pageNumber, addGlide, loadGlides } = useGlides();

  return (
    <MainLayout>
      <Messenger onGlideAdded={addGlide} />
      <div class='h-px bg-gray-700 my-1' />
      <PaginatedGlides
        pageNumber={pageNumber}
        pages={store.pages}
        isLoading={store.isLoading}
        loadMoreGlides={loadGlides}
      />
    </MainLayout>
  );
};

export default HomeScreen;
