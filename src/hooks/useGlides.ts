import { createSignal, onMount } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { FirebaseError } from 'firebase/app';
import { Glide } from '../types/glide';
import { getGlides } from '../api/glide';

type GlideState = {
  pages: {
    [key: string]: { glides: Glide[] };
  };
  isLoading: boolean;
};

const createInitState = (): GlideState => ({ pages: {}, isLoading: false });

const useGlides = () => {
  const [pageNumber, setPageNumber] = createSignal<number>(1);
  const [store, setStore] = createStore<GlideState>(createInitState());

  onMount(() => {
    loadGlides();
  });

  const loadGlides = async () => {
    const _pageNumber = pageNumber();
    setStore('isLoading', true);
    try {
      const { glides } = await getGlides();

      if (glides.length) {
        setStore(
          produce((store) => {
            store.pages[_pageNumber] = { glides };
          })
        );
      }
    } catch (error) {
      const message = (error as FirebaseError).message;
      console.log(message);
    } finally {
      setStore('isLoading', false);
    }
  };

  const addGlide = (glide: Glide) => {
    const page = 1;

    setStore(
      produce((store) => {
        if (!store.pages[page]) {
          store.pages[page] = { glides: [] };
        }

        store.pages[page].glides.unshift({ ...glide });
      })
    );
  };

  return {
    pageNumber,
    loadGlides,
    store,
    addGlide,
  };
};

export default useGlides;
