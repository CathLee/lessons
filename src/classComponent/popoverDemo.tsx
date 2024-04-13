import {FC} from "react";
import {PopoverDialog} from "../component/ui/popover/popover";

const PopoverDemo: FC = () => {
    return (
        <>
            <PopoverDialog as="span" trigger="click" triggerElement={<button>PopoverDemo</button>}>
                <span>这个是弹窗内容</span>
            </PopoverDialog>

        </>
    )
}
export default PopoverDemo;