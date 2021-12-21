import React, {FC, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Box} from '@mui/material';
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";


type FileTypes = 'audio/*' | 'video/*' | 'image/*';

interface FileInputProps {
    name: string;
    handleLoad: (acceptedFiles: File[]) => void;
    w?: string | number;
    h?: string | number;
    fileTypes?: FileTypes | FileTypes[];
    maxFiles?: number;
}

const FileInput: FC<FileInputProps> = (
    {
        name,
        handleLoad,
        w,
        h,
        fileTypes,
        maxFiles,
    }) => {

    const {getRootProps, getInputProps, acceptedFiles, isDragActive} = useDropzone({
        accept: fileTypes,
        maxFiles: maxFiles,
    });

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            handleLoad(acceptedFiles);
        }
    }, [acceptedFiles]);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '4px dashed',
                borderColor: (isDragActive || isOpen) ? '#fff' : '#a59a9a',
                borderRadius: '20px',
                width: w || '200px',
                height: h || '150px',
                cursor: `pointer`,
                'input': {
                    zIndex: 1,
                }
            }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            {...getRootProps()}
        >
            <DownloadForOfflineRoundedIcon/>
            <input name={name} {...getInputProps()}/>
        </Box>
    );
};

export default FileInput;