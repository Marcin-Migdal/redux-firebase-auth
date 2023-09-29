import { getDoc, doc, collection, getDocs, query, where } from "firebase/firestore";

import { DOCUMENTS } from "../utils/documents";
import { fb } from "../firebase/firebase";

export const getDocumentSnapShotById = async (document, uid) => {
    try {
        const docSnap = await getDoc(doc(fb.firestore, document, uid));
        return docSnap;
    } catch (e) {
        console.log(e.code);
    }
};

export const validateUsername = async (userName) => {
    try {
        const querySnapshot = await getDocs(query(collection(fb.firestore, DOCUMENTS.USERS), where("userName", "==", userName)));

        const isValidated = querySnapshot.size === 0;

        return {
            validated: isValidated,
            message: isValidated ? "Username is available" : "Username already in use",
        };
    } catch (error) {
        return {
            validated: false,
            message: "Error ocurred, please try again",
        };
    }
};
