import { initializeApp } from "firebase/app";

const apiKey = import.meta.env.VITE_REACT_APP_apiKey;
const authDomain = import.meta.env.VITE_REACT_APP_authDomain;
const projectId = import.meta.env.VITE_REACT_APP_projectId;
const storageBucket = import.meta.env.VITE_REACT_APP_storageBucket;
const messagingSenderId = import.meta.env.VITE_REACT_APP_messagingSenderId;
const appId = import.meta.env.VITE_REACT_APP_appId;
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

export const app = initializeApp(firebaseConfig);

