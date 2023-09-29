import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCnnjg9cfHKU1Wv2DD0JMLI874kkTMZ8Gc",
    authDomain: "authentication-test-d41bf.firebaseapp.com",
    projectId: "authentication-test-d41bf",
    storageBucket: "authentication-test-d41bf.appspot.com",
    messagingSenderId: "502403681755",
    appId: "1:502403681755:web:13fdea59b066726923ebfe",
    measurementId: "G-GKR02GDY79",
};

try {
    initializeApp(firebaseConfig);
} catch (error) {
    if (!/already exists/u.test(error.message)) {
        console.error("Firebase admin initialization error", error.stack);
    }
}

const auth = getAuth();
const provider = new GoogleAuthProvider();

auth.useDeviceLanguage();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export const fb = {
    auth: {
        auth,
        provider,
    },
    firestore: getFirestore(),
};
