import React, { ReactNode } from "react";


interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    mode:"edit"|"create"|"delete",
    toggle: (mode:"edit"|"create"|"delete") => void;

}

export default function Modal(props: ModalType) {

    return (
        <>
            {props.isOpen && (
                <div className="modal-overlay">
                    <div  className="modal-box">
                        <button className="align-top align-content-lg-start" onClick={()=>props.toggle(props.mode)}>Close</button>
                        {props.children}
                    </div>
                </div>
            )}
        </>
    );
}
