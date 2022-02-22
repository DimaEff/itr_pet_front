import {makeAutoObservable, runInAction} from "mobx";

import eventTypesAPI from "./eventTypesAPI";
import {CreateEventTypeDto} from "./dto/create-event-type.dto";
import {IEventType} from "./types";
import {serialize} from "object-to-formdata";


export class EventTypes {
    eventTypes: IEventType[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    fetchEventTypes = async () => {
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

    getEventsTypeById = (id: string): IEventType | undefined => {
        return this.eventTypes.find(et => et._id === id);
    }
}

export default new EventTypes();