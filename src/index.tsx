import { ThemeWrapper } from "@Marcin-Migdal/morti-component-library";
import { Loader } from "./components/Layout/Loader";
import { createRoot } from "react-dom/client";
import React, { Suspense } from "react";

import App from "./App";

import "./commonAssets/css/page";
import "./index.css";

// translation config
import "./i18n";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as HTMLElement);

root.render(
    <ThemeWrapper theme="light-blue-theme-dark-mode">
        <Suspense fallback={<Loader />}>
            <App />
        </Suspense>
    </ThemeWrapper>
);
