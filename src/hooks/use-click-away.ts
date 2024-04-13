import {RefObject, useEffect, useRef} from "react";


const on = <T extends Window | Document | HTMLElement | EventTarget>(obj: T | null, ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]) => {
    if (obj && obj.addEventListener) {
        obj.addEventListener(
            ...(args as Parameters<HTMLElement['addEventListener']>),
        )
    }
}

const off = <T extends Window | Document | HTMLElement | EventTarget>(obj: T | null, ...args: Parameters<T['removeEventListener']> | [string, Function | null, ...any]) => {
    if (obj && obj.removeEventListener) {
        obj.removeEventListener(
            ...(args as Parameters<HTMLElement['addEventListener']>),
        )
    }
}
const useClickAway = <E extends Event = Event>(ref: RefObject<HTMLElement | null>, events = ['mousedown', 'touchstart'], onClickAway: (event: E) => void,) => {
    const saveCallback = useRef(onClickAway)
    useEffect(() => {
        saveCallback.current = onClickAway
    }, [onClickAway])
    useEffect(() => {
        const handler = (event: MouseEvent) => {
            const {current: el} = ref;
            el && el.contains(event.target as any) && saveCallback.current(event as any)
        }
        for (const eventName of events) {
            on(document, eventName, handler)
        }
        return () => {
            for (const eventName of events) {
                off(document, eventName, handler)
            }
        }
    }, [events, ref]);
}
export default useClickAway