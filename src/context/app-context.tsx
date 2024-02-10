import { ReactElement, RefObject, createContext, useContext } from "react";
import { ToastHandler } from "@Marcin-Migdal/morti-component-library";
import { IUseAuth } from "../hooks/useAuth";

export type ToastRefType = RefObject<ToastHandler>;

interface AppContextProviderProps {
    children: ReactElement;
    toastRef?: ToastRefType;
    auth: IUseAuth;
}

interface AppContext {
    toastRef?: ToastRefType;
    auth: IUseAuth;
}

export const AppContext = createContext<AppContext>(undefined as any);

export const AppContextProvider = ({ children, toastRef, auth }: AppContextProviderProps) => {
    return <AppContext.Provider value={{ toastRef, auth }}>{children}</AppContext.Provider>;
};

interface IUseApp extends IUseAuth {
    toastRef?: ToastRefType;
}

export const useApp = (): IUseApp => {
    const { toastRef, auth } = useContext(AppContext);

    return { toastRef, ...auth };
};
