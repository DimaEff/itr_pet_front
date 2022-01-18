import {makeAutoObservable} from "mobx";
import {io, Socket} from "socket.io-client";

import eventsAPI from './eventsAPI';
import {Event} from "./types";
import {CreateEventDto} from "./dto/create-event.dto";


class Events {
    private baseUrl = process.env.REACT_APP_SERVER_WS + '/events';
    private socket: Socket | null = null;

    events: Event[] = [];

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

    createEvent = (dto: any, files: File[]) => {
        this.socket?.emit('events.create', {...dto, files});
    }

    deleteEvent = (id: string) => {
        this.socket?.emit('events.delete', id);
    }

    private setEvents = (events: Event[]) => {
        console.log(this.setEvents.name, events)
        this.events = events;
    }
}

export default new Events();