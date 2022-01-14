import axios from "axios";


class EventTypesAPI {
    private readonly baseURL = process.env.REACT_APP_SERVER_URL + '/event-types';

    getAllEventTypes() {
        return axios.get(this.baseURL);
    }

    createEventType(dto: FormData) {
        return axios.post(this.baseURL, dto);
    }

    delete(id: string) {
        return axios.delete(this.baseURL + `/${id}`);
    }
}

export default new EventTypesAPI();