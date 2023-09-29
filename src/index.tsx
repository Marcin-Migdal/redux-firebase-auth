import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React from "react";

import { App } from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as HTMLElement);

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
