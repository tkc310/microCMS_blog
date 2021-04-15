import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';

export const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  databeseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

// initializeを複数回走らせない
if (!firebase.apps?.length) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}

const auth = firebase.auth();

export { firebase, auth };
export default firebase;
