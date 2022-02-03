import {makeAutoObservable} from "mobx";
import {io, Socket} from "socket.io-client";
import {parseISO} from 'date-fns';

import {IEvent} from "./types";
import {CreateEventDto} from "./dto/create-event.dto";


class Events {
    private baseUrl = process.env.REACT_APP_SERVER_WS + '/events';
    private socket: Socket | null = null;

    events: IEvent[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    subscribe = () => {
        const jwt_token = localStorage.getItem('auth0_token');
        this.socket = io(this.baseUrl, {query: {jwt_token}}).connect();
        this.socket.on('events.connected', this.setEvents);
        this.socket.on('events.changed', this.setEvents);
    }

    unsubscribe = () => {
        this.socket?.disconnect();
    }

    createEvent = (dto: CreateEventDto) => {
        this.socket?.emit('events.create', dto);
    }

    deleteEvent = (id: string) => {
        this.socket?.emit('events.delete', id);
    }

    get eventsWithValidDate() {
        return this.events.filter(this.checkDate);
    }

    private setEvents = (events: IEvent[]) => {
        console.log(this.setEvents.name, events)
        this.events = events;
    }

    private checkDate = ({startDate, endDate}: IEvent): boolean => {
        const now = new Date().valueOf();
        return (parseISO(startDate).valueOf() <= now) && (parseISO(endDate).valueOf() >= now);
    }
}

export default new Events();