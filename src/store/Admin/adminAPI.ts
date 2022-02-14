import axios, {AxiosResponse} from 'axios';

import {AdminUpdateUserDto} from './dto/admin-update-user.dto';
import {AdminBlockUserDto} from './dto/admin-block-user.dto';
import {AdminAssignRolesDto} from "./dto/admin-assign-roles.dto";


// Ощущение, что с admin эндпоинтами я немного накосячил на сервере + уже тут как следствие
// Мне не нравится, что приходится писать еще дополнительно 'users' или 'roles'.
class AdminAPI {
    private readonly baseURL = process.env.REACT_APP_SERVER_URL + '/admin';
    private readonly baseUsersURL = this.baseURL + '/users';
    private readonly baseRolesURL = this.baseURL + '/roles';

    getAllUsers(): Promise<AxiosResponse<any>> {
        return axios.get(this.baseUsersURL);
    }

    setUserData(dto: AdminUpdateUserDto): Promise<AxiosResponse<any>> {
        return axios.put(this.baseUsersURL + '/update', dto);
    }

    setIsBlockedUser(dto: AdminBlockUserDto): Promise<AxiosResponse<any>> {
        return axios.put(this.baseUsersURL + '/block', dto);
    }

    deleteUser(uid: number): Promise<AxiosResponse<any>> {
        return axios.delete(this.baseUsersURL + `/${uid}`);
    }

    assignRoles(dto: AdminAssignRolesDto): Promise<AxiosResponse<any>>{
        return axios.post(this.baseUsersURL + '/roles', )
    }

    getAllRoles(): Promise<AxiosResponse<any>> {
        return axios.get(this.baseRolesURL);
    }
}

export default new AdminAPI();