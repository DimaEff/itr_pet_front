import React, {FC} from 'react';
import {Box, Modal, ModalProps} from "@mui/material";


const CenteredModal: FC<ModalProps> = ({children, ...props}) => {
    return (
        <Modal {...props}>
            <Box
                sx={{
                    '>*': {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        h: '100vh',
                        w: '100vw',
                    },
                }}
            >
                {children}
            </Box>
        </Modal>
    );
};

export default CenteredModal;