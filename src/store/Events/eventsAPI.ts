import axios from "axios";

import {CreateEventDto} from './dto/create-event.dto';


class EventsAPI {
    private readonly baseURL = process.env.REACT_APP_SERVER_URL + '/events';

    getAllEvents() {
        return axios.get(this.baseURL);
    }

    createEvent(fd: FormData) {
        return axios.post(this.baseURL, fd);
    }

    test(fd: FormData) {
        return axios.post(this.baseURL + '/test', fd);
    }
}

export default new EventsAPI();