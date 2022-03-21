
import {
  apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId,
} from '@env';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
