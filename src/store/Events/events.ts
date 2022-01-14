import {makeAutoObservable} from "mobx";

import eventsAPI from './eventsAPI';
import {Event} from "./types";
import {CreateEventDto} from "./dto/create-event.dto";


class Events {
    events: Event[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getEvents() {
        const res = await eventsAPI.getAllEvents();
        this.events = res.data;
    }

    async createEvent(dto: any, files: File[]) {
        const formData = new FormData();

        Object.keys(dto).forEach(k => {
            console.log(k, dto[k]);
            formData.append(k, dto[k]);
        });
        files.forEach(f => formData.append('files', f));

        await eventsAPI.createEvent(formData);
        await this.getEvents();
    }

    // async test(files: File[]) {
    //     const fd = new FormData();
    //
    //     files.forEach(file => fd.append('files', file));
    //
    //     const dto: any = {
    //         title: '123',
    //         age: 2,
    //     }
    //
    //     Object.keys(dto).map(k => fd.append(k, dto[k]));
    //
    //     const f = await eventsAPI.test(fd);
    //     console.log('files', f);
    // }
}

export default new Events();