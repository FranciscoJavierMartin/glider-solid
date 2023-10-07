import { onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { FirebaseError } from 'firebase/app';
import { Glide } from '../types/glide';
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

  const loadGlides = async () => {
    setStore('isLoading', true);
    try {
      const { glides } = await getGlides();
      setStore('glides', glides);
    } catch (error) {
      const message = (error as FirebaseError).message;
      console.log(message);
    } finally {
      setStore('isLoading', false);
    }
  };

  return {
    loadGlides,
    store,
  };
};

export default useGlides;
