import { DocumentReference, Timestamp } from 'firebase/firestore';
import { User } from './user';

export interface Glide {
  id: string;
  uid: string;
  content: string;
  user: Partial<User> | DocumentReference;
  likesCount: number;
  subglidesCount: number;
  date: Timestamp;
}
