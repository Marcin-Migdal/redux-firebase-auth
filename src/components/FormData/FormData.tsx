import React, { FormEvent, ReactNode } from "react";

interface IFormDataProps {
    children: ReactNode;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const CustomFormData = ({ children, onSubmit }: IFormDataProps) => {
    return <form onSubmit={onSubmit}>{children}</form>;
};
