import {makeAutoObservable} from "mobx";

import userApi from './userAPI';
import {UpdateUserDto} from './dto/updateUser.dto';


class User {
    constructor() {
        makeAutoObservable(this);
    }

    async updateUser(dto: UpdateUserDto): Promise<any> {
        const res = await userApi.updateUser(dto);
        return res.data;
    }

    async deleteUser(): Promise<any> {
        const res = await userApi.deleteUser();
        return res.data;
    }
}

export default new User();