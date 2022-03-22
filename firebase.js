import {
  apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId,
} from '@env';
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

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
const auth = getAuth();
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { db, auth };
