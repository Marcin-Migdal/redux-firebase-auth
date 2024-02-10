import { Outlet, useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";

import { PATH_CONSTRANTS } from "../../utils/enums/path-constrants";
import { useApp } from "../../context/app-context";
import { Header } from "./Header";
import { Loader } from "./Loader";

export default function Layout() {
    const navigate = useNavigate();
    const { authUser, isLoading } = useApp();

    useEffect(() => {
        // check fetching current users is finished
        if (!isLoading) {
            const pathname = window.location.pathname;

            // if user does not exist, and current page is not one of the auth pages, navigate to sign-in page
            if (authUser === null && pathname !== PATH_CONSTRANTS.SIGN_IN && PATH_CONSTRANTS.SIGN_UP !== pathname) {
                navigate(PATH_CONSTRANTS.SIGN_IN);
            }
            // if user does exist, and current page is one of the auth pages, navigate to home page
            else if (authUser && (PATH_CONSTRANTS.SIGN_IN === pathname || PATH_CONSTRANTS.SIGN_UP === pathname)) {
                navigate(PATH_CONSTRANTS.HOME);
            }
        }
    }, [authUser, isLoading]);

    return (
        <>
            <Header />
            <main style={{ height: "inherit" }}>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
}
