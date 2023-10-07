import { createSignal, onMount } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { FirebaseError } from 'firebase/app';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { Glide } from '../types/glide';
import { getGlides } from '../api/glide';

type GlideState = {
  pages: {
    [key: string]: { glides: Glide[] };
  };
  isLoading: boolean;
  lastGlide: QueryDocumentSnapshot | null;
};

const createInitState = (): GlideState => ({
  pages: {},
  isLoading: false,
  lastGlide: null,
});

const useGlides = () => {
  const [pageNumber, setPageNumber] = createSignal<number>(1);
  const [store, setStore] = createStore<GlideState>(createInitState());

  onMount(() => {
    loadGlides();
  });

  const loadGlides = async () => {
    const _pageNumber = pageNumber();
    setStore('isLoading', true);

    // TODO: Refactor condition
    if (!(_pageNumber > 1 && !store.lastGlide)) {
      try {
        const { glides, lastGlide } = await getGlides(store.lastGlide);

        if (glides.length) {
          setStore(
            produce((store) => {
              store.pages[_pageNumber] = { glides };
            })
          );

          setPageNumber((prev) => prev + 1);
        }

        setStore('lastGlide', lastGlide);
      } catch (error) {
        const message = (error as FirebaseError).message;
        console.log(message);
      } finally {
        setStore('isLoading', false);
      }
    }
  };

  const addGlide = (glide: Glide | undefined) => {
    const page = 1;

    if (glide) {
      setStore(
        produce((store) => {
          if (!store.pages[page]) {
            store.pages[page] = { glides: [] };
          }

          store.pages[page].glides.unshift({ ...glide });
        })
      );
    }
  };

  return {
    pageNumber,
    loadGlides,
    store,
    addGlide,
  };
};

export default useGlides;
