import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../db';
import { User } from '../types/user';

export const getUsers = async (loggedInUser: User) => {
  const q = query(
    collection(db, 'users'),
    where('uid', '!=', loggedInUser.uid)
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    return doc.data() as User;
  });
};
