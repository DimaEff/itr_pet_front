import {makeAutoObservable} from 'mobx';
import {User} from '@auth0/auth0-react'

import adminAPI from "./adminAPI";
import {AdminUpdateUserDto} from './dto/admin-update-user.dto';
import {AdminBlockUserDto} from './dto/admin-block-user.dto';
import {AdminAssignRolesDto} from './dto/admin-assign-roles.dto';


export class Admin {
    users: User[] = [];
    roles: any[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    fetchUsers = async (): Promise<void> => {
        const res = await adminAPI.getAllUsers();
        this.users = res.data;
    }

    setUserData = async (dto: AdminUpdateUserDto): Promise<any> => {
        const res = await adminAPI.setUserData(dto);
        return res.data;
    }

    setIsBlockedUser = async (dto: AdminBlockUserDto): Promise<any> => {
        const res = await adminAPI.setIsBlockedUser(dto);
        return res.data;
    }

    deleteUser = async (uid: number): Promise<void> => {
        const res = await adminAPI.deleteUser(uid);
        return res.data;
    }

    assignRoles = async (dto: AdminAssignRolesDto): Promise<void> => {
        await adminAPI.assignRoles(dto);
        console.log('assign roles');
    }

    fetchRoles = async (): Promise<any> => {
        const res = await adminAPI.getAllRoles();
        this.roles = res.data;
    }
}

export default new Admin();