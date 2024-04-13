import {useRootPortal} from "./provider";
import {createPortal} from "react-dom";
import {FC, PropsWithChildren} from "react";

const RootPortal: FC<{ to?: HTMLElement } & PropsWithChildren> = (props) => {
    const to = useRootPortal();
    return createPortal(props.children, props.to || to || document.body)
}
export default RootPortal