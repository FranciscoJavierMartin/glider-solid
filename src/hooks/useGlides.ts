import { createStore } from 'solid-js/store';
import { Glide } from '../types/glide';
import { onMount } from 'solid-js';
import { getGlides } from '../api/glide';

type GlideState = {
  glides: Glide[];
  isLoading: boolean;
};

const createInitState = (): GlideState => ({ glides: [], isLoading: false });

const useGlides = () => {
  const [store, setStore] = createStore<GlideState>(createInitState());

  onMount(() => {
    loadGlides();
  });

  const loadGlides = () => {
    getGlides();
  };

  return {
    loadGlides,
    store,
  };
};

export default useGlides;
