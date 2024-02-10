import { useEffect, useState } from "react";
import { fb } from "../firebase/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    User,
} from "firebase/auth";

import { getDocumentSnapShotById, setDocumentSnapShot, validateUsername } from "../firebase/helpers/firestore-helpers";
import { CustomFirebaseError, CustomFirebaseFormError } from "../utils/error-classes/firebase";
import { ISignInState } from "../pages/SignIn/sign-in-formik-config";
import { ISignUpState } from "../pages/SignUp/sign-up-formik-config";
import { authErrors } from "../utils/consts/firebase-errors";
import { DOCUMENTS } from "../utils/enums/documents";

export type UserType = User | null;
export type LanguageTypes = "pl" | "en";

export interface IUseAuth {
    authUser: UserType;
    handleGoogleSignIn: (language: LanguageTypes) => void;
    handleSignUp: (credentials: ISignUpState, language: LanguageTypes) => void;
    handleSignInWithEmail: (credentials: ISignInState) => void;
    handleSignOut: () => void;
    isLoading: boolean;
}

export const useAuth = (): IUseAuth => {
    const [authUser, setAuthUser] = useState<UserType>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(fb.auth.auth, (user) => {
            if (authUser !== user) setAuthUser(user);
            setIsLoading(false);
        });

        return unSubscribe;
    }, [authUser]);

    const handleGoogleSignIn = async (language: LanguageTypes) => {
        try {
            setIsLoading(true);

            // Sign in users
            const { user } = await signInWithPopup(fb.auth.auth, fb.auth.provider);

            // Get user document if it exists
            const docSnap = await getDocumentSnapShotById(DOCUMENTS.USERS, user.uid);

            // Checks if user exists and if it does not exists, creates user document in firestore db
            if (!docSnap?.exists()) {
                const { displayName: userName, photoURL, email, uid } = user;
                const payload = { uid, userName, email, avatarUrl: photoURL, darkMode: false, language };

                await setDocumentSnapShot(DOCUMENTS.USERS, uid, payload);
            }
        } catch (error) {
            setIsLoading(false);

            throw new CustomFirebaseError(error.message, error.code);
        }
    };

    // auth/too-many-requests
    const handleSignUpWithEmailAndPassword = async (credentials, language) => {
        try {
            setIsLoading(true);

            const { email, password, userName } = credentials;

            // Validate if user with this userName exists
            const validateResponse = await validateUsername(userName);
            if (!validateResponse.validated) throw new CustomFirebaseError(validateResponse.message, validateResponse.code);

            // creates users
            const { user } = await createUserWithEmailAndPassword(fb.auth.auth, email, password);

            //creates user document in firestore db
            const payload = { uid: user.uid, userName, email, avatarUrl: "", darkMode: false, language };
            await setDocumentSnapShot(DOCUMENTS.USERS, user.uid, payload);
        } catch (error) {
            setIsLoading(false);
            throwError(error);
        }
    };

    const handleSignInWithEmail = async (credentials: ISignInState) => {
        try {
            setIsLoading(true);

            const { email, password } = credentials;

            // Sign in users
            await signInWithEmailAndPassword(fb.auth.auth, email, password);
        } catch (error) {
            setIsLoading(false);
            throwError(error);
        }
    };

    const throwError = (error) => {
        const errorObj = authErrors[error.code];

        if (errorObj) {
            if (errorObj.fieldNames) throw new CustomFirebaseFormError(errorObj.message, errorObj.code, errorObj.fieldNames);
            else throw new CustomFirebaseError(errorObj.message, errorObj.code);
        } else throw new CustomFirebaseError(error.message, error.code);
    };

    const handleSignOut = () => {
        try {
            signOut(fb.auth.auth);
        } catch (e) {}
    };

    return {
        authUser,
        handleGoogleSignIn,
        handleSignUp: handleSignUpWithEmailAndPassword,
        handleSignInWithEmail,
        handleSignOut,
        isLoading,
    };
};
