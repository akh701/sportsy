import {
  apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId,
} from '@env';
import { initializeApp } from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';

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
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export {db};