import React, {FC, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Box} from '@mui/material';
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import {Image} from "@mui/icons-material";
import {ImageContainer} from "../Containers";


type FileTypes = 'audio/*' | 'video/*' | 'image/*';

interface FileInputProps {
    name: string;
    handleLoad: (acceptedFiles: File[]) => void;
    w?: string | number;
    h?: string | number;
    fileTypes?: FileTypes | FileTypes[];
    maxFiles?: number;
    preview?: string | null;
}

const FileInput: FC<FileInputProps> = (
    {
        name,
        handleLoad,
        w,
        h,
        fileTypes,
        maxFiles,
        preview,
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

    const [open, setOpen] = useState(false);

    return (
        <Box
            sx={{
                position: 'relative',
                width: w || '200px',
                height: h || '150px',
                textAlign: 'center',
            }}
        >
            {preview && <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
            >
                <ImageContainer src={preview}/>
            </Box>}
            <Box
                sx={{
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '4px dashed',
                    borderColor: (isDragActive || open) ? '#fff' : '#a59a9a',
                    borderRadius: '20px',
                    width: '100%',
                    height: '100%',
                    cursor: `pointer`,
                    'input': {
                        zIndex: 2,
                    }
                }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                {...getRootProps()}
            >
                <DownloadForOfflineRoundedIcon/>
                <input name={name} {...getInputProps()}/>
            </Box>
        </Box>
    );
};

export default FileInput;