import {makeAutoObservable} from "mobx";

import eventsAPI from './eventsAPI';
import {Event} from "./types";
import {CreateEventDto} from "./dto/create-event.dto";


class Events {
    events: Event[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async fetchEvents() {
        const res = await eventsAPI.getAllEvents();
        this.events = res.data;
        console.log(this.events);
    }

    async createEvent(dto: any, files: File[]) {
        const formData = new FormData();

        Object.keys(dto).forEach(k => {
            formData.append(k, dto[k]);
        });
        files.forEach(f => formData.append('files', f));

        await eventsAPI.createEvent(formData);
        await this.fetchEvents();
    }
}

export default new Events();