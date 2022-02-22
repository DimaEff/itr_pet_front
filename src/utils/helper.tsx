import { v4 } from 'uuid';
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { parseISO } from "date-fns";
import { User } from "@auth0/auth0-react";
import { keys } from "ts-transformer-keys";


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

export const compareUsersData = (oldData: User, newData: User): User | null => {
    let userData: User = {};

    Object.keys(newData).forEach(k => {
        if (oldData[k] !== newData[k]) {
            userData[k] = newData[k];
        }
    });

    return Object.keys(userData).length > 0 ?
        userData :
        null;
}


interface Props {
    id: string;
    name: string;
    age: number;
}

const getValueByType = (nameOfType: string): any => {

}

export function getObjectByType<T extends object>() {
    const res: any = {};
    const objectKeys = keys<T>();
    type Test = typeof objectKeys[number];

    // objectKeys.forEach((k, i) => res[k] = getValueByType(objectTypes[i]));
}