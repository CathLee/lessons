import {createContext, useContext} from "react";


const RootPortalContext = createContext<{ to?: HTMLElement | undefined }>({to: undefined})

export const useRootPortal = () => {
    const ctx = useContext(RootPortalContext)
    return ctx.to || document.body
}

export const RootPortalProvider = RootPortalContext.Provider;