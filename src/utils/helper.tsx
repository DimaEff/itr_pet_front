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
    return new File([blob], "File name", {type: "image/png"});
}

export const getFileUrl = (file: File): string => {
    return URL.createObjectURL(file);
}

export const onSelectImageHandler = (files: File[]): FormData => {
    const formData = new FormData();
    files.forEach(f => formData.append('file', f));

    // const config = {
    //     headers: {
    //         "Content-Type":"multipart/form-data"
    //     }
    // };
    return formData;
}