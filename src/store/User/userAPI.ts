import axios, {AxiosResponse} from 'axios';

import {UpdateUserDto} from './dto/updateUser.dto';


// !!! Не работают инстансы(к ним не прикрепляется токен)
class UserAPI {
    private readonly baseURL = process.env.REACT_APP_SERVER_URL + '/user';
    // private readonly instance = axios.create({baseURL: this.baseURL});

    updateUser(dto: UpdateUserDto): Promise<AxiosResponse<any>> {
        // return this.instance.put('/update', dto);
        return axios.put(this.baseURL + '/update', dto);
    }

    deleteUser(): Promise<AxiosResponse<any>> {
        // return this.instance.delete('');
        return axios.delete(this.baseURL);
    }
}

export default new UserAPI();

