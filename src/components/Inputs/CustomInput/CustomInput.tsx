import { Input, InputProps } from "@Marcin-Migdal/morti-component-library";
import { useTranslation } from "react-i18next";
import React from "react";

type CustomInputPropsType = InputProps & { i18NameSpace?: string };

export const CustomInput = (props: CustomInputPropsType) => {
    const { i18NameSpace, label = undefined, placeholder = undefined, error = undefined } = props;
    const { t } = useTranslation(i18NameSpace);

    return (
        <Input
            {...props}
            label={label ? t(label) : undefined}
            placeholder={placeholder ? t(placeholder) : undefined}
            error={error ? t(error) : undefined}
        />
    );
};