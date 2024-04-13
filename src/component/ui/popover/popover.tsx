import {cloneElement, createElement, FC, PropsWithChildren, ReactElement, useMemo, useRef, useState} from "react";
import useClickAway from "../../../hooks/use-click-away";
import RootPortal from "../portal";

type FloatPopoverProps<T> = PropsWithChildren<{
    to?: HTMLElement,
    trigger?: 'click' | 'hover' | 'both'
    triggerElement?: string | ReactElement
    TriggerComponent?: FC<T>
    triggerComponentProps?: T,
    as?: keyof HTMLElementTagNameMap
}>
export const PopoverDialog = <T extends {}>(props: FloatPopoverProps<T>) => {
    const {as: As = 'div', trigger = 'hover', to, triggerElement, TriggerComponent, triggerComponentProps} = props
    const containerRef = useRef(null);
    const [open, setOpen] = useState(false);
    const Child = triggerElement ? (
        triggerElement
    ) : TriggerComponent ? (
        cloneElement(
            createElement(TriggerComponent as any, triggerComponentProps),

            {
                tabIndex: 0,
            },
        )
    ) : (
        <></>
    )

    const doPopoverDisappear = () => {

        setOpen(false)
    }
    const doPopoverShow = () => {

        setOpen(true)
    }
    useClickAway(containerRef, ['mousedown', 'touchstart'], () => {
        if (trigger === 'click' || trigger === 'both') {
            doPopoverDisappear()
        }
    })
    const listener = useMemo(() => {
        const baseListener = {
            // onFocus: doPopoverShow,
            // onBlur: doPopoverDisappear,
        }
        switch (trigger) {
            case 'click':
                return {
                    ...baseListener,
                    onClick: doPopoverShow,
                }
        }
    }, [doPopoverDisappear, doPopoverShow, trigger])

    const TriggerWrapper = (
        <As
            role={trigger === 'both' || trigger === 'click' ? 'button' : 'note'} {...listener}>

            {Child}
        </As>
    )
    return (
        <>
            {TriggerWrapper}
            {open && <RootPortal to={to}>
                <div ref={containerRef}>
                    {props.children}
                </div>
            </RootPortal>}

        </>
    )
}