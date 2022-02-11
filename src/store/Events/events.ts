import {action, computed, makeObservable, observable} from "mobx";
import {parseISO} from 'date-fns';

import {IEvent} from "./types";
import {CreateEventDto} from "./dto/create-event.dto";

import {WebSocket} from "../WebSocket";


// class Events {
//     private baseUrl: string;
//     private socket: Socket | null = null;
//
//     connect = false;
//     events: IEvent[] = [];
//
//     constructor() {
//         this.baseUrl = process.env.REACT_APP_SERVER_WS + '/events';
//         makeAutoObservable(this);
//     }
//
//     subscribe = () => {
//         const jwt_token = localStorage.getItem('auth0_token');
//         this.socket = io(this.baseUrl, {query: {jwt_token}}).connect();
//         this.socket.emit('events.connect');
//         this.connect = true;
//         this.socket.on('events.connected', this.setEvents);
//         this.socket.on('events.changed', this.setEvents);
//     }
//
//     unsubscribe = () => {
//         this.socket?.disconnect();
//         this.connect = false;
//     }
//
//     createEvent = (dto: CreateEventDto) => {
//         this.socket?.emit('events.create', dto);
//     }
//
//     deleteEvent = (id: string) => {
//         this.socket?.emit('events.delete', id);
//     }
//
//     get eventsWithValidDate() {
//         return this.events.filter(this.checkDate);
//     }
//
//     private setEvents = (events: IEvent[]) => {
//         console.log(this.setEvents.name, events)
//         this.events = events;
//     }
//
//     private checkDate = ({startDate, endDate}: IEvent): boolean => {
//         const now = new Date().valueOf();
//         return (parseISO(startDate).valueOf() <= now) && (parseISO(endDate).valueOf() >= now);
//     }
// }

class Events extends WebSocket {
    events: IEvent[] = [];

    get eventsWithValidDate() {
        return this.events.filter(this.checkDate);
    }

    constructor() {
        super({
            socketName: 'events',
            onChange: (data) => this._setEvents(data),
        });
        makeObservable(this, {
            events: observable,
            createEvent: action,
            deleteEvent: action,
            _setEvents: action,
            eventsWithValidDate: computed,
        });
    }

    createEvent = (dto: CreateEventDto) => {
        console.log('create an event')
        this._socket?.emit('events.create', dto);
    }

    deleteEvent = (id: string) => {
        this._socket?.emit('events.delete', id);
    }

    _setEvents = (events: IEvent[]) => {
        console.log('events', events);
        this.events = events;
    }

    private checkDate = ({startDate, endDate}: IEvent): boolean => {
        const now = new Date().valueOf();
        return (parseISO(startDate).valueOf() <= now) && (parseISO(endDate).valueOf() >= now);
    }
}

export default new Events();