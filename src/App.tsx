import { RouterProvider } from "react-router-dom";

import { ToastHandler, ToastsContainer } from "@Marcin-Migdal/morti-component-library";
import { AppContextProvider } from "./context/app-context";
import { useAuth } from "./hooks";
import { useRef } from "react";
import router from "./pages";

import "./App.css";

//? SOBOTA
//! zmienić importy, żeby były skrócone w ts-config, wcześniej poczytać czy jest to dobra praktyka
//! zrobić research, redux saga czy redux slices
//! zaimplementować wybrane podejście do redux'a

//? LAST
//! add e2e tests

function App() {
    const toastRef = useRef<ToastHandler>(null);
    const auth = useAuth();

    return (
        <>
            <ToastsContainer ref={toastRef} />
            <AppContextProvider toastRef={toastRef} auth={auth}>
                <RouterProvider router={router} />
            </AppContextProvider>
        </>
    );
}

export default App;
