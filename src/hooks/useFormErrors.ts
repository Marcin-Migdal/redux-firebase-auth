import { FormErrorsType } from "@Marcin-Migdal/morti-component-library";
import { useState } from "react";

import { CustomFirebaseError, CustomFirebaseFormError } from "../utils/error-classes/firebase";
import { ToastRefType } from "../context/app-context";
import { useTranslation } from "react-i18next";

type UseFormErrorsType = {
    toastRef?: ToastRefType;
};

type ErrorTypes<T> = CustomFirebaseFormError<T> | CustomFirebaseError | string;

export const useFormErrors = <T>({ toastRef }: UseFormErrorsType) => {
    const { t } = useTranslation();
    const [formErrors, setFormErrors] = useState<FormErrorsType<T>>({});

    const handleFormErrorChange = (authErrors: FormErrorsType<T>) => setFormErrors(authErrors);

    const handleFormError = (error: ErrorTypes<T>) => {
        if (error instanceof CustomFirebaseFormError) {
            setFormErrors(error.handleError());
            addErrorToast(error.message);
        } else if (error instanceof CustomFirebaseError) {
            addErrorToast(error.message);
        } else {
            addErrorToast(error);
        }
    };

    const addErrorToast = (message) => {
        toastRef?.current?.addToast("failure", t(message));
    };

    return { formErrors, handleFormErrorChange, handleFormError };
};
