import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { getDocumentSnapShotById, validateUsername } from "./helpers";
import { CustomFirebaseError } from "../utils/custom-errors";
import { DOCUMENTS } from "../utils/documents";
import { fb } from "../firebase/firebase";

export const handleGoogleSignIn = async (language) => {
    try {
        const { user } = await signInWithPopup(fb.auth.auth, fb.auth.provider);

        const docSnap = await getDocumentSnapShotById(DOCUMENTS.USERS, user.uid);

        if (!docSnap?.exists()) {
            const { displayName: userName, photoURL, email, uid } = user;

            await setDoc(doc(fb.firestore, DOCUMENTS.USERS, uid), {
                uid,
                userName,
                email,
                avatarUrl: photoURL,
                darkMode: false,
                language,
            });
        }
    } catch (error) {
        throw new CustomFirebaseError(error.message, error.code);
    }
};

export const handleSignUpWithEmailAndPassword = async (credentials, language) => {
    try {
        const { email, password, userName } = credentials;

        const validate = await validateUsername(userName);

        if (!validate.validated) throw new CustomFirebaseError("Username already in use", "auth/username-already-in-use");

        const { user } = await createUserWithEmailAndPassword(fb.auth.auth, email, password);

        await setDoc(doc(fb.firestore, DOCUMENTS.USERS, user.uid), {
            uid: user.uid,
            userName,
            email,
            avatarUrl: "",
            darkMode: false,
            language,
        });
    } catch (error) {
        switch (error.code) {
            case "auth/username-already-in-use":
                throw new CustomFirebaseError("Username already in use", "auth/username-already-in-use");
            case "auth/email-already-in-use":
                throw new CustomFirebaseError("Email already in use", "auth/email-already-in-use");
            default:
                throw new CustomFirebaseError(error.message, error.code);
        }
    }
};

export const handleSignInWithEmail = async (credentials) => {
    try {
        const { email, password } = credentials;

        await signInWithEmailAndPassword(fb.auth.auth, email, password);
    } catch (error) {
        switch (error.code) {
            case "auth/user-not-found":
                throw new CustomFirebaseError("Email not found", "auth/user-not-found");
            case "auth/wrong-password":
                throw new CustomFirebaseError("Wrong password", "auth/wrong-password");
            default:
                throw new CustomFirebaseError(error.message, error.code);
        }
    }
};
