import { createRoot } from "react-dom/client";
import React from "react";

import { App } from "./components";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as HTMLElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
