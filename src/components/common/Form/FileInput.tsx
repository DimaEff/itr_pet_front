import React, {FC, useEffect} from 'react';
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
        onDrop: (acceptedFiles) => console.log(acceptedFiles),
        accept: fileTypes,
        maxFiles: maxFiles,
    });

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            handleLoad(acceptedFiles);
        }
    }, [acceptedFiles]);

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '4px dashed',
            borderColor: isDragActive ? '#fff' : '#a59a9a',
            borderRadius: '20px',
            width: w || '200px',
            height: h || '150px',
            cursor: `pointer`,

        }}
             {...getRootProps()}
        >
            <input name={name} {...getInputProps()}/>
            <DownloadForOfflineRoundedIcon/>
        </Box>
    );
};

export default FileInput;