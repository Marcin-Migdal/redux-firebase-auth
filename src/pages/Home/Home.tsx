import { Button } from "@Marcin-Migdal/morti-component-library";
import React from "react";

import { useApp } from "../../context/app-context";

const Home = () => {
    const { handleSignOut } = useApp();

    return (
        <div>
            <p>Home</p>
            <Button text="Sign out" onClick={handleSignOut} />
        </div>
    );
};

export default Home;
