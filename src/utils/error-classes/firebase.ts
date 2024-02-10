import { FormErrorsType } from "@Marcin-Migdal/morti-component-library";

export class CustomFirebaseError extends Error {
    code: string;

    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}

type FieldNamesType<T> = FieldNameType<T> | FieldNameType<T>[];
type FieldNameType<T = unknown> = T extends unknown ? string : keyof T;

export class CustomFirebaseFormError<T = unknown> extends CustomFirebaseError {
    fieldNames: FieldNamesType<T>;

    constructor(message: string, code: string, fieldNames: FieldNamesType<T>) {
        super(message, code);
        this.fieldNames = fieldNames;
    }

    handleError(): FormErrorsType<T> {
        return Array.isArray(this.fieldNames)
            ? this.fieldNames.reduce((obj, key) => ({ ...obj, [key]: this.message }), {})
            : { [this.fieldNames]: this.message };
    }
}
