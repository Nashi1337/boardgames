import type {FC} from "react";
import {createPortal} from "react-dom";

interface ModalProps{
    children:React.ReactNode;
    onClose: () => void;
}

export const Modal: FC<ModalProps> = ({children, onClose}) => {
    return createPortal(
        <div className={"fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999]"} onClick={onClose}>
            <div onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')!
    )
}