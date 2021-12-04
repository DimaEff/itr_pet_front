import axios, {AxiosResponse} from 'axios';

import {AdminUpdateUserDto} from './dto/adminUpdateUser.dto';
import {AdminBlockUserDto} from './dto/adminBlockUser.dto';


// !!! Не работают инстансы(к ним не прикрепляется токен)
// Ощущение, что с admin эндпоинтами я немного накосячил на сервере + уже тут как следствие
// Мне не нравится, что приходится писать еще дополнительно 'users' или 'roles'.
// Пока не знаю, как это исправить, кроме как создавать отдельный instance для каждого.
class AdminAPI {
    private readonly baseURL = process.env.REACT_APP_SERVER_URL + '/admin';
    private readonly baseUsersURL = this.baseURL + '/users';
    private readonly baseRolesURL = this.baseURL + '/roles';
    // private readonly usersInstance = axios.create({baseURL: this.baseURL + '/users'});
    // private readonly rolesInstance = axios.create({baseURL: this.baseURL + '/roles'});

    getAllUsers(): Promise<AxiosResponse<any>> {
        // return this.usersInstance.get('');
        return axios.get(this.baseUsersURL);
    }

    setUserData(dto: AdminUpdateUserDto): Promise<AxiosResponse<any>> {
        // return this.usersInstance.put('/update', dto);
        return axios.put(this.baseUsersURL + '/update', dto);
    }

    setIsBlockedUser(dto: AdminBlockUserDto): Promise<AxiosResponse<any>> {
        // return this.usersInstance.get('/block');
        return axios.put(this.baseUsersURL + '/block', dto);
    }

    deleteUser(uid: number): Promise<AxiosResponse<any>> {
        // return this.usersInstance.delete(`/${uid}`);
        return axios.delete(this.baseUsersURL + `/${uid}`);
    }

    getAllRoles(): Promise<AxiosResponse<any>> {
        // return this.rolesInstance.get('');
        return axios.get(this.baseRolesURL);
    }
}

export default new AdminAPI();