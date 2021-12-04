import {makeAutoObservable} from 'mobx';
// import {User} from '@auth0/auth0-react'

import adminAPI from "./adminAPI";
import {AdminUpdateUserDto} from './dto/adminUpdateUser.dto';
import {AdminBlockUserDto} from './dto/adminBlockUser.dto';


class Admin {
    users: any[] = [];
    roles: any[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async setAllUsers(): Promise<void> {
        const res = await adminAPI.getAllUsers();
        this.users = res.data;
    }

    async setUserData(dto: AdminUpdateUserDto): Promise<any> {
        const res = await adminAPI.setUserData(dto);
        return res.data;
    }

    async setIsBlockedUser(dto: AdminBlockUserDto): Promise<any> {
        const res = await adminAPI.setIsBlockedUser(dto);
        return res.data;
    }

    async deleteUser(uid: number): Promise<void> {
        const res = await adminAPI.deleteUser(uid);
        return res.data;
    }

    async setRoles(): Promise<any> {
        const res = await adminAPI.getAllRoles();
        this.roles = res.data;
    }
}

export default new Admin();