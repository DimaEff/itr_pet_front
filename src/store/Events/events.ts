import {action, computed, keys, makeObservable, observable} from "mobx";
import {parseISO} from 'date-fns';

import {EventFilters, IEvent, ILikeOrReport} from "./types";
import {CreateEventDto} from "./dto/create-event.dto";
import {WebSocket} from "../WebSocket";


class Events extends WebSocket {
    _events: IEvent[] = [];
    filters: EventFilters[] = ['validDate'];

    get filteredEvents(): IEvent[] {
        let es = this._events.slice();

        this.filters.forEach(f => {
            es = this.filtersFunctions[f](es);
        });

        return es;
    }

    constructor() {
        super({
            socketName: 'events',
            onChange: (data) => this._setEvents(data),
        });
        makeObservable(this, {
            _events: observable,
            createEvent: action,
            deleteEvent: action,
            like: action,
            report: action,
            _setEvents: action,
            filters: observable,
            addFilter: action,
            removeFilter: action,
            setFilters: action,
            filteredEvents: computed,
        });
    }

    createEvent = (dto: CreateEventDto): void => {
        this._socket?.emit(this._getSubscribeMessage('create'), dto);
    }

    deleteEvent = (id: string): void => {
        this._socket?.emit(this._getSubscribeMessage('delete'), id);
    }

    like = (dto: ILikeOrReport): void => {
        this._socket?.emit(this._getSubscribeMessage('like'), dto);
    }

    unlike = (dto: ILikeOrReport): void => {
        this._socket?.emit(this._getSubscribeMessage('unlike'), dto);
    }

    report = (dto: ILikeOrReport): void => {
        this._socket?.emit(this._getSubscribeMessage('report'), dto);
    }

    setFilters = (filters: EventFilters[]): void => {
        this.filters = filters;
    }

    addFilter = (filter: EventFilters): void => {
        this.filters.push(filter);
    }

    removeFilter = (filter: EventFilters): void => {
        this.filters = this.filters.filter(f => f !== filter);
    }

    _setEvents = (events: IEvent[]): void => {
        console.log(events);
        this._events = events;
    }

    private checkDate = ({startDate, endDate}: IEvent): boolean => {
        const now = new Date().valueOf();
        return (parseISO(startDate).valueOf() <= now) && (parseISO(endDate).valueOf() >= now);
    }

    private filterEventsByValidDate = (events: IEvent[]): IEvent[] => {
        return events.filter(this.checkDate);
    }

    private sortEventsByLikes = (events: IEvent[]): IEvent[] => {
        return events
            .slice()
            .sort((a, b) => b.likes.length - a.likes.length);
    }

    private filtersFunctions: {[keys in EventFilters]: (events: IEvent[]) => IEvent[]} = {
        byLikes: this.sortEventsByLikes,
        validDate: this.filterEventsByValidDate,
    };
}

export default new Events();