import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAHOoDYLB8Cp9pxmzP8b7Cc6b_eErOsb4Q",
  authDomain: "crwn-db-9743f.firebaseapp.com",
  databaseURL: "https://crwn-db-9743f.firebaseio.com",
  projectId: "crwn-db-9743f",
  storageBucket: "crwn-db-9743f.appspot.com",
  messagingSenderId: "68263452194",
  appId: "1:68263452194:web:5e8ec7a76bdd4d9c9f347b",
  measurementId: "G-SGGJ2D5GVW",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
