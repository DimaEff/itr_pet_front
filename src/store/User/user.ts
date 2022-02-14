import {makeAutoObservable} from "mobx";
import {serialize} from "object-to-formdata";
import {User as A0User} from '@auth0/auth0-react';

import userAPI from "./userAPI";

class User {
    constructor() {
        makeAutoObservable(this);
    }

    async updateUser(dto: A0User): Promise<any> {
        const res = await userAPI.updateUser(dto);
        console.log(res.data);
        return res.data;
    }

    async updatePicture(picture: File): Promise<any> {
        const fd = serialize({picture});
        const res = await userAPI.updatePicture(fd);
        return res.data;
    }

    async deleteUser(): Promise<any> {
        const res = await userAPI.deleteUser();
        return res.data;
    }
}

export default new User();