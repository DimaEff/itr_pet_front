import axios, {AxiosResponse} from 'axios';

import {AdminUpdateUserDto} from './dto/adminUpdateUser.dto';
import {AdminBlockUserDto} from './dto/adminBlockUser.dto';


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

    getAllRoles(): Promise<AxiosResponse<any>> {
        // return this.rolesInstance.get('');
        return axios.get(this.baseRolesURL);
    }
}

export default new AdminAPI();