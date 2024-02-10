import { getDoc, doc, collection, getDocs, query, where, setDoc } from "firebase/firestore";

import { DOCUMENTS } from "../../utils/enums/documents";
import { fb } from "../firebase";

export const getDocumentSnapShotById = async (document, uid) => {
    try {
        const docSnap = await getDoc(doc(fb.firestore, document, uid));
        return docSnap;
    } catch (e) {
        //! handle errors
        console.log(e.code);
    }
};

export const setDocumentSnapShot = async (document: DOCUMENTS, documentId, payload) => {
    try {
        await setDoc(doc(fb.firestore, document, documentId), payload);
    } catch (e) {
        //! handle errors
        console.log(e.code);
    }
};

type ValidateUsernameType = { validated: true; code: undefined; message: string } | { validated: false; code: string; message: string };

export const validateUsername = async (userName): Promise<ValidateUsernameType> => {
    try {
        const querySnapshot = await getDocs(query(collection(fb.firestore, DOCUMENTS.USERS), where("userName", "==", userName)));

        return querySnapshot.size === 0
            ? { validated: true, code: undefined, message: "Username is available" }
            : { validated: false, code: "auth/username-already-in-use", message: "Username already in use" };
    } catch (error) {
        //! why not throw error here
        return {
            validated: false,
            code: error.code,
            message: "Error ocurred, please try again",
        };
    }
};
