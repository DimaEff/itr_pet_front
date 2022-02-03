import {v4} from 'uuid';
import {FieldErrors} from "react-hook-form/dist/types/errors";
import {parseISO} from "date-fns";
import {IEvent} from "../store";


export const convertToBase64 = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

export const base64toFile = async (url: string): Promise<File> => {
    const res = await fetch(url);
    const blob = await res.blob();
    const name = v4();
    return new File([blob], name, {type: "image/png"});
}

export const getFileUrl = (file: File): string => {
    return URL.createObjectURL(file);
}

export const onSelectImageHandler = (files: File[]): FormData => {
    const formData = new FormData();
    files.forEach(f => formData.append('file', f));

    return formData;
}

interface ErrorAndMessage {
    error: boolean;
    helperText?: string;
}
export function getMuiErrorAndMessageCreator<T>(errors: FieldErrors) {
    return (field: keyof T, withoutHelperText = false): ErrorAndMessage => {
        const res: ErrorAndMessage = {error: false};
        const message = errors?.[String(field)]?.message;

        res.error = !!message;
        if (!withoutHelperText) {
            res.helperText = message;
        }

        return res;
    }
}

export function stringNameOf<T>(name: keyof T): string {
    return String(name);
}

export const isoToDateString = (date: string): string => {
    const parsedDate = parseISO(date);
    return `${parsedDate.toDateString()} ${parsedDate.toTimeString().slice(0, 5)}`;
}