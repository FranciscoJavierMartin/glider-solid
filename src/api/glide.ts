import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  startAfter,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../db';
import { Glide } from '../types/glide';
import { User } from '../types/user';

export const getGlides = async (lastGlide: QueryDocumentSnapshot | null) => {
  const constraints: QueryConstraint[] = [orderBy('date', 'desc'), limit(10)];

  if (!!lastGlide) {
    constraints.push(startAfter(lastGlide));
  }

  const q = query(collection(db, 'glides'), ...constraints);
  const qSnapshot = await getDocs(q);
  const _lastGlide: QueryDocumentSnapshot | null = qSnapshot.docs.length
    ? qSnapshot.docs[qSnapshot.docs.length - 1]
    : null;

  const glides = await Promise.all(
    qSnapshot.docs.map(async (doc) => {
      const glide = doc.data() as Glide;
      const userSnap = await getDoc(glide.user as DocumentReference);
      glide.user = userSnap.data() as User;

      return { ...glide, id: doc.id };
    })
  );

  return { glides, lastGlide: _lastGlide };
};

export const createGlide = async (form: {
  content: string;
  uid: string;
}): Promise<Glide> => {
  const userRef = doc(db, 'users', form.uid);

  const glideToStore = {
    ...form,
    user: userRef,
    likesCount: 0,
    subglidesCount: 0,
    date: Timestamp.now(),
  };

  const glideCollection = collection(db, 'glides');
  const added = await addDoc(glideCollection, glideToStore);

  return { ...glideToStore, id: added.id };
};
