import { Button, Card, Col, Form, Icon, Input, Row } from "@Marcin-Migdal/morti-component-library";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React from "react";

import { ISignUpState, signUpInitialValues, signUpValidationSchema } from "./sign-up-formik-config";
import { useFormErrors } from "../../hooks";

import "../../commonAssets/css/auth-form.css";

const SignUp = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(["auth", "common"]);

    const { formErrors, handleFormErrorChange, handleFormError } = useFormErrors<ISignUpState>({});

    const handleSubmit = async (values) => {
        try {
            // await handleSignUp(values, "pl");
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
                        <p>{t("Please sign up to continue")}</p>
                        <Form<ISignUpState>
                            initialValues={signUpInitialValues}
                            validationSchema={signUpValidationSchema}
                            onSubmit={handleSubmit}
                            externalErrors={formErrors}
                            onExternalErrorChange={handleFormErrorChange}
                        >
                            {({ values, errors, handleBlur, handleChange, isValid }) => (
                                <>
                                    <Input
                                        label={t("Username")}
                                        name="userName"
                                        value={values.userName}
                                        error={errors.userName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <Input
                                        label={t("Email")}
                                        name="email"
                                        value={values.email}
                                        error={errors.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <Input
                                        label={t("Password")}
                                        name="password"
                                        value={values.password}
                                        error={errors.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="password"
                                    />
                                    <Input
                                        label={t("Verify password")}
                                        name="verifyPassword"
                                        value={values.verifyPassword}
                                        error={errors.verifyPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="password"
                                    />
                                    <Button text={t("Sign up")} type="submit" variant="full" disabled={!isValid} />
                                    {/* <Button text={t("Sign up")} type="submit" variant="full" disabled={!isValid} busy={isLoading} /> */}
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
                        <h2>APP NAME</h2>
                        <p>{t("Already have any account?")}</p>
                        <Button text={t("Sign in")} variant="full" onClick={() => navigate("/sign-in")} />
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default SignUp;
