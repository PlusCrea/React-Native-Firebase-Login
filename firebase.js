import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZU8VLgrR_VL7x2tz3wzKkwGXgXGMllYw",
  authDomain: "loginwithreact-8c754.firebaseapp.com",
  projectId: "loginwithreact-8c754",
  storageBucket: "loginwithreact-8c754.appspot.com",
  messagingSenderId: "269343560364",
  appId: "1:269343560364:web:37a8fb521d326e82910509",
};

const app = initializeApp(firebaseConfig);

export function signwithfirebase(email, password) {
  const auth = getAuth();
  console.log("sign", email, password);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorMessage", errorMessage);
      return errorMessage;
    });
}
/*
class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig);
  }

  /*
  async signInWithEmailAndPassword(email, password) {
    const auth = getAuth();
    console.log("sign", email, password);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorMessage", errorMessage);
        return errorMessage;
      });
  }
*/ /*
  createUserWithEmailAndPassword(email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
}

export default new Firebase();
*/
export async function formatMoney(a, b) {
  await setTimeout(() => {
    console.log("Bekliyor");
  }, 2000);
  return a + b;
}
