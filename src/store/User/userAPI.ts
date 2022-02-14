import axios, {AxiosResponse} from 'axios';

import {User} from "@auth0/auth0-react";


class UserAPI {
    private readonly baseURL = process.env.REACT_APP_SERVER_URL + '/profile';

    updateUser(fd: User): Promise<AxiosResponse<any>> {
        return axios.put(this.baseURL + '/update', fd);
    }

    updatePicture(fd: FormData): Promise<AxiosResponse<any>> {
        return axios.put(this.baseURL + '/picture', fd);
    }

    deleteUser(): Promise<AxiosResponse<any>> {
        return axios.delete(this.baseURL);
    }
}

export default new UserAPI();

