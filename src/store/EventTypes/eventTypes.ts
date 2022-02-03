import {makeAutoObservable, runInAction} from "mobx";

import eventTypesAPI from "./eventTypesAPI";
import {CreateEventTypeDto} from "./dto/create-event-type.dto";
import {IEventType} from "./types";
import {serialize} from "object-to-formdata";


class EventTypes {
    eventTypes: IEventType[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async fetchEventTypes() {
        const res = await eventTypesAPI.getAllEventTypes();
        runInAction(() => {
            this.eventTypes = res.data;
        })
    }

    async createEventType(dto: CreateEventTypeDto, icon: File) {
        const fd = serialize({...dto, file: icon});

        await eventTypesAPI.createEventType(fd);
        await this.fetchEventTypes();
    }

    async deleteEventType(id: string) {
        await eventTypesAPI.delete(id);
        await this.fetchEventTypes();
    }
}

export default new EventTypes();