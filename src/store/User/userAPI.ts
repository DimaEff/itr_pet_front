import axios, {AxiosResponse} from 'axios';

import {UpdateUserDto} from './dto/updateUser.dto';


class UserAPI {
    private readonly baseURL = process.env.REACT_APP_SERVER_URL + '/user';

    updateUser(dto: UpdateUserDto): Promise<AxiosResponse<any>> {
        return axios.put(this.baseURL + '/update', dto);
    }

    deleteUser(): Promise<AxiosResponse<any>> {
        return axios.delete(this.baseURL);
    }
}

export default new UserAPI();

