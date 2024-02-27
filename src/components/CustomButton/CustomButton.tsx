import { Button, IButtonProps } from "@Marcin-Migdal/morti-component-library";
import { useTranslation } from "react-i18next";
import React from "react";

type CustomButtonPropsType = IButtonProps & { i18NameSpace?: string };

export const CustomButton = (props: CustomButtonPropsType) => {
    const { i18NameSpace, text } = props;
    const { t } = useTranslation(i18NameSpace);

    return <Button {...props} text={t(text)} />;
};
