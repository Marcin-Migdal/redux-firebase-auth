import { Button, Card, Col, Form, Icon, Input, Row } from "@Marcin-Migdal/morti-component-library";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React from "react";

import { ISignInState, signInInitialValues, signInValidationSchema } from "./sign-in-formik-config";
import { useAppDispatch, useAppSelector, useFormErrors } from "../../hooks";
import { signInWithEmail } from "../../slices/auth-user-slice";

import "../../commonAssets/css/auth-form.css";

const SignIn = () => {
    const { isLoading } = useAppSelector((store) => store.authUser);
    const dispatch = useAppDispatch();

    const { t } = useTranslation(["auth", "common"]);

    const navigate = useNavigate();

    const { formErrors, handleFormErrorChange, handleFormError } = useFormErrors<ISignInState>({});

    const handleSubmit = async (values: ISignInState) => {
        try {
            dispatch(signInWithEmail(values));
        } catch (error) {
            handleFormError(error);
        }
    };

    const onGoogleSignIn = async () => {
        try {
            // await handleGoogleSignIn("pl");
        } catch (error) {
            handleFormError(error);
        }
    };

    return (
        <div className="auth-from-container">
            <Card className="auth-card">
                <Row>
                    <Col xl={6} className="auth-form-container">
                        <h2>{t("common:Hello")}!</h2>
                        <p>{t("Please sign in to continue")}</p>
                        <Form<ISignInState>
                            initialValues={signInInitialValues}
                            onSubmit={handleSubmit}
                            validationSchema={signInValidationSchema}
                            externalErrors={formErrors}
                            onExternalErrorChange={handleFormErrorChange}
                        >
                            {({ values, errors, handleChange, handleBlur, isValid }) => (
                                <>
                                    <Input
                                        label={t("Email")}
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        error={errors.email}
                                    />
                                    <Input
                                        label={t("Password")}
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        error={errors.password}
                                        type="password"
                                    />
                                    <Button text={t("Sign in")} type="submit" variant="full" disabled={!isValid} busy={isLoading} />
                                </>
                            )}
                        </Form>
                        <div className="bottom-section">
                            <span>
                                {t("common:or")} <br /> {t("Sign up with")}
                            </span>
                            <Icon className="google-sign-up-icon" icon={["fab", "google"]} onClick={onGoogleSignIn} />
                        </div>
                    </Col>
                    <Col xl={6} className="sign-up-button-container">
                        <Icon className="google-sign-up-icon" icon={["fas", "rectangle-list"]} />
                        <h2>{t("APP NAME")}</h2>
                        <p>{t("Don't have any account?")}</p>
                        <Button text={t("Sign up")} variant="full" onClick={() => navigate("/sign-up")} />
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default SignIn;
