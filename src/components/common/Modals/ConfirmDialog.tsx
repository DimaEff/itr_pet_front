import React, {FC} from 'react';
import {Dialog, DialogActions, DialogContent, DialogProps, DialogTitle} from "@mui/material";
import {Button} from "../Buttons";


export interface ConfirmDialogProps {
    open: boolean;
    onClose?: () => void;
    title?: string;
    text?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

const ConfirmDialog: FC<ConfirmDialogProps & DialogProps> = (
    {
        open,
        onClose,
        title,
        text,
        onConfirm,
        onCancel,
        ...props
    }) => {

    const handleConfirm = () => {
        onConfirm && onConfirm();
        onClose && onClose();
    }

    const handleCancel = () => {
        onCancel && onCancel();
        onClose && onClose();
    }

    return (
        <Dialog onClose={handleCancel} open={open} {...props}>
            {title && <DialogTitle>{title}</DialogTitle>}
            {text && <DialogContent>{text}</DialogContent>}
            <DialogActions>
                <Button onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleConfirm}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;